import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useChartColors from "Common/useChartColors";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Pastikan locale Indonesia di-import

// Suhu Kandang Chart
const EnvironmentComparisonChartSuhu = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensic/Temperature?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Suhu:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data suhu...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"), // Format: 7 Juni 2025
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Suhu Kandang",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Suhu Kandang</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// RTD_Temp Chart (Suhu Lingkungan) - Independently Processed
const EnvironmentComparisonChartRTDTemp = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [rtdData, setRtdData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensic/RTD_Temp?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Suhu Lingkungan (RTD):", data);
                    if (Array.isArray(data)) {
                        setRtdData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setRtdData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setRtdData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!rtdData || !Array.isArray(rtdData)) {
        return <p>Loading data suhu lingkungan...</p>;
    }

    // Format RTD_Temp data separately and keep it independent
    const formattedData = rtdData.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"), // Format: 7 Juni 2025
        value: item.nilai,
    }));

    // Use RTD_Temp's own unique labels for X-axis (independent of other sensors)
    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Suhu Lingkungan (RTD)",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels, // Custom X-axis categories for RTD_Temp
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Suhu Lingkungan (RTD)</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// Kelembaban Chart
const EnvironmentComparisonChartKelembaban = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensic/Humidity?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Kelembaban:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]);
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]);
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data kelembaban...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Kelembaban Kandang",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Kelembaban Kandang</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// CO2 Chart
const EnvironmentComparisonChartCO2 = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensic/CO2?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data CO2:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]);
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]);
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data CO2...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "CO2 Kandang",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik CO2 Kandang</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};




// Light
const EnvironmentComparisonChartLihgt = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensic/Light?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Cahaya:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data Cahaya...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Cahaya Kandang",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Cahaya Kandang</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// NH3 Chart
const EnvironmentComparisonChartNH3 = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensic/NH3?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data NH3:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data NH3...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "NH3 Kandang",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik NH3 Kandang</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// DO
const EnvironmentComparisonChartDO = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/DissolvedOxygen?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data DO:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data DO...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Dissolved Oxygen",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Dissolved Oxygen</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

//EC
const EnvironmentComparisonChartEC = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/EC?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data EC:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data EC...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "EC Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik EC Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// Suhu Air
const EnvironmentComparisonChartSuhuAir = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/Temperature?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Temperature Air:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data Suhu Air...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Suhu Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Suhu Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};


// pH
const EnvironmentComparisonChartpH = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/pH?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data pH:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data pH...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "pH Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik pH Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};


// NH3 Chart
const EnvironmentComparisonChartMoisture = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/Moisture?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data NH3:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data Moisture...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Moisture Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Moisture Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};


// Nitrate
const EnvironmentComparisonChartNitrate = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/Nitrate?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Nitrate:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data Nitrate...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Nitrate Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Nitrate Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};
// NH3 Chart
const EnvironmentComparisonChartNitrogen = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/Nitrogen?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Nitrogen:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data Nitrogen...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Nitrogen Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Nitrogen Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// Fosfor
const EnvironmentComparisonChartFosfor = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/Phosphorus?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Fosfor:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data Fosfor...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Fosfor Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Fosfor Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};

// Potassium
const EnvironmentComparisonChartSalinity = ({ chartId, selectedDateRange }: any) => {
    const chartColors = useChartColors(chartId);
    const [datasensor, setSensorData] = useState<any[] | null>(null);

    useEffect(() => {
        if (selectedDateRange) {
            const startDate = selectedDateRange[0].toLocaleDateString('id-ID');
            const endDate = selectedDateRange[1].toLocaleDateString('id-ID');
            fetch(`https://be-ciamis.vercel.app/api/forensik/Salinity?start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Sensor Data Salinity:", data);
                    if (Array.isArray(data)) {
                        setSensorData(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSensorData([]); // Set empty array if the response is not valid
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    setSensorData([]); // Handle error by setting an empty array
                });
        }
    }, [selectedDateRange]);

    if (!datasensor || !Array.isArray(datasensor)) {
        return <p>Loading data Salinity...</p>;
    }

    const formattedData = datasensor.map((item) => ({
        label: dayjs(item.tanggal).locale('id').format("D MMMM YY"),
        value: item.nilai,
    }));

    const uniqueLabels = formattedData.map((item, index, self) =>
        index > 0 && item.label === self[index - 1].label ? "" : item.label
    );

    const series = [
        {
            name: "Salinity Air",
            data: formattedData.map((item) => item.value),
        },
    ];

    const options: any = {
        chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        xaxis: {
            categories: uniqueLabels,
        }
    };

    return (
        <div className="chart-container">
            <h2>Grafik Salinity Air</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={200}
            />
        </div>
    );
};


export {
    EnvironmentComparisonChartSuhu,
    EnvironmentComparisonChartRTDTemp,
    EnvironmentComparisonChartKelembaban,
    EnvironmentComparisonChartCO2,
    EnvironmentComparisonChartLihgt,
    EnvironmentComparisonChartNH3,
    EnvironmentComparisonChartDO,
    EnvironmentComparisonChartEC,
    EnvironmentComparisonChartFosfor,
    EnvironmentComparisonChartMoisture,
    EnvironmentComparisonChartNitrate,
    EnvironmentComparisonChartNitrogen,
    EnvironmentComparisonChartSalinity,
    EnvironmentComparisonChartSuhuAir,
    EnvironmentComparisonChartpH
};
