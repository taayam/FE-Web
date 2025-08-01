import React, { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Thresholds for optimal poultry barn conditions
const TEMP_THRESHOLD_HIGH = 30;  // °C (Too high)
const TEMP_THRESHOLD_LOW = 15;   // °C (Too low)

const HUMIDITY_THRESHOLD_HIGH = 80;  // % (Too high)
const HUMIDITY_THRESHOLD_LOW = 30;   // % (Too low)

const NH3_THRESHOLD_HIGH = 25;  // ppm (Too high)

const CO2_THRESHOLD_HIGH = 2000;  // ppm (Too high)

const DUST_THRESHOLD_HIGH = 5;  // mg/m³ (Too high)

// Function to calculate the color indicator based on thresholds
const getColor = (value: number, type: string): string => {
  if (type === 'temperature') {
    if (value > TEMP_THRESHOLD_HIGH) return 'red'; // Too high
    if (value < TEMP_THRESHOLD_LOW) return 'red'; // Too low
    if (value > TEMP_THRESHOLD_HIGH - 3) return 'orange'; // Warning for high temperature
    if (value < TEMP_THRESHOLD_LOW + 3) return 'orange'; // Warning for low temperature
    return 'green'; // Optimal range
  }

  if (type === 'humidity') {
    if (value > HUMIDITY_THRESHOLD_HIGH) return 'red'; // Too high
    if (value < HUMIDITY_THRESHOLD_LOW) return 'red'; // Too low
    if (value > HUMIDITY_THRESHOLD_HIGH - 10) return 'orange'; // Warning for high humidity
    if (value < HUMIDITY_THRESHOLD_LOW + 10) return 'orange'; // Warning for low humidity
    return 'green'; // Optimal range
  }

  if (type === 'NH3') {
    if (value > NH3_THRESHOLD_HIGH) return 'red'; // Too high
    if (value > NH3_THRESHOLD_HIGH - 5) return 'orange'; // Warning for high NH3
    return 'green'; // Optimal range
  }

  if (type === 'CO2') {
    if (value > CO2_THRESHOLD_HIGH) return 'red'; // Too high
    if (value > CO2_THRESHOLD_HIGH - 500) return 'orange'; // Warning for high CO2
    return 'green'; // Optimal range
  }

  if (type === 'dust') {
    if (value > DUST_THRESHOLD_HIGH) return 'red'; // Too high
    if (value > DUST_THRESHOLD_HIGH - 2) return 'orange'; // Warning for high dust
    return 'green'; // Optimal range
  }

  return 'grey'; // Default
};

// Function to scale the value to the 0-100 range
const scaleValue = (value: number, min: number, max: number, type: string): number => {
  if (type === 'temperature') {
    return ((value - 10) / (max - 10)) * 100;
  }
  
  if (type === 'humidity') {
    return value; // No scaling needed for humidity
  }

  return ((value - min) / (max - min)) * 100;
};

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
  data: number | null;
  unit: string;
  type: string; // Added type to determine the sensor type (temperature, humidity, etc.)
}

const SensorCard: React.FC<SensorCardProps> = ({ title, data, unit, type }) => {
  const scaledValue = scaleValue(data ?? 0, 0, 100, type); // Scale value between 0 and 100
  const sensorColor = getColor(data ?? 0, type); // Get the color based on threshold
  
  // Set the background color with 25% opacity using RGBA format
  const cardBackgroundColor = `rgba(${sensorColor === 'red' ? '255, 0, 0' : sensorColor === 'orange' ? '255, 165, 0' : '0, 128, 0'}, 0.25)`; // Red, Orange, Green with 25% opacity

  return (
    <div className={`order-2 md:col-span-6 lg:col-span-2 col-span-12 2xl:order-1 card 2xl:col-span-2 group-data-[skin=bordered]:border-${sensorColor}-500/20 relative overflow-hidden`} style={{ backgroundColor: cardBackgroundColor }}>
      <div className="card-body">
        {/* Removed background color of the container around the circular progress bar */}
        <div className={`flex items-center justify-center size-24 text-15 text-${sensorColor}-50`}>
          <CircularProgressbar 
            value={scaledValue} 
            maxValue={100}  // 0-100 scale
            text={`${data?.toFixed(2)} ${unit}`} // Display value inside the circle
            styles={{
              path: {
                stroke: sensorColor === 'red' ? '#FF0000' : sensorColor === 'orange' ? '#FFA500' : '#008000', // Red, Orange, Green based on color
              },
              text: {
                fill: '#000', // Black text color inside the circle
                fontSize: '14px', // Smaller font size for the text
              },
              trail: {
                stroke: '#eee', // Light gray trail
              }
            }}
          />
        </div>
        {/* Remove the text below the circle */}
        <p className="text-slate-500 dark:text-slate-200">{title}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
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
    const sensorTypes = ['suhu', 'kelembaban', 'cahaya', 'NH3', 'CO2', 'debu'];
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

      {/* Temperature Card with Circular Progress */}
      <SensorCard
        title="Avg Temperature"
        data={sensorData.suhu?.nilai ?? 0}
        unit="°C"
        type="temperature"
      />

      {/* Humidity Card with Circular Progress */}
      <SensorCard
        title="Kelembaban"
        data={sensorData.kelembaban?.nilai ?? 0}
        unit="%"
        type="humidity"
      />

      {/* CO2 Level Card with Circular Progress */}
      <SensorCard
        title="Kadar CO2"
        data={sensorData.CO2?.nilai ?? 0}
        unit="ppm"
        type="CO2"
      />

      {/* NH3 Level Card with Circular Progress */}
      <SensorCard
        title="Kadar NH3"
        data={sensorData.NH3?.nilai ?? 0}
        unit="ppm"
        type="NH3"
      />

      {/* Dust Level Card with Circular Progress */}
      <SensorCard
        title="Level Debu"
        data={sensorData.debu?.nilai ?? 0}
        unit="ug/m³"
        type="dust"
      />

      {/* Light Level Card with Circular Progress */}
      <SensorCard
        title="Level Cahaya"
        data={sensorData.cahaya?.nilai ?? 0}
        unit="Lux"
        type="humidity"  // Assuming light is categorized as humidity for color logic
      />
    </React.Fragment>
  );
};

export default Dashboard;
