document.addEventListener('DOMContentLoaded', () => {
    // Fetch water_level from server
    fetch('/api/water_level')
        .then(response => response.json())
        .then(data => {
            // Process sensor data and render chart
            renderSensorDataChart(data);
        })
        .catch(error => {
            console.error('Error fetching sensor data:', error);
        });

    // Add event listener for open servo button
    document.getElementById('open-servo-btn').addEventListener('click', () => {
        // Send request to server to open servo
        fetch('/api/open-servo', { method: 'PUT' })
            .then(response => {
                if (response.ok) {
                    console.log('Servo opened successfully');
                } else {
                    console.error('Failed to open servo');
                }
            })
            .catch(error => {
                console.error('Error opening servo:', error);
            });
    });
});

function renderSensorDataChart(data) {
    // Extract timestamps and values from sensor data
    const timestamps = data.map(entry => entry.timestamp);
    const values = data.map(entry => entry.value);

    // Render chart using ApexCharts
    const chart = new ApexCharts(document.getElementById('water_level-chart'), {
        chart: {
            type: 'line',
            height: 400,
            animations: {
                enabled: false
            }
        },
        series: [{
            name: 'Sensor Value',
            data: values
        }],
        xaxis: {
            categories: timestamps,
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: 'Sensor Value'
            }
        }
    });

    chart.render();
}