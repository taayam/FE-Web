import React from "react";
import ReactApexChart from "react-apexcharts";
import useChartColors from "Common/useChartColors";

const TotalEmployeeChart = ({ chartId, dataChartColor, series }: any) => {

    const chartColors = useChartColors(chartId);
    //  Total Employee
    var options: any = {
        chart: {
            height: 110,
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '50%',
                },
                track: {
                    margin: 2,
                },
                dataLabels: {
                    show: false
                }
            }
        },
        grid: {
            padding: {
                top: -15,
                bottom: -15
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['Total Employee'],
        colors: chartColors
    };
    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series}
                data-chart-colors={dataChartColor}
                id={chartId}
                className="grow apex-charts"
                type='radialBar'
                height={110}
            />
        </React.Fragment>
    );
};
const BiogasProductionChart = ({ chartId, dataChartColor, series }: any) => {

    const chartColors = useChartColors(chartId);

    var options: any = {
        chart: {
            height: 110,
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '50%',
                },
                track: {
                    margin: 2,
                },
                dataLabels: {
                    show: false
                }
            }
        },
        grid: {
            padding: {
                top: -15,
                bottom: -15
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['Biogas Production'], // Changed label
        colors: chartColors
    };
    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series}
                data-chart-colors={dataChartColor}
                id={chartId}
                className="grow apex-charts"
                type='radialBar'
                height={110}
            />
        </React.Fragment>
    );
};
const ApplicationReceivedChart = ({ chartId }: any) => {

    const chartColors = useChartColors(chartId);
    //  Total Employee
    const series = [{
        name: 'Total Application',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'Hired Candidates',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }];
    var options: any = {
        chart: {
            height: 315,
            type: 'line',
            stacked: false,
            margin: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: [2, 2],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },

        fill: {
            opacity: [0.03, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        colors: chartColors,
        markers: {
            size: 0
        },
        grid: {
            padding: {
                top: -15,
                right: 0,
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y : any) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;

                }
            }
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series}
                data-chart-colors='["bg-custom-500", "bg-green-500"]'
                id={chartId}
                className="apex-charts"
                type='line'
                height={315}
            />
        </React.Fragment>
    );
};
const GreenEnergyChart = ({ chartId }: any) => {

    const chartColors = useChartColors(chartId);
    const series = [{
        name: 'Total Biogas Production', // Adjust label
        type: 'area',
        data: [50, 60, 55, 70, 40, 65, 30, 60, 75, 50, 60] //  biogas production data (in m³)
    }, {
        name: 'Energy Generated', // Adjust label
        type: 'line',
        data: [35, 30, 50, 40, 20, 45, 10, 60, 65, 50, 55] //  energy generated data (in kWh)
    }];
    var options: any = {
        chart: {
            height: 315,
            type: 'line',
            stacked: false,
            margin: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: [2, 2],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },

        fill: {
            opacity: [0.03, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Adjust labels
        colors: chartColors,
        markers: {
            size: 0
        },
        grid: {
            padding: {
                top: -15,
                right: 0,
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y : any) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " m³"; // Adjust units
                    }
                    return y;

                }
            }
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series}
                data-chart-colors='["bg-custom-500", "bg-green-500"]'
                id={chartId}
                className="apex-charts"
                type='line'
                height={315}
            />
        </React.Fragment>
    );
};


const TotalProjectsChart = ({ chartId }: any) => {

    const chartColors = useChartColors(chartId);
    //  Total Employee
    const series = [{
        name: 'New',
        data: [44, 55, 41, 67, 22, 43, 14, 55, 41,]
    }, {
        name: 'Pending',
        data: [13, 23, 20, 8, 13, 27, 8, 20, 8,]
    }, {
        name: 'Completed',
        data: [11, 17, 15, 15, 21, 14, 24, 11, 17,]
    }, {
        name: 'Rejected',
        data: [21, 7, 25, 13, 22, 8, 13, 7, 25,]
    }];
    var options: any = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            zoom: {
                enabled: true
            },
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 2,
                columnWidth: '25%',
            },
        },
        grid: {
            padding: {
                top: -15,
                bottom: 5,
                right: 0,
            }
        },
        xaxis: {
            categories: ['01', '02', '03', '04',
                '05', '06', '07', '08', '09'
            ],
        },
        dataLabels: {
            enabled: false
        },
        colors: chartColors,
        legend: {
            position: 'bottom',
        },
        fill: {
            opacity: 1
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series}
                data-chart-colors='["bg-custom-500", "bg-yellow-500", "bg-green-400", "bg-red-400"]'
                id={chartId}
                className="-ml-2 apex-charts"
                type='bar'
                height={350}
            />
        </React.Fragment>
    );
};
const TotalGreenEnergyChart = ({ chartId }: any) => {
    const chartColors = useChartColors(chartId);

    // Data series for green energy from biogas
    const series = [{
        name: 'Biogas Production (m³)',
        data: [50, 60, 55, 70, 40, 65, 30, 60, 75] // Replace with actual biogas production data
    }, {
        name: 'Energy Generated (kWh)',
        data: [35, 30, 50, 40, 55, 45, 70, 60, 65] // Replace with actual energy generated data
    }, {
        name: 'Efficiency (%)',
        data: [70, 75, 80, 78, 82, 85, 90, 88, 85] // Example efficiency data
    }];

    const options: any = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            zoom: {
                enabled: true
            },
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 2,
                columnWidth: '25%',
            },
        },
        grid: {
            padding: {
                top: -15,
                bottom: 5,
                right: 0,
            }
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9'], // Updated categories
        },
        dataLabels: {
            enabled: false
        },
        colors: chartColors,
        legend: {
            position: 'bottom',
        },
        fill: {
            opacity: 1
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series}
                data-chart-colors='["bg-green-500", "bg-blue-500", "bg-yellow-400"]' // Adjust colors accordingly
                id={chartId}
                className="-ml-2 apex-charts"
                type='bar'
                height={350}
            />
        </React.Fragment>
    );
};

export {
    GreenEnergyChart,
    TotalGreenEnergyChart,
    TotalEmployeeChart,
    ApplicationReceivedChart,
    TotalProjectsChart,
    BiogasProductionChart
};
