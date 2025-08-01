import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';

interface SensorData {
  DissolvedOxygen: { nilai: number } | null;
  Nitrogen: { nilai: number } | null;
  Phosphorus: { nilai: number } | null;
  Salinity: { nilai: number } | null;
  Soil_EC: { nilai: number } | null;
  Soil_Moisture: { nilai: number } | null;
  Temperature: { nilai: number } | null;
  pH: { nilai: number } | null;
}


const SensorCard = ({
  title,
  data,
  unit,
  sensorColor,
  id,
  minValue,
  maxValue,
  thresholds,
}: {
  title: string;
  data: number;
  unit: string;
  sensorColor: string;
  id: string;
  minValue: number;
  maxValue: number;
  thresholds: Array<{ limit: number; color: string; tooltipText: string }>;
}) => {
  return (
    <div className={`order-2 md:col-span-6 lg:col-span-4 col-span-12 2xl:order-1 card 2xl:col-span-4 group-data-[skin=bordered]:border-${sensorColor}-500/20 relative overflow-hidden`}>
      <div className="card-body">
        <p className="dark:text-white text-black">{title}</p>
        <div className="flex items-center justify-center dark:text-white text-black">
          <div className="w-21">
            <GaugeComponent
              type="semicircle"
              arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                subArcs: thresholds.map((threshold) => ({
                  limit: threshold.limit,
                  color: threshold.color,
                  showTick: true,
                  tooltip: {
                    text: threshold.tooltipText,
                  },
                })),
              }}
              pointer={{
                color: '#345243',
                length: 0.8,
                width: 15,
              }}
              labels={{
                valueLabel: {
                  formatTextValue: (value: number) => value + unit,
                  style: { fontSize: 24, fill: 'currentColor' },
                },
                tickLabels: {
                  type: 'outer',
                  defaultTickValueConfig: {
                    formatTextValue: (value: number) => String(value),
                    style: { fontSize: 10, fill: 'currentColor' },
                  },
                  ticks: [
                    { value: minValue },
                    { value: maxValue },
                  ],
                },
              }}
              value={data}
              minValue={minValue}
              maxValue={maxValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Spido = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    DissolvedOxygen: null,
    Nitrogen: null,
    Phosphorus: null,
    Salinity: null,
    Soil_EC: null,
    Soil_Moisture: null,
    Temperature: null,
    pH: null,
  });

  const [dayValue, setDayValue] = useState<number>(1);

  const fetchSensorData = async (sensorType: string) => {
    try {
      const response = await fetch(`https://be-ciamis.vercel.app/api/latestikan/${sensorType}`);
      // const response = await fetch(`http://127.0.0.1:5000/api/latestikan/${sensorType}`);
      const data = await response.json();
      if (data && data.nilai !== undefined) {
        setSensorData((prevData) => ({
          ...prevData,
          [sensorType]: { nilai: data.nilai },
        }));
      }
    } catch (error) {
      console.error(`Fetch error for ${sensorType}:`, error);
    }
  };



  useEffect(() => {
    const sensorTypes = ['DissolvedOxygen', 'Nitrogen', 'Phosphorus', 'Salinity', 'Soil_EC', 'Soil_Moisture', 'Temperature', 'pH'];
    sensorTypes.forEach((sensorType) => fetchSensorData(sensorType));

    const intervalId = setInterval(() => {
      sensorTypes.forEach((sensorType) => fetchSensorData(sensorType));
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <div className="mb-2"></div>
      <h3 className="text-black col-span-12">Data Terbaru Sensor Ikan</h3>

      <SensorCard
        title="Suhu Air"
        data={sensorData.Temperature?.nilai ?? 0}
        unit="°C"
        sensorColor="red"
        id="gauge-temp-ayam"
        minValue={10}
        maxValue={40}
        thresholds={[
          { limit: 25-1, color: '#EA4228', tooltipText: 'Terlalu Rendah' },
          { limit: 25, color: '#F5CD19', tooltipText: 'Sedikit Rendah' },
          { limit: 27, color: '#5BE12C', tooltipText: 'Ideal' },
          { limit: 27 + 1, color: '#F5CD19', tooltipText: 'Sedikit Tinggi' },
          { limit: 40, color: '#EA4228', tooltipText: 'Terlalu Tinggi' },
        ]}
      />



      <SensorCard
        title="Kadar Nitrogen Air"
        data={sensorData.Soil_Moisture?.nilai ?? 0}
        unit="ppm"
        sensorColor="blue"
        id="gauge-humidity"
        minValue={0}
        maxValue={100}
        thresholds={[
          { limit:10, color: '#5BE12C', tooltipText: 'Aman' },
          { limit: 50, color: '#F5CD19', tooltipText: 'Tinggi' },
          { limit: 100, color: '#EA4228', tooltipText: 'Berbahaya'},
        ]}
      />

      {/* Sensor lainnya tetap seperti sebelumnya */}
      <SensorCard
        title="Dissolved Oxygen"
        data={sensorData.DissolvedOxygen?.nilai ?? 0}
        unit="mg/L"
        sensorColor="green"
        id="gauge-co2"
        minValue={0}
        maxValue={10}
        thresholds={[
          { limit: 2, color: '#EA4228', tooltipText: 'Berbahaya'},
          { limit: 3, color: '#F5CD19', tooltipText: 'Tinggi' },
          { limit: 5, color: '#5BE12C', tooltipText: 'Aman' },
        ]}
      />
            <SensorCard
        title="pH Air"
        data={sensorData.pH?.nilai ?? 0}
        unit=""
        sensorColor="red"
        id="gauge-temp-env"
        minValue={0}
        maxValue={14}
        thresholds={[
          { limit: 6-1, color: '#EA4228', tooltipText: 'Terlalu Rendah' },
          { limit: 6  , color: '#F5CD19', tooltipText: 'Sedikit Rendah' },
          { limit: 8.4, color: '#5BE12C', tooltipText: 'Ideal' },
          { limit: 8.4 + 1, color: '#F5CD19', tooltipText: 'Sedikit Tinggi' },
          { limit: 14, color: '#EA4228', tooltipText: 'Terlalu Tinggi' },
        ]}
      />

      <SensorCard
        title="Kadar Fosfor"
        data={sensorData.Phosphorus?.nilai ?? 0}
        unit="mg/L"
        sensorColor="orange"
        id="gauge-nh3"
        minValue={0}
        maxValue={0.5}
        thresholds={[
          { limit: 0.002, color: '#EA4228', tooltipText: 'Berbahaya'},
          { limit: 0.050, color: '#F5CD19', tooltipText: 'Tinggi' },
          { limit: 0.100, color: '#5BE12C', tooltipText: 'Aman' },
        ]}
      />

      <SensorCard
        title="Kadar salinitas"
        data={sensorData.Salinity?.nilai ?? 0}
        unit="ppt"
        sensorColor="yellow"
        id="gauge-light"
        minValue={0}
        maxValue={1.5}
        thresholds={[
          { limit: 0.5, color: '#5BE12C', tooltipText: 'Aman' },
          { limit: 0.6, color: '#F5CD19', tooltipText: 'Tinggi' },
          { limit: 1, color: '#EA4228', tooltipText: 'Berbahaya'},
        ]}
      />
    </>
  );
};

export default Spido;
