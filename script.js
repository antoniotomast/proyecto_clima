const apiKey = "60f3a93a7d3fdbeaab3cdf6b45ed2770";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weatherResult.innerHTML = `<p>Por favor ingresa una ciudad.</p>`;
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
    )}&appid=${apiKey}&lang=es&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Ciudad no encontrada");
        }
        const data = await res.json();

        const { name, sys, main, weather } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        weatherResult.innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <img src="${icon}" alt="${weather[0].description}">
      <p><strong>Condición:</strong> ${weather[0].description}</p>
      <p><strong>Temperatura:</strong> ${main.temp} °C</p>
      <p><strong>Humedad:</strong> ${main.humidity}%</p>
    `;
    } catch (error) {
        weatherResult.innerHTML = `<p>❌ ${error.message}</p>`;
    }
}
