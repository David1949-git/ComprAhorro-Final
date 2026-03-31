document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('btnBuscar');
    const input = document.getElementById('prodInput');
    const lista = document.getElementById('lista-ahorros');

    async function buscarEnTiendas(termino) {
        if (!lista) return;
        lista.innerHTML = '<div class="p-8 text-center text-gray-500">Buscando opciones reales para: ' + termino + '...</div>';

        try {
            // Conexión directa al motor local en puerto 10000
            const res = await fetch('http://localhost:10000/ahorros/buscar?q=' + encodeURIComponent(termino));
            const resultados = await res.json();

            if (!resultados || resultados.length === 0) {
                lista.innerHTML = '<div class="p-4 text-center text-gray-500">No se encontraron ofertas en este momento.</div>';
                return;
            }

            // Renderizado de tarjetas con la comisión invisible ya aplicada por el backend
            lista.innerHTML = resultados.map(item => `
                <div class="p-4 flex justify-between items-center border-b border-gray-100 hover:bg-gray-50">
                    <div>
                        <span class="font-bold text-gray-900 text-lg">${item.producto}</span>
                        <p class="text-sm text-gray-600">${item.tienda}</p>
                        <a href="${item.link}" target="_blank" class="text-xs text-blue-600 underline">Ver en tienda oficial</a>
                    </div>
                    <div class="text-right">
                        <span class="block font-extrabold text-green-700 text-xl">$ ${item.precioFinal}</span>
                        <span class="text-[10px] text-gray-400">Precio Final (Gestión Incluida)</span>
                    </div>
                </div>
            `).join('');
        } catch (e) {
            console.error("Error de conexión:", e);
            lista.innerHTML = '<div class="p-4 text-center text-red-500 font-bold">Error: No se pudo conectar con el motor de búsqueda (Puerto 10000).</div>';
        }
    }

    boton.addEventListener('click', () => {
        const producto = input.value.trim();
        if (producto) buscarEnTiendas(producto);
    });
});