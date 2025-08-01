import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/flatpickr.css";
import { Indonesian } from "flatpickr/dist/l10n/id.js";  // Import locale Indonesia
import { 
    EnvironmentComparisonChartSuhu,
    EnvironmentComparisonChartRTDTemp,
    EnvironmentComparisonChartKelembaban,
    EnvironmentComparisonChartCO2,
    EnvironmentComparisonChartNH3,
    EnvironmentComparisonChartLihgt,
    EnvironmentComparisonChartDO,
    EnvironmentComparisonChartFosfor,
    EnvironmentComparisonChartNitrate,
    EnvironmentComparisonChartNitrogen,
    EnvironmentComparisonChartSalinity,
    EnvironmentComparisonChartSuhuAir,
    EnvironmentComparisonChartpH
} from './Charts';

const Forensik = () => {
    // State untuk menyimpan sensor yang dipilih, dengan default kosong
    const [selectedSensor, setSelectedSensor] = useState<string>("");
    const [selectedDateRange, setSelectedDateRange] = useState<[Date, Date] | null>(null);

    // State untuk pilihan sensor kedua dan rentang tanggal kedua
    const [secondSelectedSensor, setSecondSelectedSensor] = useState<string>("");
    const [secondSelectedDateRange, setSecondSelectedDateRange] = useState<[Date, Date] | null>(null);
    
    // Fungsi untuk menangani perubahan pilihan sensor pertama
    const handleSensorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSensor(e.target.value);
    };

    // Fungsi untuk menangani perubahan pilihan sensor kedua
    const handleSecondSensorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSecondSelectedSensor(e.target.value);
    };

    // Fungsi untuk menangani perubahan pilihan rentang tanggal pertama
    const handleDateChange = (date: Date[]) => {
        if (date.length === 2) {
            setSelectedDateRange([date[0], date[1]]);
        }
    };

    // Fungsi untuk menangani perubahan pilihan rentang tanggal kedua
    const handleSecondDateChange = (date: Date[]) => {
        if (date.length === 2) {
            setSecondSelectedDateRange([date[0], date[1]]);
        }
    };

    // Fungsi untuk menghapus pilihan sensor kedua dan rentang tanggal keduanya
    const handleRemoveSecondSensor = () => {
        setSecondSelectedSensor(""); // Reset sensor kedua
        setSecondSelectedDateRange(null); // Reset rentang tanggal kedua
    };

    // Trigger the fetch immediately when the date range is selected
    useEffect(() => {
        if (selectedDateRange) {
            // Fetch data when the date range is selected
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
        }
    }, [selectedDateRange]); // Run this when the date range changes


    return (
        <React.Fragment>
            {/* Judul "Data Forensik" */}
            <div className="col-span-12">
                <h1 className="text-xl font-semibold mb-4 dark:text-white text-black">Data Forensik</h1>
            </div>

            {/* Dropdown Pilihan Sensor Pertama */}
            <div className="col-span-12 mb-4">
                <label htmlFor="sensorSelect" className="mr-2 dark:text-white text-black">Pilih Sensor:</label>
                <select
                    id="sensorSelect"
                    value={selectedSensor}
                    onChange={handleSensorChange}
                    className="form-select dark:bg-gray-700 dark:text-white text-black"
                >
                    <option value="" disabled>Pilih Sensor</option> 
                    <option value="suhu">Suhu Ayam</option>
                    <option value="suhuling">Suhu Lingkungan Kandang Ayam</option>
                    <option value="kelembaban">Kelembaban Ayam</option>
                    <option value="CO2">Kadar CO2</option>
                    <option value="NH3">Kadar Amonia</option>
                    <option value="Light">Cahaya</option>
                    <option value="DO">Dissolved Oxygen</option>
                    <option value="suhuair">Suhu Air</option>
                    <option value="pH">pH Air</option>
                    <option value="nitrogen">Nitrogen</option>
                    <option value="phosphorus">Fosfor</option>
                    <option value="salinity">Salinity</option>
                </select>
            </div>

            {/* Pilihan Tanggal Pertama */}
            {selectedSensor && (
                <div className="col-span-12 mb-4">
                    <label htmlFor="datePicker" className="mr-2 dark:text-white text-black">Pilih Rentang Tanggal:</label>
                    <Flatpickr
                        id="datePicker"
                        className="form-input dark:bg-gray-700 dark:text-white text-black"
                        value={selectedDateRange ? [selectedDateRange[0], selectedDateRange[1]] : []}
                        onChange={handleDateChange}
                        options={{
                            dateFormat: "d M, Y",
                            enableTime: false,
                            mode: "range", // Memungkinkan pemilihan rentang tanggal
                            onClose: () => {
                                if (selectedDateRange) {
                                    const calendar = document.querySelector('.flatpickr-calendar');
                                    if (calendar) {
                                        calendar.classList.remove('open');
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )}

            {/* Render Chart Based on Selected Sensor */}
            {selectedSensor && selectedDateRange && selectedSensor === "suhu" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartSuhu chartId="environmentDataChartSuhu" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "suhuling" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartRTDTemp chartId="environmentDataChartSuhuLingkungan" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "kelembaban" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartKelembaban chartId="environmentDataChartKelembaban" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "CO2" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartCO2 chartId="environmentDataChartCO2" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "NH3" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartNH3 chartId="environmentDataChartNH3" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "Light" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartLihgt chartId="environmentDataChartLight" selectedDateRange={selectedDateRange} />
                </div>
            //Ikan
            )}
                        {/* Render Chart Based on Selected Sensor */}
            {selectedSensor && selectedDateRange && selectedSensor === "DO" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartDO chartId="environmentDataChartDO" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "suhuair" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartSuhuAir chartId="environmentDataChartsuhuair" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "pH" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartpH chartId="environmentDataChartpH" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "nitrate" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartNitrate chartId="environmentDataChartnitrate" selectedDateRange={selectedDateRange} />
                </div>
            )}
                        {selectedSensor && selectedDateRange && selectedSensor === "nitrogen" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartNitrogen chartId="environmentDataChartNitrogen" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "phosphorus" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartFosfor chartId="environmentDataChartphosphorus" selectedDateRange={selectedDateRange} />
                </div>
            )}
            {selectedSensor && selectedDateRange && selectedSensor === "salinity" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartSalinity chartId="environmentDataChartsalinity" selectedDateRange={selectedDateRange} />
                </div>
            )}
            

            {/* Dropdown Pilihan Sensor Kedua setelah grafik pertama */}
            {selectedDateRange && selectedSensor && (
                <div className="col-span-12 mb-4">
                    <label htmlFor="secondSensorSelect" className="mr-2 dark:text-white text-black">Pilih Sensor Kedua:</label>
                    <select
                        id="secondSensorSelect"
                        value={secondSelectedSensor}
                        onChange={handleSecondSensorChange}
                        className="form-select dark:bg-gray-700 dark:text-white text-black"
                    >
                    <option value="" disabled>Pilih Sensor</option> 
                    <option value="suhu">Suhu Ayam</option>
                    <option value="suhuling">Suhu Lingkungan Kandang Ayam</option>
                    <option value="kelembaban">Kelembaban Ayam</option>
                    <option value="CO2">Kadar CO2</option>
                    <option value="NH3">Kadar Amonia</option>
                    <option value="Light">Cahaya</option>
                    <option value="DO">Dissolved Oxygen</option>
                    <option value="suhuair">Suhu Air</option>
                    <option value="pH">pH Air</option>
                    <option value="nitrogen">Nitrogen</option>
                    <option value="phosphorus">Fosfor</option>
                    <option value="salinity">Salinity</option>
                </select>
                </div>
            )}

            {/* Pilihan Tanggal Kedua */}
            {secondSelectedSensor && (
                <div className="col-span-12 mb-4">
                    <label htmlFor="secondDatePicker" className="mr-2 dark:text-white text-black">Pilih Rentang Tanggal Kedua:</label>
                    <Flatpickr
                        id="secondDatePicker"
                        className="form-input dark:bg-gray-700 dark:text-white text-black"
                        value={secondSelectedDateRange ? [secondSelectedDateRange[0], secondSelectedDateRange[1]] : []}
                        onChange={handleSecondDateChange}
                        options={{
                            dateFormat: "d M, Y",
                            enableTime: false,
                            mode: "range", // Memungkinkan pemilihan rentang tanggal
                            onClose: () => {
                                if (secondSelectedDateRange) {
                                    const calendar = document.querySelector('.flatpickr-calendar');
                                    if (calendar) {
                                        calendar.classList.remove('open');
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )}

            {/* Render Chart Based on Second Selected Sensor */}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "suhu" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartSuhu chartId="environmentDataChartSuhuSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
                        {/* Render Chart Based on Second Selected Sensor */}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "suhuling" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartRTDTemp chartId="environmentDataChartSuhuLingkunganSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "kelembaban" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartKelembaban chartId="environmentDataChartKelembabanSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "CO2" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartCO2 chartId="environmentDataChartCO2Second" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "NH3" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartNH3 chartId="environmentDataChartNH3Second" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "Light" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartLihgt chartId="environmentDataChartLightSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}

            {/* Ikan */}
            {/* Render Chart Based on Second Selected Sensor */}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "DO" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartDO chartId="environmentDataChartDOSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "suhuair" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartSuhuAir chartId="environmentDataChartsuhuairSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "pH" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartpH chartId="environmentDataChartpHSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "nitrate" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartNitrate chartId="environmentDataChartnitrateSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "nitrogen" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartNitrogen chartId="environmentDataChartnitrogenSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "phosphorus" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartFosfor chartId="environmentDataChartphosphorusSecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {secondSelectedSensor && secondSelectedDateRange && secondSelectedSensor === "salinity" && (
                <div className="col-span-12 w-full">
                    <EnvironmentComparisonChartSalinity chartId="environmentDataChartsalinitySecond" selectedDateRange={secondSelectedDateRange} />
                </div>
            )}
            {/* Button to remove second sensor selection */}
            {secondSelectedSensor && (
                <div className="col-span-12 mb-4">
                    <button
                        onClick={handleRemoveSecondSensor}
                        className="btn btn-danger dark:bg-gray-600 dark:text-white text-black"
                    >
                        Hapus Sensor Kedua
                    </button>
                </div>
            )}
        </React.Fragment>
    );
};

export default Forensik;
