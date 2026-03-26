const API_URL = 'https://proyectocompras-hjwj.onrender.com';

async function buscarConIA() {
    const consulta = document.getElementById('ai-search').value;
    if (!consulta) return alert("Capi, dime qué estás buscando para poder ahorrarte dinero.");

    console.log("IA buscando:", consulta);
    
    // Simulamos la respuesta del Scraper Inteligente 
    const resultadoSimulado = {
        producto: consulta,
        precioOriginal: 100.00,
        precioAhorro: 85.00,
        ahorroTotal: 15.00,
        comision: 1.50 // 10% del ahorro
    };

    mostrarResultado(resultadoSimulado);
}

function mostrarResultado(res) {
    const container = document.querySelector('.w-full.max-w-lg');
    container.innerHTML = 
        <div class="animate-fade-in text-left">
            <div class="text-5xl mb-4 text-center">✅</div>
            <h2 class="text-2xl font-bold mb-4 text-center">¡Ahorro Encontrado!</h2>
            <div class="bg-green-50 p-6 rounded-3xl mb-6">
                <p class="text-sm text-green-600 font-bold uppercase">Resultado para: "\"</p>
                <p class="text-3xl font-black text-gray-900 mt-2">$\</p>
                <p class="text-sm text-gray-500">Precio normal: <span class="line-through">$\</span></p>
                <p class="mt-2 font-bold text-green-700">🎉 Te ahorras: $\</p>
            </div>

            <div class="bg-gray-100 p-6 rounded-3xl mb-6">
                <p class="font-bold text-gray-800 mb-2">💰 Instrucciones de Compra:</p>
                <p class="text-sm text-gray-600 mb-4">Para ejecutar esta compra y asegurar el precio, deposita la comisión del servicio:</p>
                <div class="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-300">
                    <p class="text-xs font-bold text-gray-400">CUENTA BANCARIA (PANAMÁ/GLOBAL)</p>
                    <p class="font-mono font-bold text-lg">BANCO GENERAL</p>
                    <p class="font-mono">Cuenta: 00-000000-0</p>
                    <p class="font-mono text-blue-600 font-bold mt-2">Monto a depositar: $\</p>
                </div>
            </div>

            <button onclick="enviarComprobante('\')" 
                class="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-600 transition">
                Enviar Comprobante por WhatsApp
            </button>
            
            <button onclick="location.reload()" class="w-full mt-4 text-gray-400 text-sm font-bold">Nueva Búsqueda</button>
        </div>
    ;
}

function enviarComprobante(prod) {
    const mensaje = encodeURIComponent("¡Hola David! Ya realicé el depósito de la comisión para la compra de: " + prod);
    window.open("https://wa.me/50700000000?text=" + mensaje); // Aquí va tu número real
}
