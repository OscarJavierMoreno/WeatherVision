
const cityInput = document.getElementById("cityInput");
const messageBox = document.getElementById("messageBox");

//Escuchar la tecla Enter
cityInput.addEventListener("keydown", (event) =>
{
    if (event.key === "Enter")
    {
        getWeather();
    }
});

//Función principal asíncrona
async function getWeather()
{
    const city = cityInput.value.trim();

    if (!city)
    {
        showMessage("⚠️ Ingresa una ciudad", "error");
        return;
    }

    showMessage("⏳ Consultando clima...", "loading");

    try
    {
        //1. Llamado a la API de Geocoding de Open-Meteo para obtener Latitud y Longitud
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0)
        {
            showMessage("🌍 Ciudad no encontrada", "error");
            return;
        }

        //Extraer coordenadas y nombre real de la ciudad encontrada
        const { latitude, longitude, name, country } = geoData.results[0];

        //2. Llamado a la API de Clima con las coordenadas obtenidas
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        if (!weatherData.current)
        {
            showMessage("❌ Error al obtener datos climáticos", "error");
            return;
        }

        //Mapear los datos al formato que espera tu interfaz
        const cleanData =
        {
            name: `${name}, ${country}`,
            temp: weatherData.current.temperature_2m,
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: weatherData.current.wind_speed_10m,
            code: weatherData.current.weather_code
        };

        updateUI(cleanData);
        showMessage(`✅ Clima cargado para ${cleanData.name}`, "success");

    }
    
    catch (error)
    {
        console.error(error);
        showMessage("❌ Error de red o servidor caído", "error");
    }
}

//Actualizar los elementos de la pantalla
function updateUI(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.temp)}°C`;
    document.getElementById("humidity").textContent = `${data.humidity}%`;
    document.getElementById("wind").textContent = `${data.windSpeed} km/h`;

    //Determinar el tipo de clima según los códigos estándar de Open-Meteo (WMO)
    let climate = "sunny";
    let descriptionText = "Soleado";

    if (data.code >= 1 && data.code <= 3)
    {
        climate = "cloudy";
        descriptionText = "Parcialmente Nublado";
    }
    
    else if (data.code >= 45 && data.code <= 48)
    {
        climate = "cloudy";
        descriptionText = "Neblina";
    }
    
    else if ((data.code >= 51 && data.code <= 67) || (data.code >= 80 && data.code <= 82))
    {
        climate = "rainy";
        descriptionText = "Lluvia";
    }
    
    else if ((data.code >= 71 && data.code <= 77) || (data.code >= 85 && data.code <= 86))
    {
        climate = "snowy";
        descriptionText = "Nieve";
    }
    
    else if (data.code >= 95)
    {
        climate = "rainy";
        descriptionText = "Tormenta Eléctrica";
    }

    document.getElementById("description").textContent = descriptionText;
    updateBackground(climate);
    updateIcon(climate);
}

//Control de alertas visuales
function showMessage(message, type)
{
    messageBox.textContent = message;
    messageBox.className = "";
    messageBox.classList.add(type);

    if (type === "success")
    {
        setTimeout(() =>
        {
            messageBox.style.display = "none";
        }, 3000);
    }
}

//Cambiar fondos dinámicos (Clases CSS)
function updateBackground(climate)
{
    document.body.className = "";
    document.body.classList.add(climate);
}

//Cambiar emojis dinámicos
function updateIcon(climate)
{
    const icon = document.getElementById("weatherIcon");

    if (climate === "cloudy")
    {
        icon.textContent = "☁️";
    }
    
    else if (climate === "rainy")
    {
        icon.textContent = "🌧️";
    }
    
    else if (climate === "snowy")
    {
        icon.textContent = "❄️";
    }
    
    else
    {
        icon.textContent = "☀️";
    }
}

//Carga inicial por defecto
window.addEventListener("load", () =>
{
    cityInput.value = "Bogotá";
    getWeather();
});