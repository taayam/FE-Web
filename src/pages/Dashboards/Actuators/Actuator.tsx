import React, { useState, useEffect } from 'react'; // Menambahkan useEffect
import {CalendarRange} from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/flatpickr.css";
import GIF from "../../../assets/images/feeder.gif";
import { database } from "config/config";
import { ref, set, onValue } from 'firebase/database'; // Menggunakan onValue untuk Firebase
import Tab from 'Common/Components/Tab/Tab';



const Actuator = () => {
    // Deklarasi state
    const [fanStatus, setFanStatus] = useState(false); 
    const [fanSpeed, setFanSpeed] = useState(0); 
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const [fanStatus2, setFanStatus2] = useState(false); 
    const [fanSpeed2, setFanSpeed2] = useState(0); 
    const [isConfirmed2, setIsConfirmed2] = useState(false);



    const [heaterStatus, setHeaterStatus] = useState(false); // Correct state declaration for heaterStatus
    const [isConfirmed3, setIsConfirmed3] = useState(false);

    const [value, setValue] = useState(400);
    const [feedSchedule, setFeedSchedule] = useState<Date | null>(null);
    const [feedAmount, setFeedAmount] = useState(400);
    const [isConfirmed1, setIsConfirmed1] = useState(false);

    const [upcomingSchedules, setUpcomingSchedules] = useState<any[]>([]); // State for storing upcoming schedules

    const [manualControlStatus, setManualControlStatus] = useState(false); // Default is "off"



    // Function to fetch and filter upcoming schedules from Firebase
    const fetchUpcomingSchedules = () => {
        const schedulesRef = ref(database, 'Automatic-Pakan');
        onValue(schedulesRef, snapshot => {
            const schedulesData = snapshot.val();
            if (schedulesData) {
                const filteredSchedules = Object.keys(schedulesData).filter((key) => {
                    // Convert key to Date object for comparison
                    const scheduleDate = new Date(
                        `${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6, 8)}T${key.slice(9, 11)}:${key.slice(11, 13)}:00`
                    );
                    // Filter schedules that are today or in the future
                    return scheduleDate
                });

                // Get the filtered schedules and map them to an array
                const schedules = filteredSchedules.map((key) => ({
                    date: key, // Date key in format YYYYMMDD_HHmm
                    amount: schedulesData[key], // Amount of feed
                }));

                // Set the upcoming schedules
                setUpcomingSchedules(schedules);
            }
        });
    };

    // Fetch data on mount
    useEffect(() => {
        fetchUpcomingSchedules(); // Fetch the upcoming schedules from Firebase
    }, []);










    // Handle Feed Schedule Change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
        setFeedAmount(Number(event.target.value)); // Calculate feed amount in grams
    };

    // Handle Date and Time Selection
    const handleSchedule = (selectedDates: Date[]) => {
        setFeedSchedule(selectedDates[0]); // Set the first selected date
    };

    // Format date to "YYYYMMDD_HHmm"
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}${month}${day}_${hours}${minutes}`;
    };

    const formatDateInIndonesian = (dateString: string) => {
    const dateParts = dateString.split('_')[0]; // Ambil bagian tanggal (20250524)
    const year = dateParts.slice(0, 4);
    const month = parseInt(dateParts.slice(4, 6), 10);
    const day = dateParts.slice(6, 8);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `Tanggal ${day} ${months[month - 1]} ${year}`;
};

// Fungsi untuk format jam (contoh: 1200 menjadi Jam 12.00)
const formatTime = (dateString: string) => {
    const timeParts = dateString.split('_')[1]; // Ambil bagian jam (1200)
    const hour = timeParts.slice(0, 2);
    const minute = timeParts.slice(2, 4);
    return `Jam ${hour}:${minute}`;
};

    // Confirm and Send Feed Schedule to Firebase
    const handleConfirmFeed = () => {
        if (feedSchedule) {
            const formattedDate = formatDate(feedSchedule); // Get formatted date

            // Use set to save the data under the key with formatted date
            const feedRef = ref(database, `Automatic-Pakan/${formattedDate}`);
            set(feedRef, feedAmount); // Save the amount of feed with the formatted date as key

            setIsConfirmed1(true);
             // Hide the confirmation message and reset after 3 seconds
            setTimeout(() => {
                setIsConfirmed1(false); // Hide message after 3 seconds
                setFeedSchedule(null);  // Reset the feed schedule
                setValue(50);  // Reset the feed amount slider to default value
            }, 3000);
        } else {
            alert("Please select a schedule.");
        }
    };

    
     // Ambil data dari Firebase ketika komponen dimuat
    useEffect(() => {
        const fanRef = ref(database, 'actuator-state/Inline'); // Path data kipas
        onValue(fanRef, snapshot => {  // Menggunakan onValue untuk mendengarkan data
            const fanData = snapshot.val(); // Mengambil data dari Firebase
            if (fanData) {
                setFanStatus(fanData !== 0);
                setFanSpeed(fanData);
            }
        });
    }, []);

    // Fungsi untuk mengirim data ke localhost:5000 (bukan Firebase)
    const sendDataToLocalhost = () => {
        const payload = {
            device: "Inline",
            settings: {
                speed: fanSpeed
            }
        };

        // Mengirim data menggunakan fetch ke localhost
        fetch("https://be-ciamis.vercel.app/manual_control", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload) // Mengirim data dalam format JSON
        })
        .then(response => response.json()) // Mengambil respons sebagai JSON
        .then(data => {
            console.log("Data sent to localhost:", data);
        })
        .catch(error => {
            console.error("Error sending data to localhost:", error);
        });
    };

    // Fungsi untuk menangani perubahan status kipas
    const toggleFanStatus = () => {
        setFanStatus(!fanStatus); // Toggle the fan status
        if (fanStatus) {
            setFanSpeed(0); // Set fan speed to 0 if turned off
        } else {
            setFanSpeed(50); // Set fan speed to 50 if turned on
        }
    };

    // Fungsi untuk menangani perubahan kecepatan kipas
    const changeFanSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFanSpeed(Number(event.target.value)); // Mengubah kecepatan kipas
    };

    // Fungsi untuk mengonfirmasi perubahan dan mengirimkan data ke localhost
    const handleConfirm = () => {
        sendDataToLocalhost(); // Kirim data ke localhost setelah konfirmasi
    };


// Ambil data dari Firebase ketika komponen dimuat
    useEffect(() => {
        const fanRef = ref(database, 'actuator-state/Exhaust'); // Path data kipas
        onValue(fanRef, snapshot => {  // Menggunakan onValue untuk mendengarkan data
            const fanData2 = snapshot.val(); // Mengambil data dari Firebase
            if (fanData2) {
                setFanStatus2(fanData2 !== 0);
                setFanSpeed2(fanData2);
            }
        });
    }, []);


   // Fungsi untuk mengirim data ke localhost:5000 (bukan Firebase)
    const sendDataToLocalhost2 = () => {
        const payload = {
            device: "Exhaust",
            settings: {
                speed: fanSpeed2
            }
        };

        // Mengirim data menggunakan fetch ke localhost
        fetch("https://be-ciamis.vercel.app/manual_control", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload) // Mengirim data dalam format JSON
        })
        .then(response => response.json()) // Mengambil respons sebagai JSON
        .then(data => {
            console.log("Data sent to localhost:", data);
        })
        .catch(error => {
            console.error("Error sending data to localhost:", error);
        });
    };

    // Fungsi untuk menangani perubahan status kipas
    const toggleFanStatus2 = () => {
        setFanStatus2(!fanStatus2); // Toggle the fan status
        if (fanStatus2) {
            setFanSpeed2(0); // Set fan speed to 0 if turned off
        } else {
            setFanSpeed2(50); // Set fan speed to 50 if turned on
        }
    };

    // Fungsi untuk menangani perubahan kecepatan kipas
    const changeFanSpeed2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFanSpeed2(Number(event.target.value)); // Mengubah kecepatan kipas
    };

    // Fungsi untuk mengonfirmasi perubahan dan mengirimkan data ke localhost
    const handleConfirm2 = () => {
        sendDataToLocalhost2(); // Kirim data ke localhost setelah konfirmasi
    };







// Ambil data dari Firebase ketika komponen dimuat
    useEffect(() => {
        const heaterRef = ref(database, 'actuator-state/Heater'); // Path to heater data
        onValue(heaterRef, snapshot => { // Menggunakan onValue untuk mendengarkan data
            const heaterData = snapshot.val(); // Mengambil data dari Firebase
            if (heaterData) {
                setHeaterStatus(heaterData !== 0); // Set status heater berdasarkan data dari Firebase
            }
        });
    }, []);

    // Fungsi untuk mengirim data ke localhost:5000 (bukan Firebase)
    const sendDataToLocalhost3 = () => {
        const payload = {
            device: "Heater", // Menyebutkan device yang dikontrol
            settings: {
                state: heaterStatus ? "1" : "0"  // Mengirimkan 1 untuk "on" dan 0 untuk "off"
            }
        };

        // Mengirim data menggunakan fetch ke localhost
        fetch("https://be-ciamis.vercel.app/manual_control", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload) // Mengirim data dalam format JSON
        })
        .then(response => response.json()) // Mengambil respons sebagai JSON
        .then(data => {
            console.log("Data sent to localhost:", data); // Mengkonfirmasi data yang dikirim
        })
        .catch(error => {
            console.error("Error sending data to localhost:", error); // Menangani error jika gagal
        });
    };



    // Fungsi untuk menangani perubahan status heater (toggle heater status)
    const toggleHeaterStatus = () => {
        const newStatus = !heaterStatus;  // Toggle the heater status
        setHeaterStatus(newStatus);  // Update the status
    };

    // Fungsi untuk mengonfirmasi perubahan dan mengirimkan data ke localhost
    const handleConfirm3 = () => {
        setIsConfirmed3(true); 
        sendDataToLocalhost3(); // Kirim data ke localhost setelah konfirmasi
    };



const handleDeleteSchedule = (scheduleDate: string) => {
    const scheduleRef = ref(database, `Automatic-Pakan/${scheduleDate}`); // Referensi ke jadwal berdasarkan tanggal

    // Menghapus data dari Firebase
    set(scheduleRef, null)
        .then(() => {
            alert('Schedule deleted successfully');
            // Update state atau lakukan apa yang diperlukan setelah data dihapus
            fetchUpcomingSchedules(); // Memanggil ulang untuk memperbarui data yang ditampilkan
        })
        .catch((error) => {
            alert('Error deleting schedule: ' + error.message);
        });
};





useEffect(() => {
    const manualControlRef = ref(database, 'Manual-control/status'); // Path to the status in Firebase
    onValue(manualControlRef, snapshot => {
        const status = snapshot.val(); // Get the status from Firebase
        if (status) {
            setManualControlStatus(status === "on"); // Convert to boolean ("on" -> true, "off" -> false)
        }
    });
}, []);


const toggleManualControlStatus = () => {
    const newStatus = !manualControlStatus; // Toggle the status
    setManualControlStatus(newStatus); // Update the state

    // Update the Firebase status
    const manualControlRef = ref(database, 'Manual-control/status');
    set(manualControlRef, newStatus ? "on" : "off"); // Update Firebase with the new status
};

const isDisabled = !manualControlStatus;

    return (
        <React.Fragment>

<div className="order-1 col-span-12 2xl:row-span-1 card">
    <div className="card-body">
        <div className="flex flex-col items-start">
            <div className="w-full text-center">
                <h2 className="text-sm font-medium">Manual Control</h2>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex flex-col items-start">
                    <label htmlFor="skyDefaultSwitch" className="inline-block text-sm font-medium text-left">Manual Control Status</label>
                </div>
                <div className="flex items-center">
                    <div className="relative inline-block w-10 align-middle transition duration-200 ease-in ltr:mr-2 rtl:ml-2">
                        <input
                            type="checkbox"
                            id="manual"
                            className="absolute block size-5 transition duration-300 ease-linear border-2 rounded-full appearance-none cursor-pointer border-slate-200 dark:border-zink-500 bg-white/80 dark:bg-zink-400 peer/published checked:bg-white dark:checked:bg-white ltr:checked:right-0 rtl:checked:left-0 checked:bg-none checked:border-sky-500 dark:checked:border-sky-500 arrow-none"
                            checked={manualControlStatus} // Bind the checkbox to the state
                            onChange={toggleManualControlStatus} // Call toggle function when checkbox is changed
                        />
                        <label htmlFor="manual" className="block h-5 overflow-hidden duration-300 ease-linear border rounded-full cursor-pointer transition border-slate-200 dark:border-zink-500 bg-slate-200 dark:bg-zink-600 peer-checked/published:bg-sky-500 peer-checked/published:border-sky-500"></label>
                    </div>
                    <span className="ml-2 text-xs">{manualControlStatus ? "On" : "Off"}</span>
                </div>
            </div>
        </div>
    </div>
</div>



                    {/* FAN1 */}

                    <div className="order-5 md:col-span-4 lg:col-span-4 col-span-12 2xl:order-2 card 2xl:col-span-4 2xl:row-span-1">
                        <div className="card-body">
                            <div className="flex flex-col items-start">
                                {/* Teks Fan Control di tengah */}
                                <div className="w-full text-center mb-4">  {/* Membungkus Fan Control dengan div yang diberi text-center */}
                                    <h2 className="text-sm font-medium">Inline Fan Control</h2>
                                </div>
                                    <div className="flex justify-between w-full mb-4">
                                        {/* Heater Status */}
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="heaterStatus" className="inline-block text-sm font-medium mb-1 text-left">Fan Status</label>
                                        </div>

                                        {/* On/Off Button */}
                                        <div className="flex items-center">
                                            <div className="relative inline-block w-10 align-middle transition duration-200 ease-in ltr:mr-2 rtl:ml-2">
                                                <input
                                                type="checkbox"
                                                id="skyDefaultSwitch"
                                                className="absolute block size-5 transition duration-300 ease-linear border-2 rounded-full appearance-none cursor-pointer border-slate-200 dark:border-zink-500 bg-white/80 dark:bg-zink-400 peer/published checked:bg-white dark:checked:bg-white ltr:checked:right-0 rtl:checked:left-0 checked:bg-none checked:border-sky-500 dark:checked:border-sky-500 arrow-none"
                                                checked={fanStatus}
                                                onChange={toggleFanStatus}
                                                disabled={isDisabled}
                                                
                                            />
                                            <label htmlFor="skyDefaultSwitch" className="block h-5 overflow-hidden duration-300 ease-linear border rounded-full cursor-pointer transition border-slate-200 dark:border-zink-500 bg-slate-200 dark:bg-zink-600 peer-checked/published:bg-sky-500 peer-checked/published:border-sky-500"></label>
                                        </div>
                                        <span className="ml-2 text-xs">{fanStatus ? "On" : "Off"}</span>
                                    </div>
                                </div>

                                {/* Fan Speed Control */}
                                <div className="flex flex-col items-start mb-4">
                                    <label htmlFor="fanSpeed" className="inline-block text-sm font-medium mb-1 text-left">Fan Speed</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            disabled={isDisabled}
                                            value={fanSpeed}
                                            onChange={changeFanSpeed}
                                            style={{ width: "70%" }}
                                            // className="slider"
                                            className="w-[calc(2*100%)] h-2 rounded-md bg-slate-200 dark:bg-zink-600 slider"
                                        />
                                        <span className="text-sm">{fanSpeed}%</span>
                                    </div>
                                </div>

                                {/* Confirm Button */}
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleConfirm}
                                        className="bg-blue-500 text-white p-2 rounded-md text-sm"
                                    >
                                        Confirm and Send Data
                                    </button>
                                </div>
                                </div>
                            </div>
                            
                            
                        </div>



            {/* FAN CONTROL 2 */}
            <div className="order-4 md:col-span-4 lg:col-span-4 col-span-12 2xl:order-3 card 2xl:col-span-4 2xl:row-span-1">
                <div className="card-body">
                    <div className="flex flex-col items-start">
                        {/* Fan Control 2 Title */}
                        <div className="w-full text-center mb-4">
                            <h2 className="text-sm font-medium">Exhaust Fan Control</h2>
                        </div>

                                    <div className="flex justify-between w-full mb-4">
                                        {/* Heater Status */}
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="heaterStatus" className="inline-block text-sm font-medium mb-1 text-left">Fan Status</label>
                                        </div>

                                        {/* On/Off Button */}
                                        <div className="flex items-center">
                                            <div className="relative inline-block w-10 align-middle transition duration-200 ease-in ltr:mr-2 rtl:ml-2">
                                               <input
                                                    type="checkbox"
                                                    name="fanSwitch2"
                                                    id="fanStatusSwitch2"
                                                    className="absolute block size-5 transition duration-300 ease-linear border-2 rounded-full appearance-none cursor-pointer border-slate-200 dark:border-zink-500 bg-white/80 dark:bg-zink-400 peer/published checked:bg-white dark:checked:bg-white ltr:checked:right-0 rtl:checked:left-0 checked:bg-none checked:border-sky-500 dark:checked:border-sky-500 arrow-none"
                                                    checked={fanStatus2}
                                                    onChange={toggleFanStatus2}
                                                    disabled={isDisabled}
                                                />
                                                <label htmlFor="fanStatusSwitch2" className="block h-5 overflow-hidden duration-300 ease-linear border rounded-full cursor-pointer transition border-slate-200 dark:border-zink-500 bg-slate-200 dark:bg-zink-600 peer-checked/published:bg-sky-500 peer-checked/published:border-sky-500"></label>
                                            </div>
                                            {/* Text for On/Off placed below switch */}
                                            <span className="ml-2 text-xs">{fanStatus2 ? "On" : "Off"}</span>
                                        </div>
                                    </div>

                        {/* Fan Speed Control */}
                        <div className="flex flex-col items-start mb-4">
                            <label htmlFor="fanSpeed2" className="inline-block text-sm font-medium mb-1 text-left">Fan Speed</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    disabled={isDisabled}
                                    value={fanSpeed2}
                                    onChange={changeFanSpeed2}
                                    style={{ width: "70%" }}
                                    className="slider"
                                />
                                <span className="text-sm">{fanSpeed2}%</span>
                            </div>
                        </div>

                        {/* Confirm Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleConfirm2}
                                className="bg-blue-500 text-white p-2 rounded-md text-sm"
                            >
                                Confirm and Send Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>














                        {/* Heater Control */}
                        <div className="order-3 md:col-span-4 lg:col-span-4 col-span-12 2xl:order-4 card 2xl:col-span-4 2xl:row-span-1">
                            <div className="card-body">
                                <div className="flex flex-col items-start">
                                    {/* Heater Control Title */}
                                    <div className="w-full text-center mb-4">
                                        <h2 className="text-sm font-medium">Heater Control (Lamp)</h2>
                                    </div>

                                    {/* Heater Status Control */}
                                    <div className="flex justify-between w-full mb-4">
                                        {/* Heater Status */}
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="heaterStatus" className="inline-block text-sm font-medium mb-1 text-left">Heater Status</label>
                                        </div>

                                        {/* On/Off Button */}
                                        <div className="flex items-center">
                                            <div className="relative inline-block w-10 align-middle transition duration-200 ease-in ltr:mr-2 rtl:ml-2">
                                                <input
                                                    type="checkbox"
                                                    name="heaterStatusSwitch"
                                                    id="heaterStatusSwitch"
                                                    className="absolute block size-5 transition duration-300 ease-linear border-2 rounded-full appearance-none cursor-pointer border-slate-200 dark:border-zink-500 bg-white/80 dark:bg-zink-400 peer/published checked:bg-white dark:checked:bg-white ltr:checked:right-0 rtl:checked:left-0 checked:bg-none checked:border-sky-500 dark:checked:border-sky-500 arrow-none"
                                                    checked={heaterStatus}
                                                    onChange={toggleHeaterStatus}
                                                    disabled={isDisabled}
                                                />
                                                <label htmlFor="heaterStatusSwitch" className="block h-5 overflow-hidden duration-300 ease-linear border rounded-full cursor-pointer transition border-slate-200 dark:border-zink-500 bg-slate-200 dark:bg-zink-600 peer-checked/published:bg-sky-500 peer-checked/published:border-sky-500"></label>
                                            </div>
                                            <span className="ml-2 text-xs">{heaterStatus ? "On" : "Off"}</span>
                                        </div>
                                    </div>

                                    {/* Heater Level Control */}
                                    <div className="flex flex-col items-start mb-12">
                                        <div className="flex items-center gap-2">
                                        </div>
                                    </div>
                                     <div className="flex flex-col items-start mb-2">
                                        <div className="flex items-center gap-2">
                                        </div>
                                    </div>
                                    

                                    {/* Confirm Button */}
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleConfirm3}
                                            className="bg-blue-500 text-white p-2 rounded-md text-sm"
                                        >
                                            Confirm and Send Data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


             {/* Upcoming Schedules Section */}         
            <Tab.Container defaultActiveKey="upcomingSchedules">
                <div className="order-1 md:col-span-4 lg:col-span-4 col-span-12 2xl:order-5 card 2xl:col-span-4 2xl:row-span-1">
                    <div className="card-body">
                        <h6 className="text-15 mb-4">Upcoming Feed Schedules</h6>
                        <Tab.Content className="relative h-[200px] overflow-y-auto">
                            {/* Tab.Pane untuk menampilkan feed schedules */}
                            <Tab.Pane eventKey="upcomingSchedules">
                            {upcomingSchedules.length > 0 ? (
                                upcomingSchedules.map((schedule, index) => (
                                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-2 mb-3 rounded-md">
                                    <p><strong>
                                    {/* Mengubah format tanggal dan waktu */}
                                    {formatDateInIndonesian(schedule.date)} {formatTime(schedule.date)}
                                    </strong></p>
                                    <p><strong>Jumlah :</strong> {schedule.amount} Grams</p>

                                    {/* Tombol Hapus */}
                                    <button
                                    onClick={() => handleDeleteSchedule(schedule.date)}  // Panggil fungsi hapus ketika tombol ditekan
                                    className="text-red-500 hover:text-red-700">
                                    Hapus
                                    </button>
                                </div>
                                ))
                            ) : (
                                <p>No upcoming schedules.</p>
                            )}
                            </Tab.Pane>

                            {/* Tab.Pane lain jika diperlukan */}
                            <Tab.Pane eventKey="otherTab">
                                {/* Konten untuk tab lain */}
                                <p>Content for other tab</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>







            {/* Chicken Feeder Section */}
            <div className="order-2 md:col-span-8 lg:col-span-8 col-span-12 2xl:order-6 card 2xl:col-span-8 2xl:row-span-1">
                <div className="card-body">
                    <div className="flex flex-col gap-4 mb-1 md:mb-3 md:items-center md:flex-row">
                        <h6 className="grow text-15">Automatic Chicken Farm Overview</h6>
                        <div className="relative">
                            <CalendarRange className="absolute size-4 ltr:left-3 rtl:right-3 top-3 text-slate-500 dark:text-zink-200" />
                            <Flatpickr
                                className="ltr:pl-10 rtl:pr-10 form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y H:i",
                                    enableTime: true,
                                }}
                                onChange={handleSchedule} // Update schedule
                                placeholder="Select Date and Time"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mt-1">
                        <div className="col-span-2">
                            <div className="mt-0">
                                <label htmlFor="DefaultRange" className="inline-block text-base font-medium">Feed the Chickens</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="0"
                                        max="5000"
                                        value={value}
                                        onChange={handleChange}
                                        step="100"
                                        className="form-input"
                                        // className="w-full h-8 rounded-md bg-slate-200 dark:bg-zink-600 slider"
                                        id="DefaultRange"
                                    />
                                    <p className="ml-2 text-center text-white bg-blue-500 p-2 rounded">{feedAmount} Grams</p>
                                </div>



                                {feedSchedule && !isConfirmed1 && (
                                    <div className="mt-4 text-center">
                                        <p>Scheduled for: {feedSchedule.toLocaleString()}</p>
                                    </div>
                                )}
                                {isConfirmed1 && (
                                    <div className="mt-4 text-center text-green-500">
                                        <p>Feed scheduled and data sent to Firebase!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <img src={GIF} className="col-span-1" alt="Example GIF" style={{ maxWidth: '70%', maxHeight: '70%' }} key={Date.now()} /> */}
                    </div>
                    <div className="mt-4 mx-auto flex justify-center gap-3 pt-12">
                    {/* <button className="mr-2 border-2 border-blue-500 text-blue-500 rounded p-0.5 text-base sm:p-0.2 sm:text-sm w-full sm:w-400">
                        Schedule it
                    </button> */}
                    <button
                        onClick={handleConfirmFeed}
                        className="bg-blue-500 text-white rounded p-0.5 text-xs  sm:text-sm w-full sm:w-400"
                    >
                        Confirm and Send
                    </button>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
};
export default Actuator;
