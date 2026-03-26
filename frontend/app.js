// CONFIGURACIÓN: URL de Producción vinculada
const API_URL = 'https://proyectocompras-hjwj.onrender.com';

async function iniciar() {
    const nombre = document.getElementById('nombre').value;
    const whatsapp = document.getElementById('whatsapp').value;

    if (!nombre || !whatsapp) {
        alert("¡Capi! Necesitamos nombre y WhatsApp para el registro maestro.");
        return;
    }

    try {
        console.log("Conectando a producción...");
        const response = await fetch(\/auth/registro-rapido, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, whatsapp })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Registro exitoso:', data);
            alert("¡Bienvenido, David! El motor está en marcha en la nube.");
            localStorage.setItem('user', JSON.stringify(data.user));
            // Aquí el sistema ya te reconoce como usuario oficial
        } else {
            alert("Error del servidor: " + data.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("El servidor en Render está despertando. Dale 10 segundos e intenta de nuevo.");
    }
}
