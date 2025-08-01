import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component'; // Ensure you have this dependency installed

interface SensorData {
  suhu: { nilai: number } | null;
  kelembaban: { nilai: number } | null;
  cahaya: { nilai: number } | null;
  CO2: { nilai: number } | null;
  NH3: { nilai: number } | null;
  debu: { nilai: number } | null;
}

const SensorCard = ({
  title,
  data,
  unit,
  sensorColor,
  id,
}: {
  title: string;
  data: number;
  unit: string;
  sensorColor: string;
  id: string;
}) => {
  return (
    <div className={`order-2 md:col-span-6 lg:col-span-6 col-span-12 2xl:order-1 card 2xl:col-span-4 group-data-[skin=bordered]:border-${sensorColor}-500/20 relative overflow-hidden`}>
      <div className="card-body">
        {/* Displaying GaugeComponent */}
        <div className="flex items-center justify-center text-black"> {/* Set text color to black */}
          <div className="w-72">
            <GaugeComponent
              type="semicircle"
              arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                subArcs: [
                  {
                    limit: 15,
                    color: '#EA4228',
                    showTick: true,
                    tooltip: {
                      text: 'Too low temperature!',
                    },
                    onClick: () => console.log('Too low temperature clicked'),
                    onMouseMove: () => console.log('Mouse moved over low temperature'),
                    onMouseLeave: () => console.log('Mouse left the low temperature area'),
                  },
                  {
                    limit: 17,
                    color: '#F5CD19',
                    showTick: true,
                    tooltip: {
                      text: 'Low temperature!',
                    },
                  },
                  {
                    limit: 28,
                    color: '#5BE12C',
                    showTick: true,
                    tooltip: {
                      text: 'OK temperature!',
                    },
                  },
                  {
                    limit: 30,
                    color: '#F5CD19',
                    showTick: true,
                    tooltip: {
                      text: 'High temperature!',
                    },
                  },
                  {
                    color: '#EA4228',
                    tooltip: {
                      text: 'Too high temperature!',
                    },
                  },
                ],
              }}
              pointer={{
                color: '#345243',
                length: 0.8,
                width: 15,
              }}
              labels={{
                valueLabel: {
                  formatTextValue: (value: number) => value + 'ºC',
                  style: { fill: 'black' },  // Set inner text to black here
                },
                tickLabels: {
                  type: 'outer',
                  defaultTickValueConfig: {
                    formatTextValue: (value: number) => value + 'ºC',
                    style: { fontSize: 10, fill: 'black' },  // Set tick labels text to black
                  },
                  ticks: [
                    { value: 13 },
                    { value: 22.5 },
                    { value: 32 },
                  ],
                },
              }}
              value={data}
              minValue={10}
              maxValue={35}
              // Removed textColor prop as it's not supported
            />
          </div>
        </div>
        <p className="text-black">{title}</p> {/* Set text color of title to black */}
      </div>
    </div>
  );
};

const Spido = () => {
  // Initialize state for sensor data with correct types
  const [sensorData, setSensorData] = useState<SensorData>({
    suhu: null,
    kelembaban: null,
    cahaya: null,
    CO2: null,
    NH3: null,
    debu: null,
  });

  // Generic function to fetch data for each sensor
  const fetchSensorData = async (sensorType: string) => {
    try {
      const response = await fetch(`https://ta-ayam-be.vercel.app/api/latest/${sensorType}`);
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
    // Fetch data for all sensors on component mount
    const sensorTypes = ['suhu', 'kelembaban', 'cahaya', 'NH3', 'CO2', 'debu'];
    sensorTypes.forEach((sensorType) => {
      fetchSensorData(sensorType); // Call the function to fetch the data
    });

    // Optionally, set up polling for real-time updates (every 10 seconds)
    const intervalId = setInterval(() => {
      sensorTypes.forEach((sensorType) => {
        fetchSensorData(sensorType);
      });
    }, 10000); // 10 second interval

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <React.Fragment>
      {/* Space between cards */}
      <div className="mb-4"></div>

      {/* Temperature Card with Gauge Component */}
      <SensorCard
        title="Avg Temperature"
        data={sensorData.suhu?.nilai ?? 0}
        unit="°C"
        sensorColor="red"
        id="gauge-chart-1"
      />

      {/* Humidity Card with Gauge Component */}
      <SensorCard
        title="Kelembaban"
        data={sensorData.kelembaban?.nilai ?? 0}
        unit="%"
        sensorColor="blue"
        id="gauge-chart-2"
      />

      {/* CO2 Level Card with Gauge Component */}
      <SensorCard
        title="Kadar CO2"
        data={sensorData.CO2?.nilai ?? 0}
        unit="ppm"
        sensorColor="green"
        id="gauge-chart-3"
      />

      {/* NH3 Level Card with Gauge Component */}
      <SensorCard
        title="Kadar NH3"
        data={sensorData.NH3?.nilai ?? 0}
        unit="ppm"
        sensorColor="orange"
        id="gauge-chart-4"
      />

      {/* Dust Level Card with Gauge Component */}
      <SensorCard
        title="Level Debu"
        data={sensorData.debu?.nilai ?? 0}
        unit="ug/m³"
        sensorColor="purple"
        id="gauge-chart-5"
      />

      {/* Light Level Card with Gauge Component */}
      <SensorCard
        title="Level Cahaya"
        data={sensorData.cahaya?.nilai ?? 0}
        unit="Lux"
        sensorColor="yellow"
        id="gauge-chart-6"
      />
    </React.Fragment>
  );
};

export default Spido;
