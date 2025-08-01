import React, { useEffect, useState } from 'react';

const Ayam: React.FC = () => {
  const [day, setDay] = useState<number | null>(null);
  const [jumlahAyam, setJumlahAyam] = useState<number | string>('');
  const [jumlahAyamMati, setJumlahAyamMati] = useState<number | string>('');
  const [newDay, setNewDay] = useState<string>('');

  const [showInputDay, setShowInputDay] = useState<boolean>(false);
  const [showInputJumlahAyam, setShowInputJumlahAyam] = useState<boolean>(false);
  const [showInputJumlahAyamMati, setShowInputJumlahAyamMati] = useState<boolean>(false);

  useEffect(() => {
    // Fetch current day, jumlah ayam, and jumlah ayam mati from the backend
    const fetchData = async () => {
      try {
        const dayResponse = await fetch('https://be-ciamis.vercel.app/day/get_day');
        const dayData = await dayResponse.json();
        setDay(dayData.day);

        const jumlahAyamResponse = await fetch('https://be-ciamis.vercel.app/day/get_jml_ayam');
        const jumlahAyamData = await jumlahAyamResponse.json();
        setJumlahAyam(jumlahAyamData.jml_ayam);

        const jumlahAyamMatiResponse = await fetch('https://be-ciamis.vercel.app/day/get_ayam_mati');
        const jumlahAyamMatiData = await jumlahAyamMatiResponse.json();
        setJumlahAyamMati(jumlahAyamMatiData.ayam_mati);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Interval to check every hour if it's 00:00 to update the day
    const interval = setInterval(() => {
      const currentTime = new Date();
      if (currentTime.getHours() === 0 && currentTime.getMinutes() === 0) {
        handleChangeDayIncrement();
      }
    }, 60000); // Check every minute

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // This only runs on the first render

  // Handle changing the day in backend
  const handleChangeDay = async () => {
    try {
      const response = await fetch('https://be-ciamis.vercel.app/day/set_day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: newDay }),
      });

      if (response.ok) {
        const data = await response.json();
        setDay(data.day);
        setShowInputDay(false); // Hide input after successful change
      } else {
        alert('Invalid input');
      }
    } catch (error) {
      console.error('Error updating day:', error);
    }
  };

  // Handle resetting the day to 1
  const handleResetDay = async () => {
    try {
      const response = await fetch('https://be-ciamis.vercel.app/day/reset_day', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setDay(data.day);
        setShowInputDay(false); // Hide input after reset
      }
    } catch (error) {
      console.error('Error resetting day:', error);
    }
  };

  // Increment day
  const handleChangeDayIncrement = async () => {
    try {
      // Fetch the current day first
      const dayResponse = await fetch('https://be-ciamis.vercel.app/day/get_day');
      const dayData = await dayResponse.json();

      // Ensure we got a valid day
      if (dayData.day !== undefined) {
        const newDay = dayData.day + 1; // Increment the day by 1

        // Send the updated day to the backend
        const response = await fetch('https://be-ciamis.vercel.app/day/set_day', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ day: newDay }),
        });

        if (response.ok) {
          const data = await response.json();
          setDay(data.day); // Update the state with the new day value
        } else {
          console.error('Failed to update day');
        }
      } else {
        console.error('Invalid day data received');
      }
    } catch (error) {
      console.error('Error incrementing day:', error);
    }
  };

  // Handle changing jumlah ayam
  const handleChangeJumlahAyam = async () => {
    const jumlahAyamNumber = parseFloat(jumlahAyam.toString());

    // Check if it's a valid number
    if (isNaN(jumlahAyamNumber)) {
      alert('Invalid input for jumlah ayam');
      return;
    }

    try {
      const response = await fetch('https://be-ciamis.vercel.app/day/set_jml_ayam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jml_ayam: jumlahAyamNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setJumlahAyam(data.jml_ayam);
        setShowInputJumlahAyam(false);
      } else {
        alert('Invalid input');
      }
    } catch (error) {
      console.error('Error updating jumlah ayam:', error);
    }
  };

  // Handle changing jumlah ayam mati
  const handleChangeJumlahAyamMati = async () => {
    const jumlahAyamMatiNumber = parseFloat(jumlahAyamMati.toString());

    // Check if it's a valid number
    if (isNaN(jumlahAyamMatiNumber)) {
      alert('Invalid input for jumlah ayam mati');
      return;
    }

    try {
      // Update jumlah ayam mati on the backend
      const response = await fetch('https://be-ciamis.vercel.app/day/set_ayam_mati', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ayam_mati: jumlahAyamMatiNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setJumlahAyamMati(data.ayam_mati);
        setShowInputJumlahAyamMati(false);

        // Fetch the updated jumlah ayam mati from the backend
        const ayamMatiResponse = await fetch('https://be-ciamis.vercel.app/day/get_ayam_mati');
        const ayamMatiData = await ayamMatiResponse.json();
        setJumlahAyamMati(ayamMatiData.ayam_mati); // Update the state with the latest data
      } else {
        alert('Invalid input');
      }
    } catch (error) {
      console.error('Error updating jumlah ayam mati:', error);
    }
  };

  return (
    <React.Fragment>
      {/* Day */}
      <div className="md:col-span-3 lg:col-span-3 col-span-12 card 2xl:col-span-3">
        <div className="card-body pt-4">
          <h1 className="text-xl font-semibold mb-4">
            Umur Ayam:
            <div className="text-2xl font-bold">{day !== null ? day : 'Loading...'}</div>
          </h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => setShowInputDay(true)}>
            Ubah Hari
          </button>
        </div>

        {showInputDay && (
          <div className="card-body pt-4">
            <input
              type="number"
              value={newDay}
              onChange={(e) => setNewDay(e.target.value)}
              placeholder="Masukkan hari baru"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={handleChangeDay}>
                Submit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={handleResetDay}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Jumlah Ayam */}
      <div className="md:col-span-3 lg:col-span-3 col-span-12 card 2xl:col-span-3">
        <div className="card-body pt-4">
          <h1 className="text-xl font-semibold mb-4">
            Jumlah Seluruh Ayam:
            <div className="text-2xl font-bold">{jumlahAyam !== '' ? jumlahAyam : 'Loading...'}</div>
          </h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => setShowInputJumlahAyam(true)}>
            Ubah Jumlah Ayam
          </button>
        </div>

        {showInputJumlahAyam && (
          <div className="card-body pt-4">
            <input
              type="number"
              value={jumlahAyam}
              onChange={(e) => setJumlahAyam(e.target.value)}
              placeholder="Masukkan jumlah ayam"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={handleChangeJumlahAyam}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Jumlah Ayam Mati */}
      <div className="md:col-span-3 lg:col-span-3 col-span-12 card 2xl:col-span-3">
        <div className="card-body pt-4">
          <h1 className="text-xl font-semibold mb-4">
            Jumlah Ayam Mati:
            <div className="text-2xl font-bold">{jumlahAyamMati !== '' ? jumlahAyamMati : 'Loading...'}</div>
          </h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => setShowInputJumlahAyamMati(true)}>
            Ubah Jumlah Ayam Mati
          </button>
        </div>

        {showInputJumlahAyamMati && (
          <div className="card-body pt-4">
            <input
              type="number"
              value={jumlahAyamMati}
              onChange={(e) => setJumlahAyamMati(e.target.value)}
              placeholder="Masukkan jumlah ayam mati"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={handleChangeJumlahAyamMati}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Ayam;
