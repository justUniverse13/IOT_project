fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=0aac5df5293e8e1956a69cfeb03457c4')
    .then(response => response.json())
    .then(data => {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        // Display weather information on page
        document.getElementById('weather-description').innerText = `Description: ${weatherDescription}`;
        document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
        document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });