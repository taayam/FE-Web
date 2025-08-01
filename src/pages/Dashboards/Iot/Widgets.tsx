import React, { useEffect, useState } from "react";
import { LampCeiling, Regex,  Webhook, Atom,  ListFilter, Thermometer, Droplets } from 'lucide-react';


// Define types for each sensor
interface Sensor {
  nilai: number;
}

// Define a type for the whole sensorData state
interface SensorData {
  suhu: Sensor | null;
  kelembaban: Sensor | null;
  cahaya: Sensor | null;
  CO2: Sensor | null;
  NH3: Sensor | null;
  debu: Sensor | null;
}

// SensorCard Component with defined prop types
interface SensorCardProps {
  title: string;
  icon: JSX.Element;
  data: number | null;
  unit: string;
  color: string;
  iconColor: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ title, icon, data, unit, color, iconColor }) => {
  return (
    <div className={`order-2 md:col-span-6 lg:col-span-2 col-span-12 2xl:order-1 bg-${color}-100 dark:bg-${color}-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-${color}-500/20 relative overflow-hidden`}>
      <div className="card-body">
        <ListFilter
          className={`absolute top-0 size-32 stroke-1 text-${color}-200/50 dark:text-${color}-500/20 ltr:-right-10 rtl:-left-10`}
        />
        <div className={`flex items-center justify-center size-12 bg-${color}-500 rounded-md text-15 text-${iconColor}`}>
          {icon}
        </div>
        <h5 className="mt-5 mb-2">
          {data !== null ? (
            <span>{data.toFixed(2)}</span>  // Displaying data with 2 decimal places
          ) : (
            <span>Loading...</span>
          )}
          {unit}
        </h5>

        <p className="text-slate-500 dark:text-slate-200">{title}</p>
      </div>
    </div>
  );
};

const Widgets = () => {
  // Initialize state for sensor data with correct types
  const [sensorData, setSensorData] = useState<SensorData>({
    suhu: null,
    kelembaban: null,
    cahaya: null,
    CO2: null,
    NH3: null,
    debu: null
  });

  // Generic function to fetch data for each sensor
  const fetchSensorData = async (sensorType: string) => {
    try {
      const response = await fetch(`https://ta-ayam-be.vercel.app/api/latest/${sensorType}`);
      const data = await response.json();

      if (data && data.nilai !== undefined) {
        setSensorData(prevData => ({
          ...prevData,
          [sensorType]: { nilai: data.nilai }
        }));
      }
    } catch (error) {
      console.error(`Fetch error for ${sensorType}:`, error);
    }
  };

  useEffect(() => {
    // Fetch data for all sensors on component mount
    const sensorTypes = ['suhu', 'kelembaban', 'cahaya','NH3', 'CO2', 'debu'];
    sensorTypes.forEach(sensorType => {
      fetchSensorData(sensorType);  // Call the function to fetch the data
    });

    // Optionally, set up polling for real-time updates (every 1 second)
    const intervalId = setInterval(() => {
      sensorTypes.forEach(sensorType => {
        fetchSensorData(sensorType);
      });
    }, 10000);  // 1 second interval

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);

  }, []);

  return (
    <React.Fragment>
    {/* Space between cards */}
    <div className="mb-4"></div>

    {/* Temperature Card */}
    <SensorCard
      title="Avg Temperature"
      icon={<Thermometer />}
      data={sensorData.suhu?.nilai ?? 0}  // Fallback to 0 if null
      unit="°"
      color="orange"
      iconColor="orange-50"
    />

    {/* Humidity Card with fixed value */}
    <SensorCard
      title="Kelembaban"
      icon={<Droplets />}
      data={sensorData.kelembaban?.nilai ?? 0}  // Fixed value for now
      unit="%"
      color="blue"
      iconColor="purple-50"
    />

    {/* Chicken Age Card with fixed value
    <SensorCard
      title="Latest Chicken Age"
      icon={<Coins />}
      data={35}  // Fixed value for now
      unit="Day"
      color="sky"
      iconColor="blue-50"
    /> */}

    {/* CO2 Level Card with fixed value */}
    <SensorCard
      title="Kadar CO2"
      icon={<Atom />}
      data={sensorData.CO2?.nilai ?? 0}  // Fixed value for now
      unit="ppm"
      color="green"
      iconColor="green-50"
    />

    {/* NH3 Level Card with fixed value */}
    <SensorCard
      title="Kadar NH3"
      icon={<Webhook />}
      data={sensorData.NH3?.nilai ?? 0}  // Fixed value for now
      unit="ppm"
      color="purple"
      iconColor="purple-50"
    />

    {/* Dust Level Card with fixed value */}
    <SensorCard
      title="Level Debu"
      icon={<Regex />}
      data={sensorData.debu?.nilai ?? 0}  // Fixed value for now
      unit="ug/m³"
      color="gray"
      iconColor="gray-50"
    />

    {/* Lamp Level Card with fixed value */}
    <SensorCard
      title="Level Cahaya"
      icon={<LampCeiling />}
      data={sensorData.cahaya?.nilai ?? 0}  // Fixed value for now
      unit="Lux"
      color="yellow"
      iconColor="yellow-50"
    />

    {/* Chicken Weight Card with fixed value */}
    {/* <SensorCard
      title="Berat Ayam"
      icon={<Scale />}
      data={10}  // Fixed value for now
      unit="Kg"
      color="pink"
      iconColor="purple-50"
    /> */}
  </React.Fragment>
  );
};

export default Widgets;
