import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';

interface SensorData {
  Temperature: { nilai: number } | null;
  Humidity: { nilai: number } | null;
  Light: { nilai: number } | null;
  CO2: { nilai: number } | null;
  NH3: { nilai: number } | null;
  RTD_Temp: { nilai: number } | null;
}

const getTempThreshold = (dayValue: number): [number, number] => {
  if (dayValue >= 1 && dayValue <= 7) return [32, 34];
  if (dayValue >= 8 && dayValue <= 14) return [28, 32];
  if (dayValue >= 15 && dayValue <= 21) return [26, 28];
  if (dayValue >= 22 && dayValue <= 28) return [24, 26];
  if (dayValue >= 29 && dayValue <= 42) return [18, 24];
  return [22, 33]; // default fallback
};

const getHumidityThreshold = (dayValue: number): [number, number] => {
  if (dayValue >= 1 && dayValue <= 14) return [60, 70];
  if (dayValue >= 15 && dayValue <= 42) return [50, 60];
  return [50, 70]; // default fallback
};

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
    Temperature: null,
    Humidity: null,
    Light: null,
    CO2: null,
    NH3: null,
    RTD_Temp: null,
  });

  const [dayValue, setDayValue] = useState<number>(1);

  const fetchSensorData = async (sensorType: string) => {
    try {
      const response = await fetch(`https://be-ciamis.vercel.app/api/latest/${sensorType}`);
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
  fetch('https://be-ciamis.vercel.app/day/get_day')
    .then((res) => res.json())
    .then((data) => {
      const parsedDay = parseInt(data.day); // konversi ke integer
      if (!isNaN(parsedDay)) {
        setDayValue(parsedDay);
        console.log('Parsed day:', parsedDay);
      } else {
        console.warn('Received invalid day value:', data.day);
      }
    })
    .catch((err) => {
      console.error('Failed to fetch dayValue:', err);
    });
}, []);

  useEffect(() => {
    const sensorTypes = ['Temperature', 'Humidity', 'Light', 'NH3', 'CO2', 'RTD_Temp'];
    sensorTypes.forEach((sensorType) => fetchSensorData(sensorType));

    const intervalId = setInterval(() => {
      sensorTypes.forEach((sensorType) => fetchSensorData(sensorType));
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const [minTemp, maxTemp] = getTempThreshold(dayValue);
  const [minHumid, maxHumid] = getHumidityThreshold(dayValue);

  return (
    <>
      <div className="mb-2"></div>
      <h3 className="text-black col-span-12">Data Sensor Real-Time</h3>

      <SensorCard
        title="Suhu Ayam"
        data={sensorData.Temperature?.nilai ?? 0}
        unit="°C"
        sensorColor="red"
        id="gauge-temp-ayam"
        minValue={10}
        maxValue={40}
        thresholds={[
          { limit: minTemp-1, color: '#EA4228', tooltipText: 'Terlalu Rendah' },
          { limit: minTemp, color: '#F5CD19', tooltipText: 'Sedikit Rendah' },
          { limit: maxTemp, color: '#5BE12C', tooltipText: 'Ideal' },
          { limit: maxTemp + 1, color: '#F5CD19', tooltipText: 'Sedikit Tinggi' },
          { limit: 40, color: '#EA4228', tooltipText: 'Terlalu Tinggi' },
        ]}
      />



      <SensorCard
        title="Kelembaban"
        data={sensorData.Humidity?.nilai ?? 0}
        unit="%"
        sensorColor="blue"
        id="gauge-humidity"
        minValue={0}
        maxValue={100}
        thresholds={[
          { limit: minHumid, color: '#F5CD19', tooltipText: 'Terlalu Rendah' },
          { limit: maxHumid, color: '#5BE12C', tooltipText: 'Ideal' },
          { limit: 100, color: '#F5CD19', tooltipText: 'Terlalu Tinggi' },
        ]}
      />

      {/* Sensor lainnya tetap seperti sebelumnya */}
      <SensorCard
        title="Kadar CO2"
        data={sensorData.CO2?.nilai ?? 0}
        unit="ppm"
        sensorColor="green"
        id="gauge-co2"
        minValue={0}
        maxValue={5000}
        thresholds={[
          { limit: 2000, color: '#5BE12C', tooltipText: 'Aman' },
          { limit: 3000, color: '#F5CD19', tooltipText: 'Tinggi' },
          { limit: 5000, color: '#EA4228', tooltipText: 'Berbahaya' },
        ]}
      />
            <SensorCard
        title="Suhu Lingkungan"
        data={sensorData.RTD_Temp?.nilai ?? 0}
        unit="°C"
        sensorColor="red"
        id="gauge-temp-env"
        minValue={10}
        maxValue={40}
        thresholds={[
          { limit: minTemp-1, color: '#EA4228', tooltipText: 'Terlalu Rendah' },
          { limit: minTemp  , color: '#F5CD19', tooltipText: 'Sedikit Rendah' },
          { limit: maxTemp, color: '#5BE12C', tooltipText: 'Ideal' },
          { limit: maxTemp + 1, color: '#F5CD19', tooltipText: 'Sedikit Tinggi' },
          { limit: 40, color: '#EA4228', tooltipText: 'Terlalu Tinggi' },
        ]}
      />

      <SensorCard
        title="Kadar NH3"
        data={sensorData.NH3?.nilai ?? 0}
        unit="ppm"
        sensorColor="orange"
        id="gauge-nh3"
        minValue={0}
        maxValue={100}
        thresholds={[
          { limit: 10, color: '#5BE12C', tooltipText: 'Aman' },
          { limit: 25, color: '#F5CD19', tooltipText: 'Tinggi' },
          { limit: 100, color: '#EA4228', tooltipText: 'Berbahaya' },
        ]}
      />

      <SensorCard
        title="Level Cahaya"
        data={sensorData.Light?.nilai ?? 0}
        unit="Lux"
        sensorColor="yellow"
        id="gauge-light"
        minValue={0}
        maxValue={100}
        thresholds={[
          { limit: 40, color: '#5BE12C', tooltipText: 'Baik' },
          { limit: 50, color: '#F5CD19', tooltipText: 'Cukup terang' },
          { limit: 100, color: '#EA4228', tooltipText: 'Terlalu terang' },
        ]}
      />
    </>
  );
};

export default Spido;
