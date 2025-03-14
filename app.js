let amigos = [];
let amigosDisponibles = [];

document.getElementById("amigo").addEventListener("keypress", function(event) {
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
        const esSorteado = !amigosDisponibles.includes(nombre);
        lista.innerHTML += `<li>${nombre} <button onclick="eliminarAmigo(${index})" ${esSorteado ? "disabled" : ""}>❌</button></li>`;
    });
}

function eliminarAmigo(index) {
   
    amigosDisponibles.splice(amigosDisponibles.indexOf(amigos[index]), 1);
    amigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 amigos para realizar el sorteo.");
        return;
    }

    if (amigosDisponibles.length === 0) {
        alert("Todos los amigos han sido sorteados. Reinicia para un nuevo sorteo.");
        return;
    }

    

    const indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
    const amigoSorteado = amigosDisponibles.splice(indiceAleatorio, 1)[0];

    document.getElementById("resultado").innerHTML += `<li>🎉 ${amigoSorteado} es el amigo secreto! 🎁</li>`;

    lanzarConfeti();
    actualizarLista();

    if (amigosDisponibles.length === 0) {
        document.getElementById("button-reset").style.display = "block";
    }
}

function reiniciarSorteo() {
    amigos = [];
    amigosDisponibles = [];
    
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("button-reset").style.display = "none";
}

function lanzarConfeti() {
    confetti({
        particleCount: 99,
        spread: 70,
        origin: { y: 0.6 }
    });
}