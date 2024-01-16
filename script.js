window.onload = inicio;

const tarjetaMascotaH = document.getElementById('tarjeta-mascota');
const botonAtaqueH = document.getElementById('boton-ataque');
const mascotaJugadorH = document.getElementById('mascota-jugador');
const vidaJugadorH = document.getElementById('vida-jugador');
const vidaEnemigoH = document.getElementById('vida-enemigo');
const seleccionarMascota = document.getElementById('seleccionar');
const reiniciarBtn = document.getElementById('reiniciar-btn');
const nombreMascotaH = document.getElementById('nombre-mascota');
const descripcion = document.getElementById('descripcion');
const atkStat = document.getElementById('at-stat');
const hpStat = document.getElementById('hp-stat');
const type = document.getElementById('tipo');
const ataquesH = document.getElementById('panel');
const mascotasH = document.getElementById('mascotas');
const mensajeJH = document.getElementById('mensaje-jugador');
const mensajeEH = document.getElementById('mensaje-enemigo');

let mascotas = [];
let opcionDeMascotas;
let opcionDeAtaques;

let akairuInput;
let sakanaariInput;
let kusameInput;

let fuegoBtn;
let aguaBtn;
let plantaBtn;
let especialBtn;
let normalBtn;

let mascotaEnemigo = 0;
let mascotaJugador = 0;
let ataqueJugador = 0;
let tipoAtaqueJugador= '';
let dañoAtaqueJugador = 0;
let ataqueEnemigo = 0;
let tipoAtaqueEnemigo = '';
let dañoAtaqueEnemigo = 4;
let vidaJugador = 0;
let vidaEnemigo = 18;
let vidaMaxima = 0;
let especialKusame = false;
let lanzoEspecial = false;

class Mascota{
    constructor(nombre, imagen, vida, dañoAtaque, numero){
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.dañoAtaque = dañoAtaque;
        this.numero = numero;
        this.ataques = [];
    }
}

let akairu = new Mascota('akairu', 'img/akairu.png', 9, 6, 1);
let sakanaari = new Mascota('sakanaari', 'img/sakanaari.png', 14, 4, 2);
let kusame = new Mascota('kusame', 'img/kusame.png', 20, 2, 3);

akairu.ataques.push(
    { nombre: 'Normal 👊', id: 'normal-btn' },
    { nombre: 'Especial ⭐', id: 'especial-btn' },
    { nombre: 'Fuego 🔥', id: 'fuego-btn-uno' },
    { nombre: 'Fuego 🔥', id: 'fuego-btn-dos' },
    { nombre: 'Fuego 🔥', id: 'fuego-btn-tres' }
);

sakanaari.ataques.push(
    { nombre: 'Normal 👊', id: 'normal-btn' },
    { nombre: 'Especial ⭐', id: 'especial-btn' },
    { nombre: 'Agua 💧', id: 'agua-btn-uno' },
    { nombre: 'Agua 💧', id: 'agua-btn-dos' },
    { nombre: 'Agua 💧', id: 'agua-btn-tres' }
);

kusame.ataques.push(
    { nombre: 'Normal 👊', id: 'normal-btn' },
    { nombre: 'Especial ⭐', id: 'especial-btn' },
    { nombre: 'Planta 🌱', id: 'planta-btn-uno' },
    { nombre: 'Planta 🌱', id: 'planta-btn-dos' },
    { nombre: 'Planta 🌱', id: 'planta-btn-tres' }
);

mascotas.push(akairu, sakanaari, kusame);

function inicio(){
    mascotas.forEach((mascota) => {
        opcionDeMascotas = `
        <input type="radio" name="mascota" id=${mascota.nombre}><label for=${mascota.nombre}><img src=${mascota.imagen} alt=${mascota.nombre}></label>
        `;

        tarjetaMascotaH.innerHTML += opcionDeMascotas;

        akairuInput = document.getElementById('akairu');
        sakanaariInput = document.getElementById('sakanaari');
        kusameInput = document.getElementById('kusame');
    });

    akairuInput.addEventListener('click', mostrarStatsAkairu);
    sakanaariInput.addEventListener('click', mostrarStatsSakanaari);
    kusameInput.addEventListener('click', mostrarStatsKusame);

    seleccionarMascota.addEventListener('click', mascotaSeleccionada);

    reiniciarBtn.addEventListener('click', reinicarPartida);
}

function mostrarStatsAkairu(){
    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Akairu";
    atkStat.innerHTML = "⭐⭐⭐";
    hpStat.innerHTML = "⭐";
    type.innerHTML = "FUEGO";
}

function mostrarStatsSakanaari(){
    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Sakanaari";
    atkStat.innerHTML = "⭐⭐";
    hpStat.innerHTML = "⭐⭐";
    type.innerHTML = "AGUA";
}

function mostrarStatsKusame(){
    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Kusame";
    atkStat.innerHTML = "⭐";
    hpStat.innerHTML = "⭐⭐⭐";
    type.innerHTML = "PLANTA";
}

function mascotaSeleccionada(){
    if(akairuInput.checked){
        alert("Seleccionaste al Zorro de Fuego, \"Akairu\".");
        mascotaJugadorH.innerHTML = "Akairu";
        mascotaJugador = 1;
        vidaJugador = 9;
        vidaMaxima = 9;
        vidaJugadorH.innerHTML = vidaJugador;
        extraerAtaque()
        ataquesH.classList.remove('ocultar');
        ataquesH.classList.add('mostrar');
        mascotasH.classList.add('ocultar');
    }else if(sakanaariInput.checked){
        alert("Seleccionaste al Armadillo de Agua, \"Sakanaari\".");
        mascotaJugadorH.innerHTML = "Sakanaari";
        mascotaJugador = 2;
        vidaJugador = 14;
        vidaMaxima = 14;
        vidaJugadorH.innerHTML = vidaJugador;
        extraerAtaque()
        ataquesH.classList.remove('ocultar');
        ataquesH.classList.add('mostrar');
        mascotasH.classList.add('ocultar');
    }else if(kusameInput.checked){
        alert("Seleccionaste a la Tortuga de Planta, \"Kusame\".");
        mascotaJugadorH.innerHTML = "Kusame";
        mascotaJugador = 3;
        vidaJugador = 20;
        vidaMaxima = 20;
        vidaJugadorH.innerHTML = vidaJugador;
        extraerAtaque()
        ataquesH.classList.remove('ocultar');
        ataquesH.classList.add('mostrar');
        mascotasH.classList.add('ocultar');
    }else{
        alert("No selecciono nada!");
        mascotaJugador = 0;
    }
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + 1);
}

function atacarFuego(){
    ataqueJugador = 1;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'FUEGO';

    combate();
}

function atacarAgua(){
    ataqueJugador = 2;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'AGUA';
    
    combate();
}

function atacarPlanta(){
    ataqueJugador = 3;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'PLANTA';
    
    combate();
}

function ataqueEspecial(){
    ataqueJugador = 4;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'ESPECIAL';

    switch(mascotaJugador){
        case 1:
            dañoAtaqueJugador = 6;
            vidaJugador += 2;
            break;
        case 2:
            dañoAtaqueJugador = 2;
            vidaJugador += 5;
            break;
        case 3:
            especialKusame = true;
            dañoAtaqueJugador = 0;
            break;
    }

    lanzoEspecial = true;
    especialBtn.disabled = true;
    especialBtn.classList.remove('rainbow');

    combate();
}

function extraerAtaque(){
    let ataques

    for(let i = 0; i < mascotas.length; i++){
        if(mascotaJugador === mascotas[i].numero){
            ataques = mascotas[i].ataques;
        }
    }

    ataques.forEach((ataque) => {
        opcionDeAtaques = `
        <button id=${ataque.id}>${ataque.nombre}</button>
        `;

        if(ataque.id === 'especial-btn'){
            opcionDeAtaques = `
            <button id=${ataque.id} disabled>${ataque.nombre}</button><br>
            `;
        }

        botonAtaqueH.innerHTML += opcionDeAtaques;

        switch(mascotaJugador){
            case 1:
                fuegoBtn = document.getElementById('fuego-btn-uno');
                especialBtn = document.getElementById('especial-btn');
                break;
            case 2:
                aguaBtn = document.getElementById('agua-btn-uno');
                especialBtn = document.getElementById('especial-btn');
                break;
            case 3:
                plantaBtn = document.getElementById('planta-btn-uno');
                especialBtn = document.getElementById('especial-btn');
                break;
        }
    })

    switch(mascotaJugador){
        case 1:
            fuegoBtn.addEventListener('click', atacarFuego);
            especialBtn.addEventListener('click', ataqueEspecial);
            break;
        case 2:
            aguaBtn.addEventListener('click', atacarAgua);
            especialBtn.addEventListener('click', ataqueEspecial);
            break;
        case 3:
            plantaBtn.addEventListener('click', atacarPlanta);
            especialBtn.addEventListener('click', ataqueEspecial);
            break;
    }
}

function combate(){
    let dañoRecibido = ataqueEnemigo - mascotaJugador;

    if(ataqueJugador != 4){
        calcularDaño();
    }

    vidaEnemigo -= dañoAtaqueJugador;

    if(ataqueJugador === 4){
        mensajeEspecial();
    }else{
        mensajeJH.innerHTML = "Tu ataque es de " + tipoAtaqueJugador + " con un daño de " + dañoAtaqueJugador + ". El enemigo ahora tiene " + vidaEnemigo + " de vida.";
    }

    if(vidaEnemigo <= 0){
        vidaEnemigo = 0;

        vidaJugadorH.innerHTML = vidaJugador;
        vidaEnemigoH.innerHTML = vidaEnemigo;

        switch(mascotaJugador){
            case 1:
                fuegoBtn.disabled = true;
                break;
            case 2:
                aguaBtn.disabled = true;
                break;
            case 3:
                plantaBtn.disabled = true;
                break;
        }

        mensajeJH.innerHTML = "Ganaste!";
        mensajeEH.innerHTML = "";

        return 0;
    }

    mensajeEH.innerHTML = "El enemigo esta atacando...";

    setTimeout(function(){
        if(dañoRecibido == 0){
            dañoAtaqueEnemigo = dañoAtaqueEnemigo / 2;
        }else if(dañoRecibido == -1 || dañoRecibido == 2){
            dañoAtaqueEnemigo = 0;
        }

        if(ataqueJugador === 4 && mascotaJugador === 3){
            vidaEnemigo -= dañoAtaqueEnemigo;
    
            mensajeEH.innerHTML = "El ataque del enemigo es de " + tipoAtaqueEnemigo + " con un daño de " + dañoAtaqueEnemigo + ". Tu mascota Kusame se Protegio con su Caparazon y le devolvio el ataque al enemigo... Ahora el enemigo tiene " + vidaEnemigo + " de vida.";
        }else{
            vidaJugador -= dañoAtaqueEnemigo;

            mensajeEH.innerHTML = "El ataque del enemigo es de " + tipoAtaqueEnemigo + " con un daño de " + dañoAtaqueEnemigo + ". Tu mascota " + mascotaJugadorH.innerHTML + " ahora tiene " + vidaJugador + " de vida.";
        }

        if(vidaJugador <= 0){
            vidaJugador = 0;

            vidaJugadorH.innerHTML = vidaJugador;
            vidaEnemigoH.innerHTML = vidaEnemigo;

            switch(mascotaJugador){
                case 1:
                    fuegoBtn.disabled = true;
                    break;
                case 2:
                    aguaBtn.disabled = true;
                    break;
                case 3:
                    plantaBtn.disabled = true;
                    break;
            }

            mensajeJH.innerHTML = "";
            mensajeEH.innerHTML = "Perdiste!";

            return 0;
        }

        vidaJugadorH.innerHTML = vidaJugador;
        vidaEnemigoH.innerHTML = vidaEnemigo;
        dañoAtaqueEnemigo = 4;

        if(vidaJugador <= vidaMaxima / 2 && !lanzoEspecial){
            especialBtn.disabled = false;
            especialBtn.classList.add('rainbow');
        }
    }, 1500);
}

function calcularDaño(){
    let daño = 0;
    let dañoRecibido = ataqueJugador - mascotaEnemigo;

    switch(mascotaJugador){
        case 1:
            daño = 6;
            break;
        case 2:
            daño = 4;
            break;
        case 3:
            daño = 2;
            break;
        default:
            daño = 0;
    }

    if(dañoRecibido == 0){
        daño = daño / 2;
    }else if(dañoRecibido == -1 || dañoRecibido == 2){
        daño = 0;
    }

    dañoAtaqueJugador = daño;
}

function reinicarPartida(){
    alert("La partida fue reiniciada!");

    location.reload();
}

function tipoDeAtaqueEnemigo(){
    ataqueEnemigo = random(1, 3);

    switch(ataqueEnemigo){
        case 1:
            tipoAtaqueEnemigo = 'FUEGO';
            break;
        case 2:
            tipoAtaqueEnemigo = 'AGUA';
            break;
        case 3:
            tipoAtaqueEnemigo = 'PLANTA';
            break;
        default:
            tipoAtaqueEnemigo = '';
    }
}

function mensajeEspecial(){
    switch(mascotaJugador){
        case 1:
            mensajeJH.innerHTML = "Tu ataque es " + tipoAtaqueJugador + ", tu mascota Akairu se Cura 2 de Vida e inflinge 6 de daño!";
            break;
        case 2:
            mensajeJH.innerHTML = "Tu ataque es " + tipoAtaqueJugador + ", tu mascota Sakanaari se Cura 5 de Vida e inflinge 2 de daño!";
            break;
        case 3:
            mensajeJH.innerHTML = "Tu ataque es " + tipoAtaqueJugador + ", tu mascota Kusame se Protege con su   Caparazón!";
            break;
    }
}