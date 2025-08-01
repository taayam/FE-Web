import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";

// Define the shape of the data for each sensor
interface SensorData {
  suhu: { tanggal: string; nilai: number }[];
  kelembaban: { tanggal: string; nilai: number }[];
  CO2: { tanggal: string; nilai: number }[];
  NH3: { tanggal: string; nilai: number }[];
  cahaya: { tanggal: string; nilai: number }[];
}

interface RTDData {
  tanggal: string;
  nilai: number;
}

const sensorEndpoints: Record<string, string> = {
  suhu: "https://be-ciamis.vercel.app/api/sensor/Temperature",
  kelembaban: "https://be-ciamis.vercel.app/api/sensor/Humidity",
  CO2: "https://be-ciamis.vercel.app/api/sensor/CO2",
  NH3: "https://be-ciamis.vercel.app/api/sensor/NH3",
  debu: "https://be-ciamis.vercel.app/api/sensor/PM10",
  PM2_5: "https://be-ciamis.vercel.app/api/sensor/PM2_5",
  cahaya: "https://be-ciamis.vercel.app/api/sensor/Light",
  RTD_Temp: "https://be-ciamis.vercel.app/api/sensor/RTD_Temp", // Endpoint for RTD_Temp
};

const Historis: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    suhu: [],
    kelembaban: [],
    CO2: [],
    NH3: [],
    cahaya: [],
  });

  const [rtdData, setRtdData] = useState<RTDData[]>([]); // State for RTD_Temp data

  // Function to fetch sensor data from the given URL
  const fetchSensorData = async (sensorType: keyof SensorData) => {
    try {
      const response = await fetch(sensorEndpoints[sensorType]);
      const data = await response.json();
      setSensorData(prevData => ({ ...prevData, [sensorType]: data }));
    } catch (error) {
      console.error(`Error fetching ${sensorType} data:`, error);
    }
  };

  // Function to fetch RTD_Temp data
  const fetchRtdData = async () => {
    try {
      const response = await fetch(sensorEndpoints.RTD_Temp);
      const data = await response.json();
      console.log("RTD_Temp Data:", data); // Log RTD_Temp data separately
      setRtdData(data); // Update RTD_Temp data state
    } catch (error) {
      console.error("Error fetching RTD_Temp data:", error);
    }
  };

  useEffect(() => {
    // Fetch data for all sensors except RTD_Temp
    Object.keys(sensorEndpoints).forEach(sensorType => {
      if (sensorType !== 'RTD_Temp') {
        fetchSensorData(sensorType as keyof SensorData);
      }
    });

    // Fetch RTD_Temp data separately
    fetchRtdData();

    const intervalId = setInterval(() => {
      // Fetch data for all sensors except RTD_Temp
      Object.keys(sensorEndpoints).forEach(sensorType => {
        if (sensorType !== 'RTD_Temp') {
          fetchSensorData(sensorType as keyof SensorData);
        }
      });

      // Fetch RTD_Temp data separately
      fetchRtdData();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  // Structure for charts with dynamic data for each sensor
  // Structure for charts with dynamic data for each sensor
  const chartData = [
    {
      id: 'suhu-chart',
      title: 'Suhu Ayam',
      min: Math.min(...(sensorData.suhu?.map(item => item.nilai) || [0])) - 5,
      max: Math.max(...(sensorData.suhu?.map(item => item.nilai) || [0])) + 5,
      series: [{ data: sensorData.suhu?.map(item => item.nilai) || [] }],
      chartColor: ['#FF6347'],
      xaxisCategories: sensorData.suhu?.map(item => item.tanggal) || [],
    },
    {
      id: 'kelembaban-chart',
      title: 'Kelembaban',
      min: Math.min(...(sensorData.kelembaban?.map(item => item.nilai) || [0])) - 5,
      max: Math.max(...(sensorData.kelembaban?.map(item => item.nilai) || [0])) + 5,
      series: [{ data: sensorData.kelembaban?.map(item => item.nilai) || [] }],
      chartColor: ['#32CD32'],
      xaxisCategories: sensorData.kelembaban?.map(item => item.tanggal) || [],
    },
    {
      id: 'co2-level-chart',
      title: 'Kadar CO2',
      min: 0,
      max: 2000,
      series: [{ data: sensorData.CO2?.map(item => item.nilai) || [] }],
      chartColor: ['#1E90FF'],
      xaxisCategories: sensorData.CO2?.map(item => item.tanggal) || [],
    },
    {
      id: 'rtd-temp-chart',
      title: 'Suhu Lingkungan',
      min: Math.min(...(rtdData?.map(item => item.nilai) || [0])) - 5,
      max: Math.max(...(rtdData?.map(item => item.nilai) || [0])) + 5,
      series: [{ data: rtdData?.map(item => item.nilai) || [] }],
      chartColor: ['#4B0082'],
      xaxisCategories: rtdData?.map(item => item.tanggal) || [], // Custom xaxis for RTD_Temp
    },
    {
      id: 'nh3-level-chart',
      title: 'Kadar NH3',
      min: 0,
      max: 25,
      series: [{ data: sensorData.NH3?.map(item => item.nilai) || [] }],
      chartColor: ['#FFD700'],
      xaxisCategories: sensorData.NH3?.map(item => item.tanggal) || [],
    },

    {
      id: 'light-level-chart',
      title: 'Intensitas Cahaya',
      min: 0,
      max: 100,
      series: [{ data: sensorData.cahaya?.map(item => item.nilai) || [] }],
      chartColor: ['#FFD700'],
      xaxisCategories: sensorData.cahaya?.map(item => item.tanggal) || [],
    },
  ];

  return (
    <React.Fragment>
      <h3 className="text-black col-span-12">Data Historis 24 Jam Terakhir</h3>
      <div className="order-5 col-span-12 card 2xl:col-span-12 2xl:row-span-12">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3">
            {chartData.map((item, key) => (
              <div key={key} className="py-1 first:pt-0 md:first:pt-1 md:last:pb-1 last:pb-0 md:px-1 h-50">
                <div className="flex mb-4">
                  <div className="w-full shrink-0">
                    <h6>{item.title}</h6>
                    <ReactApexChart
                      dir="ltr"
                      options={{
                        chart: {
                          id: item.id,
                          type: 'line',
                          height: 150,
                          dropShadow: { enabled: true, opacity: 0.2 },
                          toolbar: { show: false },
                          zoom: { enabled: false },
                          selection: { enabled: false },
                        },
                        colors: item.chartColor,
                        stroke: { width: 2, curve: 'smooth' },
                        xaxis: {
                          categories: item.xaxisCategories, // Use the custom categories for each chart
                          tickAmount: 4,
                          labels: {
                            show: true,
                          },
                        },
                        yaxis: {
                          title: { text: 'Level' },
                          min: item.min,
                          max: item.max,
                          tickAmount: 5,
                          labels: {
                            formatter: (value: number) => Math.round(value).toString(),
                          },
                        },
                        dataLabels: { enabled: false },
                      }}
                      series={item.series}
                      id={item.id}
                      className="apex-charts"
                      type="line"
                      height={200}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Historis;
