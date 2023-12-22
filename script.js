window.onload = inicio;

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

let mascotaJugadorH = document.getElementById('mascota-jugador');
let vidaJugadorH = document.getElementById('vida-jugador');
let vidaEnemigoH = document.getElementById('vida-enemigo');

function inicio(){
    let akairuInput = document.getElementById('akairu');
    akairuInput.addEventListener('click', mostrarStatsAkairu);
    let sakanaariInput = document.getElementById('sakanaari');
    sakanaariInput.addEventListener('click', mostrarStatsSakanaari);
    let kusameInput = document.getElementById('kusame');
    kusameInput.addEventListener('click', mostrarStatsKusame);

    let seleccionarMascota = document.getElementById('seleccionar');
    seleccionarMascota.addEventListener('click', mascotaSeleccionada);
    
    let fuegoBtn = document.getElementById('fuego-btn');
    let aguaBtn = document.getElementById('agua-btn');
    let plantaBtn = document.getElementById('planta-btn');

    let reiniciarBtn = document.getElementById('reiniciar-btn');

    fuegoBtn.addEventListener('click', atacarFuego);
    aguaBtn.addEventListener('click', atacarAgua);
    plantaBtn.addEventListener('click', atacarPlanta);

    reiniciarBtn.addEventListener('click', reinicarPartida);
}

function mostrarStatsAkairu(){
    let nombreMascotaH = document.getElementById('nombre-mascota');
    let atkStat = document.getElementById('at-stat');
    let hpStat = document.getElementById('hp-stat');
    let type = document.getElementById('tipo');
    
    let descripcion = document.getElementById('descripcion');
    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Akairu";
    atkStat.innerHTML = "⭐⭐⭐";
    hpStat.innerHTML = "⭐";
    type.innerHTML = "FUEGO";
}

function mostrarStatsSakanaari(){
    let nombreMascotaH = document.getElementById('nombre-mascota');
    let atkStat = document.getElementById('at-stat');
    let hpStat = document.getElementById('hp-stat');
    let type = document.getElementById('tipo');

    let descripcion = document.getElementById('descripcion');
    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Sakanaari";
    atkStat.innerHTML = "⭐⭐";
    hpStat.innerHTML = "⭐⭐";
    type.innerHTML = "AGUA";
}

function mostrarStatsKusame(){
    let nombreMascotaH = document.getElementById('nombre-mascota');
    let atkStat = document.getElementById('at-stat');
    let hpStat = document.getElementById('hp-stat');
    let type = document.getElementById('tipo');

    let descripcion = document.getElementById('descripcion');
    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Kusame";
    atkStat.innerHTML = "⭐";
    hpStat.innerHTML = "⭐⭐⭐";
    type.innerHTML = "PLANTA";
}

function mascotaSeleccionada(){
    let akairuInput = document.getElementById('akairu');
    let sakanaariInput = document.getElementById('sakanaari');
    let kusameInput = document.getElementById('kusame');
    
    let ataquesH = document.getElementById('panel');
    let mascotasH = document.getElementById('mascotas');

    if(akairuInput.checked){
        alert("Seleccionaste al Zorro de Fuego, \"Akairu\".");
        mascotaJugadorH.innerHTML = "Akairu";
        mascotaJugador = 1;
        vidaJugador = 9;
        vidaJugadorH.innerHTML = vidaJugador;
        ataquesH.classList.remove('ocultar');
        mascotasH.classList.add('ocultar');
    }else if(sakanaariInput.checked){
        alert("Seleccionaste al Armadillo de Agua, \"Sakanaari\".");
        mascotaJugadorH.innerHTML = "Sakanaari";
        mascotaJugador = 2;
        vidaJugador = 14;
        vidaJugadorH.innerHTML = vidaJugador;
        ataquesH.classList.remove('ocultar');
        mascotasH.classList.add('ocultar');
    }else if(kusameInput.checked){
        alert("Seleccionaste a la Tortuga de Planta, \"Kusame\".");
        mascotaJugadorH.innerHTML = "Kusame";
        mascotaJugador = 3;
        vidaJugador = 20;
        vidaJugadorH.innerHTML = vidaJugador;
        ataquesH.classList.remove('ocultar');
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

function combate(){
    let dañoRecibido = ataqueEnemigo - mascotaJugador;

    let fuegoBtn = document.getElementById('fuego-btn');
    let aguaBtn = document.getElementById('agua-btn');
    let plantaBtn = document.getElementById('planta-btn');

    let mensajeJH = document.getElementById('mensaje-jugador');
    let mensajeEH = document.getElementById('mensaje-enemigo');

    dañoAtaqueJugador = calcularDaño();

    vidaEnemigo -= dañoAtaqueJugador;

    mensajeJH.innerHTML = "Tu ataque es de " + tipoAtaqueJugador + " con un daño de " + dañoAtaqueJugador + ". El enemigo ahora tiene " + vidaEnemigo + " de vida.";

    if(vidaEnemigo <= 0){
        vidaJugadorH.innerHTML = vidaJugador;
        vidaEnemigoH.innerHTML = vidaEnemigo;

        fuegoBtn.disabled = true;
        aguaBtn.disabled = true;
        plantaBtn.disabled = true;

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

        vidaJugador -= dañoAtaqueEnemigo;

        mensajeEH.innerHTML = "El ataque del enemigo es de " + tipoAtaqueEnemigo + " con un daño de " + dañoAtaqueEnemigo + ". Tu mascota " + mascotaJugadorH.innerHTML + " ahora tiene " + vidaJugador + " de vida."

        if(vidaJugador <= 0){
            vidaJugadorH.innerHTML = vidaJugador;
            vidaEnemigoH.innerHTML = vidaEnemigo;

            fuegoBtn.disabled = true;
            aguaBtn.disabled = true;
            plantaBtn.disabled = true;

            mensajeJH.innerHTML = "";
            mensajeEH.innerHTML = "Perdiste!";

            return 0;
        }

        vidaJugadorH.innerHTML = vidaJugador;
        vidaEnemigoH.innerHTML = vidaEnemigo;
        dañoAtaqueEnemigo = 4;
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

    return daño;
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