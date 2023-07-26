document.addEventListener('DOMContentLoaded', () => {
    const pixelGrid = document.getElementById('pixel-grid');
    const colorPalette = document.querySelectorAll('.color');
    const cooldownTimer = document.getElementById('cooldown-timer');
    let selectedColor = '#ff0000'; // Establece el color inicial
    let isDrawing = false; // Variable para verificar si se está dibujando
    let cooldownActive = false; // Variable para verificar si el cooldown está activo
    let cooldownTime = 10; // Tiempo de cooldown en segundos

    // Crea la cuadrícula de píxeles
    for (let i = 0; i < 400; i++) { // Crea 20x20 cuadrícula (ajusta el número según el tamaño que desees)
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixelGrid.appendChild(pixel);
    }

    // Función para cambiar el color del píxel
    function changePixelColor(pixel) {
        if (isDrawing && !cooldownActive) {
            pixel.style.backgroundColor = selectedColor;
            startCooldown();
        }
    }

    // Función para iniciar el cooldown
    function startCooldown() {
        cooldownActive = true;
        updateCooldownTimer();
        const cooldownInterval = setInterval(() => {
            cooldownTime -= 1;
            updateCooldownTimer();
            if (cooldownTime <= 0) {
                clearInterval(cooldownInterval);
                cooldownTime = 10;
                cooldownActive = false;
                updateCooldownTimer();
            }
        }, 1000); // Actualizar cada 1 segundo
    }

    // Función para actualizar el contador del cooldown
    function updateCooldownTimer() {
        cooldownTimer.textContent = `Cooldown: ${cooldownTime} segundos`;
    }

    // Agrega eventos de clic para cambiar el color del píxel
    pixelGrid.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('pixel')) {
            isDrawing = true;
            changePixelColor(event.target);
        }
    });

    pixelGrid.addEventListener('mousemove', (event) => {
        changePixelColor(event.target);
    });

    // Detiene el dibujo cuando se suelta el clic izquierdo
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    // Agrega eventos de clic para seleccionar un color de la paleta
    colorPalette.forEach(color => {
        color.addEventListener('click', () => {
            selectedColor = color.style.backgroundColor;
        });
    });
});
