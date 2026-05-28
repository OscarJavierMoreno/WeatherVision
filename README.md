# 🌤️ WeatherVision

**WeatherVision** es una aplicación web interactiva y moderna diseñada para consultar el pronóstico del clima en tiempo real de cualquier ciudad del mundo. El proyecto fue desarrollado utilizando un enfoque de **Desarrollo Asistido por Inteligencia Artificial (Pair Programming)**, aplicando buenas prácticas de asincronía, optimización de flujo y auditoría de seguridad.

---

## 🚀 Características Principales

* **Búsqueda Global:** Encuentra el clima de cualquier ciudad mediante la integración de servicios de geolocalización.
* **Datos en Tiempo Real:** Muestra temperatura actual, porcentaje de humedad y velocidad del viento.
* **Interfaz Dinámica (Cyberpunk/Glassmorphism):** El fondo y los elementos visuales de la aplicación cambian automáticamente (colores y emojis) según el estado del clima (Soleado, Nublado, Lluvia, Nieve).
* **Diseño Responsivo:** Completamente optimizado para visualizarse correctamente en dispositivos móviles y pantallas de escritorio.
* **Alertas Dinámicas:** Sistema visual de estados para notificar al usuario (Cargando ⏳, Éxito ✅, Errores o ciudad no encontrada ❌).

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructuración semántica de la aplicación.
* **CSS3:** Estilos avanzados, animaciones de entrada (`fadeIn`), diseño responsivo y efectos de desenfoque (*backdrop-filter / glassmorphism*).
* **JavaScript (ES6+):** Lógica del lado del cliente, manipulación del DOM y consumo de APIs asíncronas.
* **APIs Utilizadas (Open-Meteo):**
    * *Geocoding API:* Para transformar el texto de búsqueda en coordenadas geográficas precisas (Latitud/Longitud).
    * *Weather Forecast API:* Para obtener las métricas meteorológicas exactas sin necesidad de exponer credenciales públicas.

---

## 🔒 Enfoque de Seguridad y Arquitectura

De acuerdo con las directrices de código limpio y seguridad por diseño, el proyecto destaca por:
1.  **Cero API Keys Expuestas:** Al migrar la lógica a proveedores de datos abiertos como *Open-Meteo*, se eliminó el riesgo crítico de fuga de credenciales en repositorios públicos.
2.  **Manejo Robustos de Errores:** Implementación de flujos asíncronos controlados mediante estructuras `async/await` y bloques `try/catch`, evitando el colapso de la aplicación ante caídas de red o búsquedas erróneas.
3.  **Cumplimiento Legal:** Respeto a los términos de uso y licencias libres mediante el reconocimiento implícito de derechos de autor de las fuentes de datos.

---

## 📦 Instalación y Uso Local

Para ejecutar este proyecto localmente, no necesitas configurar servidores ni instalar dependencias pesadas. Sigue estos sencillos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/OscarJavierMoreno/WeatherVision.git](https://github.com/OscarJavierMoreno/WeatherVision.git)
