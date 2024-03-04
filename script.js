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
const modal = document.getElementById('mi-modal');
const comoJugarBtn = document.getElementById('como-jugar');
const span = document.getElementsByClassName('close')[0];

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
    { nombre: 'Fuego 🔥', id: 'fuego-btn' }
);

sakanaari.ataques.push(
    { nombre: 'Normal 👊', id: 'normal-btn' },
    { nombre: 'Especial ⭐', id: 'especial-btn' },
    { nombre: 'Agua 💧', id: 'agua-btn' }
);

kusame.ataques.push(
    { nombre: 'Normal 👊', id: 'normal-btn' },
    { nombre: 'Especial ⭐', id: 'especial-btn' },
    { nombre: 'Planta 🌱', id: 'planta-btn' }
);

mascotas.push(akairu, sakanaari, kusame);

function inicio(){
    mascotas.forEach((mascota) => {
        opcionDeMascotas = `
        <input type="radio" name="mascota" id=${mascota.nombre}><label for=${mascota.nombre}><img id=${mascota.nombre}-img src=${mascota.imagen} alt=${mascota.nombre}></label>
        `;

        tarjetaMascotaH.innerHTML += opcionDeMascotas;

        akairuInput = document.getElementById('akairu');
        sakanaariInput = document.getElementById('sakanaari');
        kusameInput = document.getElementById('kusame');
    });

    let akairuImg = document.getElementById('akairu-img');
    let sakanaariImg = document.getElementById('sakanaari-img');
    let kusameImg = document.getElementById('kusame-img');

    akairuImg.addEventListener('mouseover', reproducirAudioHover);
    sakanaariImg.addEventListener('mouseover', reproducirAudioHover);
    kusameImg.addEventListener('mouseover', reproducirAudioHover);

    akairuInput.addEventListener('click', mostrarStatsAkairu);
    sakanaariInput.addEventListener('click', mostrarStatsSakanaari);
    kusameInput.addEventListener('click', mostrarStatsKusame);

    seleccionarMascota.addEventListener('click', mascotaSeleccionada);
    seleccionarMascota.addEventListener('mouseover', reproducirAudioHover);

    comoJugarBtn.addEventListener('click', mostrarModal);
    comoJugarBtn.addEventListener('mouseover', reproducirAudioHover);
    span.addEventListener('click', cerrarModal);
    window.addEventListener('click', cerrarModalWindow);

    reiniciarBtn.addEventListener('click', reinicarPartida);
    reiniciarBtn.addEventListener('mouseover', reproducirAudioHover);
}

function mostrarModal(){
    reproducirAudioClick();
    
    modal.classList.remove('ocultar');
    modal.classList.add('block-m');
}

function cerrarModal(){
    modal.classList.add('ocultar');
    modal.classList.remove('block-m');
}

function cerrarModalWindow(event){
    if(event.target == modal){
        modal.classList.add('ocultar');
        modal.classList.remove('block-m');
    }
}

function mostrarStatsAkairu(){
    reproducirAudioClick();

    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Akairu";
    atkStat.innerHTML = "⭐⭐⭐";
    hpStat.innerHTML = "⭐";
    type.innerHTML = "FUEGO";
}

function mostrarStatsSakanaari(){
    reproducirAudioClick();

    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Sakanaari";
    atkStat.innerHTML = "⭐⭐";
    hpStat.innerHTML = "⭐⭐";
    type.innerHTML = "AGUA";
}

function mostrarStatsKusame(){
    reproducirAudioClick();

    descripcion.classList.remove('ocultar');

    nombreMascotaH.innerHTML = "Kusame";
    atkStat.innerHTML = "⭐";
    hpStat.innerHTML = "⭐⭐⭐";
    type.innerHTML = "PLANTA";
}

function reproducirAudioHover(){
    let audio = document.getElementById('select-hover');
    audio.play();
}

function reproducirAudioClick(){
    let audio = document.getElementById('click');
    audio.play();
}

function reproducirAudioElemento(tipoAtaque){
    let audioFire = document.getElementById('fire');
    let audioWater = document.getElementById('water');
    let audioPlant = document.getElementById('plant');
    let audioSpecial1 = document.getElementById('special-1');
    let audioSpecial2 = document.getElementById('special-2');
    let audioNormal = document.getElementById('normal');

    switch(tipoAtaque){
        case 1:
            if(ataqueJugador != 4 || mascotaJugador != 3){
                audioFire.play();
            }else{
                audioSpecial2.play();
            }
            break;
        case 2:
            if(ataqueJugador != 4 || mascotaJugador != 3){
                audioWater.play();
            }else{
                audioSpecial2.play();
            }
            break;
        case 3:
            if(ataqueJugador != 4 || mascotaJugador != 3){
                audioPlant.play();
            }else{
                audioSpecial2.play();
            }
            break;
        case 4:
            if(mascotaJugador != 3){
                audioSpecial1.play();
            }
            break;
        case 5:
            audioNormal.play();
            break;
    }
}

function mascotaSeleccionada(){
    reproducirAudioClick();

    if(akairuInput.checked){
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
    reproducirAudioClick();
    
    ataqueJugador = 1;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'FUEGO';

    combate();
}

function atacarAgua(){
    reproducirAudioClick();

    ataqueJugador = 2;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'AGUA';
    
    combate();
}

function atacarPlanta(){
    reproducirAudioClick();

    ataqueJugador = 3;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'PLANTA';
    
    combate();
}

function ataqueEspecial(){
    reproducirAudioClick();

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

function ataqueNormal(){
    reproducirAudioClick();

    ataqueJugador = 5;
    mascotaEnemigo = random(1, 3);
    tipoDeAtaqueEnemigo()
    tipoAtaqueJugador = 'NORMAL';

    switch(mascotaJugador){
        case 1:
            dañoAtaqueJugador = 3;
            break;
        case 2:
            dañoAtaqueJugador = 2;
            break;
        case 3:
            dañoAtaqueJugador = 1;
            break;
    }

    normalBtn.disabled = true;
    
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
                fuegoBtn = document.getElementById('fuego-btn');
                break;
            case 2:
                aguaBtn = document.getElementById('agua-btn');
                break;
            case 3:
                plantaBtn = document.getElementById('planta-btn');
                break;
        }
        especialBtn = document.getElementById('especial-btn');
        normalBtn = document.getElementById('normal-btn');
    })

    switch(mascotaJugador){
        case 1:
            fuegoBtn.addEventListener('click', atacarFuego);
            fuegoBtn.addEventListener('mouseover', reproducirAudioHover);
            break;
        case 2:
            aguaBtn.addEventListener('click', atacarAgua);
            aguaBtn.addEventListener('mouseover', reproducirAudioHover);
            break;
        case 3:
            plantaBtn.addEventListener('click', atacarPlanta);
            plantaBtn.addEventListener('mouseover', reproducirAudioHover);
            break;
    }
    especialBtn.addEventListener('click', ataqueEspecial);
    especialBtn.addEventListener('mouseover', reproducirAudioHover);
    normalBtn.addEventListener('click', ataqueNormal);
    normalBtn.addEventListener('mouseover', reproducirAudioHover);
}

function combate(){
    mensajeJH.innerHTML = "Tu mascota esta atacando...";

    setTimeout(function(){
        let dañoRecibido = ataqueEnemigo - mascotaJugador;

        reproducirAudioElemento(ataqueJugador);

        if(ataqueJugador != 4 && ataqueJugador != 5){
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
            reproducirAudioElemento(ataqueEnemigo);


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
        }, 2000);
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
    reproducirAudioClick();

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