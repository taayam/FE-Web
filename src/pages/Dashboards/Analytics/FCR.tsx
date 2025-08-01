import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import useChartColors from 'Common/useChartColors'; // Assuming the custom hook is available

const FCRChart: React.FC = () => {
  const [fcrData, setFcrData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state to track the data fetch
  const [chartOptions, setChartOptions] = useState<any>({}); // Declare chartOptions state

  const chartId = 'fcrChart'; // A unique ID for this chart

  // Ensure useChartColors returns a valid array (fallback to empty array if undefined)
  const chartColors = useChartColors(chartId) || [];
  const dataChartColor = chartColors.length > 0 ? chartColors.join(',') : 'rgba(0,0,0,0.5)'; // Use a fallback if chartColors is empty

  useEffect(() => {
    // Fetch the data from the backend
    fetch('https://be-ciamis.vercel.app/get_fcr')
      .then((response) => response.json())
      .then((data) => {
        setFcrData(data);

        // Ensure data is available before proceeding
        if (data && Array.isArray(data) && data.length > 0) {
          // Prepare the data for the chart
          const days = data.map((item: any) => `${item.day}`);
          const fcrValues = data.map((item: any) => item.FCR);

          // Configure chart options for a line chart
          const options = {
            chart: {
              height: 350,
              type: 'line',  // Change back to line chart
            },
            plotOptions: {
              line: {
                curve: 'smooth',  // Smooth curve for the line chart
              },
            },
            stroke: {
              width: 2,
              lineCap: 'round',
            },
            xaxis: {
              categories: days,
              title: {
                text: 'Umur', // Title for X-axis
              },
              labels: {
                align: 'left',  // Align labels to the left
                rotate: -45,    // Rotate labels for better visibility
                style: {
                  fontSize: '12px',  // Font size of the labels
                },
              },
              tickAmount: 10, // Add tick marks along the X-axis
            },
            yaxis: {
              title: {
                text: 'FCR', // Title for Y-axis
              },
              min: 0,  // Set the minimum value of the Y-axis
              max: 5,  // Set the maximum value of the Y-axis
              labels: {
                formatter: function (value: number) {
                  return value.toFixed(2); // Display FCR values to two decimal places
                },
              },
              tickAmount: 6, // Add tick marks along the Y-axis
            },
            grid: {
              show: true, // Enable grid lines
              borderColor: '#e7e7e7',
              strokeDashArray: 4,
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
              },
            },
            series: [
              {
                name: 'FCR',
                data: fcrValues, // Use the FCR values as data for the line chart
              },
            ],
            colors: chartColors, // Apply dynamic colors
          };

          // Set chart options and data
          setChartOptions(options);
        }

        setLoading(false); // Set loading to false when data is ready
      })
      .catch((error) => {
        console.error('Error fetching FCR data:', error);
        setLoading(false); // Ensure loading is set to false if there's an error
      });
  }, []);

  // Conditional rendering: show loading message or chart
  if (loading) {
    return <div>Loading chart...</div>; // Show loading message while fetching data
  }

  // Check if the chart options and data are valid
  if (!chartOptions.series || !chartOptions.series.length) {
    return <div>No data available for the chart.</div>;
  }

  return (
    <div className="lg:col-span-6 col-span-12 card 2xl:col-span-6">
      <div>
        <h3>Feed Conversion Ratio</h3>
        <ReactApexChart
          dir="ltr"
          options={chartOptions}
          series={chartOptions.series}
          data-chart-colors={dataChartColor}
          id={chartId}
          className="grow apex-charts"
          type="line"  // Chart type is set to line
          height={350}
        />
      </div>
    </div>
  );
};

export default FCRChart;
