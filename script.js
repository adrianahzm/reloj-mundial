document.addEventListener('DOMContentLoaded', function () {
    const darkModeButton = document.getElementById('dark-mode-toggle');
    darkModeButton.addEventListener('click', toggleDarkMode);

    // Función para cambiar el modo oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Función para obtener la hora de una zona horaria y mostrarla
    function updateTime() {
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Obtener la hora de cada ciudad
        updateCityTime('mexico', 'America/Mexico_City', localTimezone);
        updateCityTime('buenosaires', 'America/Argentina/Buenos_Aires', localTimezone);
        updateCityTime('madrid', 'Europe/Madrid', localTimezone);
        updateCityTime('tokyo', 'Asia/Tokyo', localTimezone);
    }

    // Función que actualiza la hora y diferencia para cada ciudad
    function updateCityTime(city, defaultTimezone, localTimezone) {
        const timezoneSelect = document.getElementById(`${city}-timezone`);
        const cityTimezone = timezoneSelect.value || defaultTimezone;

        // Obtener hora y fecha de la ciudad
        const cityTime = new Date().toLocaleString("en-US", { timeZone: cityTimezone });
        const cityDate = new Date(cityTime);

        // Mostrar la hora digital
        document.getElementById(`${city}-time`).textContent = cityDate.toLocaleTimeString();

        // Actualizar las manecillas del reloj analógico
        updateAnalogClock(cityDate, city);

        // Calcular y mostrar la diferencia horaria
        const localTime = new Date().toLocaleString("en-US", { timeZone: localTimezone });
        const localDate = new Date(localTime);
        const timeDifference = Math.floor((cityDate - localDate) / 1000 / 60 / 60);

        const sign = timeDifference > 0 ? "+" : "";
        document.getElementById(`${city}-difference`).textContent = `Diferencia horaria: ${sign}${timeDifference} horas`;
    }

    // Función que actualiza el reloj analógico de una ciudad
    function updateAnalogClock(cityDate, city) {
        const hour = cityDate.getHours();
        const minute = cityDate.getMinutes();
        const second = cityDate.getSeconds();

        const hourDeg = (hour % 12) * 30 + minute / 2; // 30 grados por hora + media hora por minuto
        const minuteDeg = minute * 6; // 6 grados por minuto
        const secondDeg = second * 6; // 6 grados por segundo

        // Actualizar el reloj analógico
        const hourHand = document.querySelector(`#${city}-clock .hand.hour`);
        const minuteHand = document.querySelector(`#${city}-clock .hand.minute`);
        const secondHand = document.querySelector(`#${city}-clock .hand.second`);

        // Aplicar rotación en grados a las manecillas
        hourHand.style.transform = `rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        secondHand.style.transform = `rotate(${secondDeg}deg)`;
    }

    // Actualizar la hora cada segundo
    setInterval(updateTime, 1000);
    updateTime();
});
