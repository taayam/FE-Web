import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";

// Define the shape of the data for each sensor
interface SensorData {
  suhu: { tanggal: string; nilai: number }[];
  kelembaban: { tanggal: string; nilai: number }[];
  CO2: { tanggal: string; nilai: number }[];
  NH3: { tanggal: string; nilai: number }[];
  debu: { tanggal: string; nilai: number }[];
  cahaya: { tanggal: string; nilai: number }[];
}

// Define sensor endpoints
const sensorEndpoints: Record<string, string> = {
  // suhu: "https://ta-ayam-be.vercel.app/api/sensor/suhu",
  // kelembaban: "https://ta-ayam-be.vercel.app/api/sensor/kelembaban",
  // CO2: "https://ta-ayam-be.vercel.app/api/sensor/CO2",
  // NH3: "https://ta-ayam-be.vercel.app/api/sensor/NH3",
  // debu: "https://ta-ayam-be.vercel.app/api/sensor/debu",
  // cahaya: "https://ta-ayam-be.vercel.app/api/sensor/cahaya"
  suhu: "http://127.0.0.1:5000/api/sensor/Temperature",
  kelembaban: "http://127.0.0.1:5000/api/sensor/Humidity",
  CO2: "http://127.0.0.1:5000/api/sensor/CO2",
  NH3: "http://127.0.0.1:5000/api/sensor/NH3",
  debu: "http://127.0.0.1:5000/api/sensor/PM10",
  cahaya: "http://127.0.0.1:5000/api/sensor/Light"
};

const Historis: React.FC = () => {
  // Use the SensorData type for the state
  const [sensorData, setSensorData] = useState<SensorData>({
    suhu: [],
    kelembaban: [],
    CO2: [],
    NH3: [],
    debu: [],
    cahaya: [],
  });

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

  // Fetch data for all sensors every 10 seconds
useEffect(() => {
  // Fetch data pertama kali ketika komponen pertama kali dimuat
  Object.keys(sensorEndpoints).forEach(sensorType => {
    fetchSensorData(sensorType as keyof SensorData); // Pastikan ini valid sebagai key dari SensorData
  });

  // Mulai interval untuk fetch data setiap 1 menit (60000ms)
  const intervalId = setInterval(() => {
    Object.keys(sensorEndpoints).forEach(sensorType => {
      fetchSensorData(sensorType as keyof SensorData);
    });
  }, 600000); // 60000ms = 1 menit

  // Cleanup on component unmount (untuk menghindari memory leak)
  return () => clearInterval(intervalId);
}, []); // Kosong array depedencies agar hanya dijalankan sekali saat komponen pertama kali dimuat

   // Structure for charts with dynamic data for each sensor
  const chartData = [
    {
      id: 'suhu-chart',
      title: 'Suhu',
      min: Math.min(...(sensorData.suhu?.map(item => item.nilai) || [0])) - 1, // Guard against undefined data
      max: Math.max(...(sensorData.suhu?.map(item => item.nilai) || [0])) + 1,
      series: [{ data: sensorData.suhu?.map(item => item.nilai) || [] }],
      chartColor: ['#FF6347'],
    },
    {
      id: 'kelembaban-chart',
      title: 'Kelembaban',
      min: Math.min(...(sensorData.kelembaban?.map(item => item.nilai) || [0])) - 1, // Guard against undefined data
      max: Math.max(...(sensorData.kelembaban?.map(item => item.nilai) || [0])) + 1,
      series: [{ data: sensorData.kelembaban?.map(item => item.nilai) || [] }],
      chartColor: ['#32CD32'],
    },
    {
      id: 'co2-level-chart',
      title: 'Kadar CO2',
      min: 0, // Custom min value for CO2
      max: 2000, // Custom max value for CO2
      series: [{ data: sensorData.CO2?.map(item => item.nilai) || [] }],
      chartColor: ['#1E90FF'],
    },
    {
      id: 'nh3-level-chart',
      title: 'Kadar NH3',
      min: 0, // Custom min value for NH3
      max: 50, // Custom max value for NH3
      series: [{ data: sensorData.NH3?.map(item => item.nilai) || [] }],
      chartColor: ['#FFD700'],
    },
    {
      id: 'dust-level-chart',
      title: 'Level Debu',
      min: 0, // Custom min value for dust
      max: 70, // Custom max value for dust
      series: [{ data: sensorData.debu?.map(item => item.nilai) || [] }],
      chartColor: ['#800080'],
    },
    {
      id: 'light-level-chart',
      title: 'Level Cahaya',
      min: 0, // Custom min value for light
      max: 100, // Custom max value for light
      series: [{ data: sensorData.cahaya?.map(item => item.nilai) || [] }],
      chartColor: ['#FFD700'],
    },
  ];

  return (
    <React.Fragment>
      <div className="order-5 col-span-12 card 2xl:col-span-12 2xl:row-span-12">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-6 2xl:grid-cols-6">
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
                          categories: sensorData.suhu?.map(item => item.tanggal) || [],
                          tickAmount: 4,
                          labels: {
                            show: true, // Disable x-axis labels
                          },
                        },
                        yaxis: {
                          title: { text: 'Level' },
                          min: item.min, // Use the custom min value
                          max: item.max, // Use the custom max value
                          tickAmount: 5, // Set the tick amount to 5
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