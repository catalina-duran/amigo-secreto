let amigos = [];
let amigosDisponibles = [];
let amigosSorteados = []; // Lista de amigos que ya han sido sorteados
let ultimoSorteado = null;

document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Por favor, ingresa un nombre.");
        return;
    }

    if (amigos.includes(texto)) {
        alert("Este nombre ya fue agregado.");
        return;
    }

    amigos.push(texto);
    amigosDisponibles.push(texto);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((nombre, index) => {
        lista.innerHTML += `
            <li>
                ${nombre}
                <button class="button-remove" onclick="eliminarAmigo(${index})">x</button>
            </li>`;
    });
}

function eliminarAmigo(index) {

    amigos.splice(index, 1);
    amigosDisponibles.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigosDisponibles.length === 0) {
        alert("Todos los amigos han sido sorteados. Reinicia para un nuevo sorteo.");
        return;
    }

    let indiceAleatorio;
    let amigoSorteado;


    do {
        indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
        amigoSorteado = amigosDisponibles[indiceAleatorio];
    } while (amigoSorteado === amigos[amigos.length - amigosDisponibles.length]);


    amigosDisponibles.splice(indiceAleatorio, 1);
    amigosSorteados.push(amigoSorteado);


    const nombreAmigo = amigos[amigos.length - amigosDisponibles.length - 1];


    const resultado = document.getElementById("resultado");
    const resultadoItem = document.createElement("li");
    resultadoItem.classList.add("result-item");
    resultadoItem.innerHTML = `
        <span class="result-text">${nombreAmigo} ha sido sorteado a ${amigoSorteado} como su amigo secreto! 🎉🎁</span>
        <span class="toggle-text ver">Ver</span>
    `;
    resultado.appendChild(resultadoItem);


    const toggleText = resultadoItem.querySelector(".toggle-text");
    const resultText = resultadoItem.querySelector(".result-text");


    resultText.style.display = "none";

    toggleText.addEventListener("click", function () {
        if (resultText.style.display === "none") {
            resultText.style.display = "block";
            toggleText.textContent = "Ocultar";
            toggleText.classList.remove("ver");
            toggleText.classList.add("ocultar");
        } else {
            resultText.style.display = "none";
            toggleText.textContent = "Ver";
            toggleText.classList.remove("ocultar");
            toggleText.classList.add("ver");
        }
    });


    if (amigosDisponibles.length == 0) {
        document.getElementById("button-reset").style.display = "block";
    }
}

function cambiarAmigo() {
    if (amigosDisponibles.length === 0) {
        alert("No hay más amigos disponibles para cambiar.");
        return;
    }




    amigosDisponibles.push(amigosSorteados.pop());


    const resultado = document.getElementById("resultado");
    const items = resultado.getElementsByTagName("li");
    if (items.length > 0) {
        resultado.removeChild(items[items.length - 1]);
    }


    sortearAmigo();




}

function reiniciarSorteo() {
    amigos = [];
    amigosDisponibles = [];
    amigosSorteados = [];
    ultimoSorteado = null;

    document.getElementById("resultado").innerHTML = "";
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("button-reset").style.display = "none";
    document.querySelector(".button-change").style.display = "none";
}

