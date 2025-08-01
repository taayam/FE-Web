import React, { useEffect, useState } from 'react';

const Ayam = () => {
  const [day, setDay] = useState(null);
  const [newDay, setNewDay] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengambil data dari backend Flask
    const fetchDay = async () => {
      try {
        const response = await fetch('http://localhost:5000/day/get_day');
        const data = await response.json();
        setDay(data.day); // Set data 'day' ke state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDay(); // Panggil fungsi saat komponen pertama kali dimuat
  }, []); // Hanya dipanggil sekali, saat komponen dimuat pertama kali

  // Fungsi untuk mengubah hari di backend
  const handleChangeDay = async () => {
    try {
      const response = await fetch('http://localhost:5000/day/set_day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: newDay }),
      });

      if (response.ok) {
        const data = await response.json();
        setDay(data.day);
        setShowInput(false); // Sembunyikan input setelah berhasil mengubah
      } else {
        alert('Invalid input');
      }
    } catch (error) {
      console.error('Error updating day:', error);
    }
  };

  // Fungsi untuk mereset hari
 const handleResetDay = async () => {
    try {
      const response = await fetch('http://localhost:5000/day/reset_day', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setDay(data.day);
        setShowInput(false); // Sembunyikan input setelah reset
      }
    } catch (error) {
      console.error('Error resetting day:', error);
    }
  };

  return (
    <div>
      <h1>Day: {day !== null ? day : 'Loading...'}</h1>
      
      <button onClick={() => setShowInput(true)}>Ubah Hari</button>

      {showInput && (
        <div>
          <input
            type="number"
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            placeholder="Masukkan hari baru"
          />
          <button onClick={handleChangeDay}>Submit</button>
          <button onClick={handleResetDay}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default Ayam;
