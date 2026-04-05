document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('btnBuscar');
    const input = document.getElementById('prodInput');
    const lista = document.getElementById('lista-ahorros');
    const API_LOCAL  = 'http://localhost:10000/ahorros/buscar';
    const API_RENDER = 'https://comprahorro-backend.onrender.com/ahorros/buscar';

    // Tiendas internacionales
    const TIENDAS_INTERNACIONALES = [
        { nombre: 'Amazon',      emoji: '📦', url: 'https://www.amazon.com/s?k=' },
        { nombre: 'eBay',        emoji: '🛒', url: 'https://www.ebay.com/sch/i.html?_nkw=' },
        { nombre: 'Temu',        emoji: '🛍️', url: 'https://www.temu.com/search_result.html?search_key=' },
        { nombre: 'Walmart',     emoji: '🏪', url: 'https://www.walmart.com/search?q=' },
        { nombre: 'AliExpress',  emoji: '🌏', url: 'https://www.aliexpress.com/wholesale?SearchText=' },
        { nombre: 'Encuentra24', emoji: '🇵🇦', url: 'https://www.encuentra24.com/panama-es/buscar?q=' },
    ];

    function mostrarSpinner(termino) {
        lista.innerHTML = '<div class="p-8 text-center text-gray-500"><div class="inline-block w-6 h-6 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-3"></div><p class="text-sm">Buscando: <b>' + termino + '</b>...</p></div>';
    }

    function mostrarError(msg) {
        lista.innerHTML = '<div class="p-6 text-center"><p class="text-red-500 font-bold text-sm mb-1">No se pudo completar la busqueda</p><p class="text-gray-400 text-xs">' + msg + '</p></div>';
    }

    function mostrarBotonesInternacionales(termino) {
        let html = '<div class="p-3 border-t border-gray-100 mt-2">';
        html += '<p class="text-xs text-center text-gray-400 mb-3">🌎 ¿No encontraste lo que buscas? Busca también en:</p>';
        html += '<div class="grid grid-cols-2 gap-2">';
        TIENDAS_INTERNACIONALES.forEach(tienda => {
            const urlCompleta = tienda.url + encodeURIComponent(termino);
            html += '<a href="' + urlCompleta + '" target="_blank" class="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200">';
            html += '<span class="text-lg">' + tienda.emoji + '</span>';
            html += '<span class="text-xs font-semibold text-gray-700">' + tienda.nombre + '</span>';
            html += '</a>';
        });
        html += '</div></div>';
        return html;
    }

    function mostrarResultados(resultados, termino) {
        if (!resultados || resultados.length === 0) {
            lista.innerHTML = '<div class="p-6 text-center text-gray-400 text-sm">No se encontraron ofertas.</div>' + mostrarBotonesInternacionales(termino);
            return;
        }
        let html = '<div class="grid grid-cols-2 gap-3 p-3">';
        resultados.forEach(item => {
            const img = item.imagen ? '<img src="' + item.imagen + '" class="w-full h-full object-contain p-2">' : '<span class="text-4xl">&#128722;</span>';
            html += '<a href="' + item.link + '" target="_blank" class="flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">';
            html += '<div class="w-full h-36 bg-gray-50 flex items-center justify-center overflow-hidden">' + img + '</div>';
            html += '<div class="p-2 flex flex-col flex-grow">';
            html += '<p class="text-xs font-semibold text-gray-800 leading-tight mb-1" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + item.producto + '</p>';
            html += '<p class="text-xs text-gray-400 truncate mb-2">' + item.tienda + '</p>';
            html += '<p class="text-base font-extrabold text-green-700">' + item.precioFinal + '</p>';
            html += '<p class="text-[9px] text-gray-400">Precio Final</p></div></a>';
        });
        html += '</div>';
        html += mostrarBotonesInternacionales(termino);
        lista.innerHTML = html;
    }

    async function buscarEnTiendas(termino) {
        if (!lista) return;
        mostrarSpinner(termino);
        try {
            const res = await fetch(API_LOCAL + '?q=' + encodeURIComponent(termino), { signal: AbortSignal.timeout(5000) });
            if (res.ok) { mostrarResultados(await res.json(), termino); return; }
        } catch (e) { console.warn('Local no disponible', e.message); }
        try {
            const res = await fetch(API_RENDER + '?q=' + encodeURIComponent(termino), { signal: AbortSignal.timeout(15000) });
            if (res.ok) { mostrarResultados(await res.json(), termino); return; }
            mostrarError('El servidor respondio con error.');
        } catch (e) { mostrarError('No hay conexion con el servidor local ni con la nube.'); }
    }

    boton.addEventListener('click', () => {
        const producto = input.value.trim();
        if (!producto) {
            input.classList.add('ring-2', 'ring-red-400');
            input.placeholder = 'Escribe un producto primero!';
            setTimeout(() => { input.classList.remove('ring-2','ring-red-400'); input.placeholder = 'Que quieres BUSCAR hoy?'; }, 2000);
            return;
        }
        buscarEnTiendas(producto);
    });

    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') boton.click(); });
});