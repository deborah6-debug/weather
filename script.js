// Replace with your OpenWeatherMap API key
const apiKey = "6b03894a51a97ccde5cf8ab18a2f0f40";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (city === "") {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    resultDiv.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Condition:</strong> ${desc}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>${error.message}</p>`;
  }
}
