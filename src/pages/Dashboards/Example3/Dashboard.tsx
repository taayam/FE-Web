import React, { useState } from 'react';
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

// Fungsi untuk menghitung warna indikator berdasarkan threshold
const getColor = (value: number, type: string): string => {
  // Untuk suhu
  if (type === 'temperature') {
    if (value > TEMP_THRESHOLD_HIGH) return 'red'; // Too high
    if (value < TEMP_THRESHOLD_LOW) return 'red'; // Too low
    if (value > TEMP_THRESHOLD_HIGH - 3) return 'orange'; // Peringatan suhu tinggi
    if (value < TEMP_THRESHOLD_LOW + 3) return 'orange'; // Peringatan suhu rendah
    return 'green'; // Optimal range
  }

  // Untuk kelembaban
  if (type === 'humidity') {
    if (value > HUMIDITY_THRESHOLD_HIGH) return 'red'; // Too high
    if (value < HUMIDITY_THRESHOLD_LOW) return 'red'; // Too low
    if (value > HUMIDITY_THRESHOLD_HIGH - 10) return 'orange'; // Peringatan kelembaban tinggi
    if (value < HUMIDITY_THRESHOLD_LOW + 10) return 'orange'; // Peringatan kelembaban rendah
    return 'green'; // Optimal range
  }

  // Untuk NH3
  if (type === 'NH3') {
    if (value > NH3_THRESHOLD_HIGH) return 'red'; // Too high
    if (value > NH3_THRESHOLD_HIGH - 5) return 'orange'; // Peringatan NH3 tinggi
    return 'green'; // Optimal range
  }

  // Untuk CO2
  if (type === 'CO2') {
    if (value > CO2_THRESHOLD_HIGH) return 'red'; // Too high
    if (value > CO2_THRESHOLD_HIGH - 500) return 'orange'; // Peringatan CO2 tinggi
    return 'green'; // Optimal range
  }

  // Untuk Debu
  if (type === 'dust') {
    if (value > DUST_THRESHOLD_HIGH) return 'red'; // Too high
    if (value > DUST_THRESHOLD_HIGH - 2) return 'orange'; // Peringatan debu tinggi
    return 'green'; // Optimal range
  }

  return 'grey'; // Default
};

// Fungsi untuk menyesuaikan nilai ke dalam skala 0-100
const scaleValue = (value: number, min: number, max: number, type: string): number => {
  if (type === 'temperature') {
    // Scale suhu menggunakan rumus khusus
    return ((value - 10) / (max - 10)) * 100;
  }
  
  if (type === 'humidity') {
    // Kelembaban tidak perlu diskalakan, langsung gunakan nilai
    return value;
  }

  // Skala untuk parameter lainnya (NH3, CO2, Dust)
  return ((value - min) / (max - min)) * 100;
};

function Dashboard() {
  // Mendefinisikan nilai sensor suhu, kelembaban, dan lainnya
  const [temperature, setTemperature] = useState<number>(17); // Suhu yang didefinisikan (contoh 14°C)
  const [humidity, setHumidity] = useState<number>(81); // Kelembaban (contoh 29%)
  const [nh3Level, setNh3Level] = useState<number>(90); // Kadar NH3
  const [co2Level, setCo2Level] = useState<number>(1500); // Kadar CO2
  const [dustLevel, setDustLevel] = useState<number>(4); // Level Debu

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {/* Temperature */}
      <div style={{ width: '200px', height: '200px' }}>
        <h3>Temperature</h3>
        <CircularProgressbar
          value={scaleValue(temperature, TEMP_THRESHOLD_LOW, TEMP_THRESHOLD_HIGH, 'temperature')} // Skala suhu 15-30 menjadi 0-100
          text={`${temperature}°C`}
          styles={{
            path: {
              stroke: getColor(temperature, 'temperature'), // Menentukan warna berdasarkan suhu
              transform: 'rotate(-180deg)', // Mulai dari bawah (180°)
              transformOrigin: '50% 50%', // Setengah lingkaran
            },
          }}
        />
      </div>

      {/* Humidity */}
      <div style={{ width: '200px', height: '200px' }}>
        <h3>Humidity</h3>
        <CircularProgressbar
          value={scaleValue(humidity, HUMIDITY_THRESHOLD_LOW, HUMIDITY_THRESHOLD_HIGH, 'humidity')} // Skala kelembaban 30-80 menjadi 0-100
          text={`${humidity}%`}
          styles={{
            path: {
              stroke: getColor(humidity, 'humidity'), // Menentukan warna berdasarkan kelembaban
              transform: 'rotate(-180deg)', // Mulai dari bawah (180°)
              transformOrigin: '50% 50%', // Setengah lingkaran
            },
          }}
        />
      </div>

      {/* NH3 Level */}
      <div style={{ width: '200px', height: '200px' }}>
        <h3>NH3 Level</h3>
        <CircularProgressbar
          value={scaleValue(nh3Level, 0, NH3_THRESHOLD_HIGH, 'NH3')} // Skala NH3 0-25 menjadi 0-100
          text={`${nh3Level} ppm`}
          styles={{
            path: {
              stroke: getColor(nh3Level, 'NH3'), // Menentukan warna berdasarkan kadar NH3
              transform: 'rotate(-180deg)', // Mulai dari bawah (180°)
              transformOrigin: '50% 50%', // Setengah lingkaran
            },
          }}
        />
      </div>

      {/* CO2 Level */}
      <div style={{ width: '200px', height: '200px' }}>
        <h3>CO2 Level</h3>
        <CircularProgressbar
          value={scaleValue(co2Level, 0, CO2_THRESHOLD_HIGH, 'CO2')} // Skala CO2 0-2000 menjadi 0-100
          text={`${co2Level} ppm`}
          styles={{
            path: {
              stroke: getColor(co2Level, 'CO2'), // Menentukan warna berdasarkan kadar CO2
              transform: 'rotate(-180deg)', // Mulai dari bawah (180°)
              transformOrigin: '50% 50%', // Setengah lingkaran
            },
          }}
        />
      </div>

      {/* Dust Level */}
      <div style={{ width: '200px', height: '200px' }}>
        <h3>Dust Level</h3>
        <CircularProgressbar
          value={scaleValue(dustLevel, 0, DUST_THRESHOLD_HIGH, 'dust')} // Skala Debu 0-5 menjadi 0-100
          text={`${dustLevel} mg/m³`}
          styles={{
            path: {
              stroke: getColor(dustLevel, 'dust'), // Menentukan warna berdasarkan level debu
              transform: 'rotate(-180deg)', // Mulai dari bawah (180°)
              transformOrigin: '50% 50%', // Setengah lingkaran
            },
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
