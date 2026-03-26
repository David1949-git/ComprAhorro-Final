const API_URL = 'https://proyectocompras-hjwj.onrender.com';
let productoSeleccionado = {};

// 1. Detección de Referido al entrar
const urlParams = new URLSearchParams(window.location.search);
const referidoPor = urlParams.get('ref');
if (referidoPor) {
    localStorage.setItem('referidor', referidoPor);
}

// 2. FUNCIÓN DE BÚSQUEDA (El cerebro que conecta con la "batidora")
async function buscarConIA() {
    const consulta = document.getElementById('ai-search').value;
    if (!consulta) return alert("Capi, dinos qué buscas (ej: batidora).");

    // Simulamos sourcing de 4 opciones visuales
    const opciones = [
        { id: 1, negocio: "Ganga Online", precio: 35.00, img: "https://via.placeholder.com/150", link: "https://example.com" },
        { id: 2, negocio: "Ahorro Store", precio: 32.50, img: "https://via.placeholder.com/150", link: "https://example.com" },
        { id: 3, negocio: "Super X", precio: 38.99, img: "https://via.placeholder.com/150", link: "https://example.com" },
        { id: 4, negocio: "Auto Ventas", precio: 29.99, img: "https://via.placeholder.com/150", link: "https://example.com" }
    ];

    const grid = document.getElementById('resultados-grid');
    grid.innerHTML = opciones.map(opt => 
        <div onclick="abrirNegocio('\', '\', \)" class="cursor-pointer bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:scale-95 transition-all text-left">
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
    const precioBase = productoSeleccionado.precio;
    const extras = 5.00; // Delivery o accesorios simulados
    const subtotal = precioBase + extras;
    const itbms = subtotal * 0.07; 
    const bonoGestion = 5.00; // Tu Bono de Gestión invisible
    const total = subtotal + itbms + bonoGestion;

    const modal = document.getElementById('invoice-modal');
    modal.innerHTML = 
        <div class="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
            <h2 class="text-2xl font-black mb-6 text-center">Resumen de tu Ahorro</h2>
            <div class="space-y-3 border-t border-b py-4 font-medium text-gray-700">
                <div class="flex justify-between text-sm"><span>Precio Negociado</span><span>$\</span></div>
                <div class="flex justify-between text-sm"><span>Accesorios/Delivery</span><span>$\</span></div>
                <div class="flex justify-between text-sm"><span>ITBMS (7%)</span><span>$\</span></div>
                <div class="flex justify-between font-bold text-blue-600 border-t pt-2"><span>Bono de Gestión de Ahorro</span><span>$\</span></div>
                <div class="flex justify-between text-xl font-black border-t-2 border-black pt-2 mt-2"><span>TOTAL A PAGAR</span><span>$\</span></div>
            </div>
            <button onclick="irAPreferidos()" class="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg mt-6">Confirmar y Pagar</button>
        </div>
    ;
    modal.classList.remove('hidden');
}

function irAPreferidos() {
    const bono = 5.00;
    const referidor = localStorage.getItem('referidor') || "NINGUNO";
    
    procesarDepositoBono({ monto: bono, referidor, referencia: "GESTION-" + Math.floor(Math.random() * 1000000) });

    const modal = document.getElementById('invoice-modal');
    modal.innerHTML = 
        <div class="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl text-center">
            <div class="text-5xl mb-4">🎁</div>
            <h2 class="text-2xl font-black mb-2">¡Misión Cumplida!</h2>
            <p class="text-gray-500 text-sm mb-6">Tu ahorro ha sido procesado. Refiere a 3 amigos para recibir tu Bono de **\.00** por cada uno.</p>
            <div class="space-y-3 mb-6">
                <input type="tel" placeholder="WhatsApp Amigo 1" class="w-full p-4 bg-gray-100 rounded-2xl border-none outline-none font-bold">
                <input type="tel" placeholder="WhatsApp Amigo 2" class="w-full p-4 bg-gray-100 rounded-2xl border-none outline-none font-bold">
                <input type="tel" placeholder="WhatsApp Amigo 3" class="w-full p-4 bg-gray-100 rounded-2xl border-none outline-none font-bold">
            </div>
            <button onclick="location.reload()" class="w-full py-4 bg-black text-white rounded-2xl font-bold">Enviar y Cerrar</button>
        </div>
    ;
}

async function procesarDepositoBono(datos) {
    try {
        await fetch(\/pagos/registrar-bono, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        console.log("Bono enviado en background");
    } catch (error) {
        console.error("Error en el background:", error);
    }
}
