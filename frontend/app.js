const API_URL = 'https://proyectocompras-hjwj.onrender.com';
let productoSeleccionado = {};

async function buscarConIA() {
    const consulta = document.getElementById('ai-search').value;
    if (!consulta) return alert("Capi, dinos qué buscas.");

    // Simulación de sourcing de 4 opciones visuales
    const opciones = [
        { id: 1, negocio: "Super X", precio: 85.00, img: "https://via.placeholder.com/150", link: "https://example.com" },
        { id: 2, negocio: "Auto Ventas", precio: 82.50, img: "https://via.placeholder.com/150", link: "https://example.com" },
        { id: 3, negocio: "Ganga Online", precio: 79.99, img: "https://via.placeholder.com/150", link: "https://example.com" },
        { id: 4, negocio: "Ahorro Store", precio: 88.00, img: "https://via.placeholder.com/150", link: "https://example.com" }
    ];

    document.getElementById('resultados-grid').innerHTML = opciones.map(opt => 
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
    const precioBase = productoSeleccionado.precio;
    const extras = 10.00; // Simulación de accesorios/delivery
    const subtotal = precioBase + extras;
    const itbms = subtotal * 0.07; // 7% ITBMS Panamá
    const bonoGestion = 5.00; // Tu comisión invisible para el vendedor
    const total = subtotal + itbms + bonoGestion;

    document.getElementById('factura-detalle').innerHTML = 
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
    document.getElementById('invoice-modal').classList.remove('hidden');
}

function irAPreferidos() {
    document.getElementById('invoice-modal').classList.add('hidden');
    document.getElementById('referral-modal').classList.remove('hidden');
}

function enviarInvitaciones() {
    // Aquí es donde se acreditaría el bono al usuario si sus amigos aceptan
    alert("¡Invitaciones enviadas! Tu cuenta ha sido registrada para recibir bonos por tus amigos.");
    location.reload();
}
