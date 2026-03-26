// CONFIGURACIÓN: Cambia esto por tu URL de Render cuando la tengas
const API_URL = 'http://localhost:10000'; 

async function iniciar() {
    const nombre = document.getElementById('nombre').value;
    const whatsapp = document.getElementById('whatsapp').value;

    if (!nombre || !whatsapp) {
        alert("¡Capi! Necesitamos nombre y WhatsApp para el registro maestro.");
        return;
    }

    try {
        const response = await fetch(\/auth/registro-rapido, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, whatsapp })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Registro exitoso:', data);
            alert("¡Bienvenido, David! El motor está en marcha.");
            localStorage.setItem('user', JSON.stringify(data.user));
            // Siguiente paso: Redirigir al buscador
        }
    } catch (error) {
        alert("El servidor está calentando motores. Intenta de nuevo en 5 segundos.");
    }
}
