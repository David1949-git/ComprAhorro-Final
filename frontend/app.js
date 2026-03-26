let productoSeleccionado = {};

async function buscarConIA() {
    const consulta = document.getElementById('ai-search').value;
    if (!consulta) return alert("Capi, dinos qué buscas.");

    // Simulación de sourcing de 4 opciones
    const opciones = [
        { id: 1, negocio: "Super X", precio: 85.00, img: "https://via.placeholder.com/150", link: "https://example.com/item1" },
        { id: 2, negocio: "Auto Ventas", precio: 82.50, img: "https://via.placeholder.com/150", link: "https://example.com/item2" },
        { id: 3, negocio: "Ahorro Store", precio: 79.99, img: "https://via.placeholder.com/150", link: "https://example.com/item3" },
        { id: 4, negocio: "Ganga Online", precio: 88.00, img: "https://via.placeholder.com/150", link: "https://example.com/item4" }
    ];

    const grid = document.getElementById('resultados-grid');
    grid.innerHTML = opciones.map(opt => 
        <div onclick="abrirNegocio('\', '\', \)" class="cursor-pointer bg-white border rounded-3xl p-3 shadow-sm hover:scale-95 transition-all text-left">
            <img src="\" class="w-full h-24 object-cover rounded-2xl mb-2">
            <p class="text-[9px] font-bold text-blue-600 uppercase">\</p>
            <p class="font-bold text-gray-900 leading-none">$\</p>
            <p class="text-[8px] text-gray-400 mt-1 uppercase tracking-tighter">Clic para negociar</p>
        </div>
    ).join('');
}

function abrirNegocio(url, nombre, precio) {
    productoSeleccionado = { nombre, precio };
    document.getElementById('visor-titulo').innerText = "Negociando en: " + nombre;
    document.getElementById('iframe-negocio').src = url;
    document.getElementById('business-visor').classList.remove('hidden');
}

function cerrarNegocio() {
    document.getElementById('business-visor').classList.add('hidden');
    document.getElementById('iframe-negocio').src = "";
}

function finalizarNegociacion() {
    // Simulamos que el usuario negoció y acordó el precio base + accesorios
    const precioBase = productoSeleccionado.precio;
    const extras = 15.00; // Ejemplo de delivery o accesorios acordados
    const subtotal = precioBase + extras;
    const itbms = subtotal * 0.07; // 7% Panamá
    const bonoGestion = 5.00; // Lo que el vendedor no ve
    const total = subtotal + itbms + bonoGestion;

    const facturaHtml = 
        <div class="flex justify-between text-sm"><span>Precio Negociado</span><span>$\</span></div>
        <div class="flex justify-between text-sm"><span>Accesorios/Delivery</span><span>$\</span></div>
        <div class="flex justify-between text-sm"><span>ITBMS (7%)</span><span>$\</span></div>
        <div class="flex justify-between font-bold text-blue-600 border-t pt-2">
            <span>Bono de Gestión de Ahorro</span><span>$\</span>
        </div>
        <div class="flex justify-between text-xl font-black border-t-2 border-black pt-2 mt-2">
            <span>TOTAL A PAGAR</span><span>$\</span>
        </div>
    ;

    document.getElementById('factura-detalle').innerHTML = facturaHtml;
    document.getElementById('invoice-modal').classList.remove('hidden');
}

function irAPagar() {
    const bono = 5.00; // Este es el monto capturado de la factura
    const cuentaPredeterminada = "00-000000-0"; // Tu cuenta de David
    
    console.log("Iniciando procesamiento de fondo...");

    // 1. Procesamos el depósito del Bono de Gestión en el Background
    procesarDepositoBono({
        monto: bono,
        destino: cuentaPredeterminada,
        referencia: "GESTION-" + Math.floor(Math.random() * 1000000)
    });

    // 2. Mostramos al usuario su comprobante final y link de pago al negocio
    document.getElementById('invoice-modal').innerHTML = 
        <div class="text-center p-6">
            <div class="text-6xl mb-4">💳</div>
            <h2 class="text-2xl font-black mb-4">¡Todo Listo!</h2>
            <p class="text-sm text-gray-600 mb-6">El pago al negocio se ha procesado. Hemos gestionado tu bono de ahorro automáticamente.</p>
            
            <div class="bg-blue-50 p-4 rounded-2xl mb-6 text-left">
                <p class="text-[10px] font-bold text-blue-600 uppercase">Confirmación de Operación</p>
                <p class="text-xs text-gray-700 mt-1">Tu ahorro ha sido asegurado. Ya puedes retirar tu producto o esperar el delivery pactado.</p>
            </div>

            <button onclick="location.reload()" class="w-full py-4 bg-black text-white rounded-2xl font-bold">
                Volver al Inicio
            </button>
        </div>
    ;
}

async function procesarDepositoBono(datos) {
    try {
        // Aquí es donde la App conecta con el Backend para registrar el dinero
        const response = await fetch(\/pagos/registrar-bono, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        console.log("Bono procesado en background hacia cuenta: " + datos.destino);
    } catch (error) {
        console.error("Error en el proceso de fondo:", error);
    }
}
