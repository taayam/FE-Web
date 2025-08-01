import React, { useState, useEffect } from 'react'; // Menambahkan useEffect
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/flatpickr.css";
import { database } from "config/config";
import { ref, get, query, orderByKey, startAt, endAt } from 'firebase/database'; // Mengimpor query dan fungsi terkait

// Fungsi untuk mengambil data dalam rentang tanggal tertentu
const getDataInDateRange = async (startDate: string, endDate: string): Promise<Record<string, number | string> | { message: string }> => {
  try {
    const dbRef = ref(database, 'IoT/suhu');  // Pastikan referensi ini sesuai dengan struktur data Anda di Firebase

    // Menggunakan query untuk mengambil data dalam rentang tanggal
    const q = query(dbRef, orderByKey(), startAt(startDate), endAt(endDate));  // Query menggunakan orderByKey, startAt, dan endAt
    
    // Mengambil data berdasarkan query
    const snapshot = await get(q);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data; // Mengembalikan data yang sudah difilter oleh Firebase
    } else {
      return { message: "No data available." };  // Tidak ada data di Firebase
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { message: "Error occurred while fetching data." };  // Menangani error
  }
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Record<string, number | string>>({});
  const [startDate, setStartDate] = useState<string>("20250308_0000"); // Set tanggal awal
  const [endDate, setEndDate] = useState<string>("20250318_2359");   // Set tanggal akhir

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataInDateRange(startDate, endDate);
      setData(result); // Update state dengan data yang diambil
    };

    fetchData();
  }, [startDate, endDate]); // Hook ini akan dipanggil saat startDate atau endDate berubah

  return (
    <div>
      <h1>Automatic Chicken Farm Overview</h1>
      {/* Tanggal inputan */}
      <div className="flex flex-col gap-4 mb-4 md:mb-3 md:items-center md:flex-row">
        <h6 className="grow text-15">Date Range Selection</h6>
        <div className="relative">
          <Flatpickr
            className="ltr:pl-10 rtl:pr-10 form-input"
            options={{
              dateFormat: "d M, Y H:i",
              enableTime: true,
              mode: "range", // Memungkinkan pemilihan rentang tanggal
            }}
            onChange={([start, end]) => {
              // Mengecek apakah start dan end tidak undefined
              if (start && end) {
                setStartDate(start.toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "_"));
                setEndDate(end.toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "_"));
              }
            }}
            placeholder="Select Date and Time"
          />
        </div>
      </div>

      {/* Tabel untuk menampilkan data */}
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).length > 0 ? (
            Object.keys(data).map((key) => (
              <tr key={key}>
                <td>{`${key.slice(6, 8)}-${key.slice(4, 6)}-${key.slice(0, 4)} ${key.slice(9, 11)}:${key.slice(11, 13)}`}</td>
                <td>{data[key]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No data available for the selected range</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
