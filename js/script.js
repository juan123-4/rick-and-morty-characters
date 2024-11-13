 let paginaActual = 1;

const contenedorPersonajes = document.getElementById('character-list');
const botonAnterior = document.getElementById('prev-page');
const botonSiguiente = document.getElementById('next-page');

async function obtenerPersonajes(pagina) {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
    const datos = await respuesta.json();
    return datos;
}

function mostrarPersonajes(datos) {
    contenedorPersonajes.innerHTML = '';
    datos.results.forEach(personaje => {
        const divPersonaje = document.createElement('div');
        divPersonaje.classList.add('personaje');
        divPersonaje.classList.add('especie');
        divPersonaje.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}">
            <p><span class="negrita">Name:</span> ${personaje.name}</p>
            <p><span class="negritatwo">Species:</span> ${personaje.species}</p>
        `;
        contenedorPersonajes.appendChild(divPersonaje);
    });
    
    botonAnterior.disabled = !datos.info.prev;
    botonSiguiente.disabled = !datos.info.next;
}

botonAnterior.addEventListener('click', async () => {
    if (paginaActual > 1) {
        paginaActual--;
        const datos = await obtenerPersonajes(paginaActual);
        mostrarPersonajes(datos);
    }
});

botonSiguiente.addEventListener('click', async () => {
    paginaActual++;
    const datos = await obtenerPersonajes(paginaActual);
    mostrarPersonajes(datos);
});


(async () => {
    const datos = await obtenerPersonajes(paginaActual);
    mostrarPersonajes(datos);
})();
