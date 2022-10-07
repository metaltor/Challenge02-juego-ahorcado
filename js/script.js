
document.querySelector('#comenzar').onclick = escogerLista;
document.querySelector('#jugar').onclick = comenzarPartida;
document.querySelector('#nueva-lista').onclick = pantallaNuevaLista;
document.querySelector('#crear-lista').onclick = crearNuevaLista;
document.querySelector('#agregar-palabras').onclick = agregarPalabras;
document.querySelector('#opciones-tematica').onclick = mostrarOpcionesTematica;
document.querySelector('#opciones-juego').onclick = mostrarOpcionesjuego;
document.querySelector('#volver-tematica').onclick = volverTematica;
document.querySelector('#volver-inicio').onclick = volverInicio;
document.querySelector('#volver-partida').onclick = volverPartida;
document.querySelector('#volver-tematica-crear').onclick = volverTematicadeListas;
document.querySelector('#reiniciar').onclick = comenzarPartida;
document.querySelector('#cambiar-tematica').onclick = cambiarTematica;


const $inicio = document.querySelector('#inicio');
const $tematica = document.querySelector('#tematica');
const $creadorLista = document.querySelector('#creador-lista');
const $opciones = document.querySelector('#opciones');
const $partida = document.querySelector('#partida');

let listasPalabras = {
    peliculas : ['spiderman', 'infiltrados', 'el exorcista', 'cars', 'la sirenita', 'harry potter', 'hellboy', 'titanic', 'el resplandor' ,'norbit'],
    vegetales : ['brocoli', 'zanahoria', 'zapallo', 'arveja', 'rabanito', 'lechuga', 'apio', 'cebolla', 'rocoto', 'ajo'],
    animales : ['halcon', 'zorro', 'ardilla', 'hipopotamo', 'tiburon', 'tigre', 'murcielago', 'conejo', 'gallina', 'caballo', 'perro', 'gato','paloma']
}


function escogerLista(){
    event.preventDefault()
    ocultar($inicio)
    mostrar($tematica)
    $musica.play()
    document.onkeypress ='';
    
    
}
function mostrarOpcionesTematica (){
    event.preventDefault()
    ocultar($tematica)
    mostrar($opciones)
    const $botonVolverInicio = document.querySelector('#volver-tematica')
    mostrar($botonVolverInicio)
}

function volverTematica() {
    event.preventDefault()
    ocultar($opciones)
    mostrar($tematica)
}
function volverInicio(){
    reiniciarJuego()
    mostrar($inicio)
    ocultar($partida)
    $musica.pause()
}
function mostrarOpcionesjuego () {
    event.preventDefault()
    mostrar($opciones)
    ocultar($partida)
    const $botonVolverPartida = document.querySelector('#volver-partida')
    mostrar($botonVolverPartida)
}
function volverPartida(){
    event.preventDefault()
    mostrar($partida);
    ocultar($opciones)
}

const $resultado = document.querySelector('#mensaje-resultado')
function comenzarPartida(event){
    event.preventDefault()
    if(!$resultado.classList.contains('hiden')){
        $resultado.style.zIndex ='0'
        ocultar($resultado)
    }
    if($partida.classList.contains('hiden')){
        ocultar($tematica)
        mostrar($partida)
    }
    borrarLetrasUsadas()
    eliminarRayitas()
    event.preventDefault()
    reiniciarJuego()
    cambiarEscenario('panoramica3')
    document.onkeypress = capturarCaracter;
    let palabra = sortearPalabra()
    let palabraJunta= palabra.toUpperCase().replace(' ','')
    crearRayitas(palabra)
    arrayCorrectas(palabraJunta)
    function capturarCaracter(evObject){
        let caracter = evObject.key;
        CompararCaracter(caracter,palabraJunta, palabra)
    }
    
}
function volverTematicadeListas() {
    event.preventDefault()
    ocultar($creadorLista)
    mostrar($tematica)
}
function cambiarTematica(){
    ocultar($partida)
    mostrar($tematica)
    const $resultado = document.querySelector('#mensaje-resultado')
    ocultar($resultado)
    $resultado.style.zIndex ='0'
}
//reiniciar valores
function reiniciarJuego(){
    intentos = 0
    letrasUsadas = []
    palabra = ''
    todasLasLetras = []
    document.onkeypress ='';
}
function pantallaNuevaLista(event){
    event.preventDefault()
    ocultar($tematica)
    mostrar($creadorLista)
}

let nuevaLista = []
function agregarPalabras(event) {
    event.preventDefault()
    let $palabrasNuevas = document.querySelector('#palabras-nuevas').value.toLowerCase().split(' ')
    let palabrasLimpias = $palabrasNuevas.map( palabra => palabra.replace(/(\W)/gi, ''))
    palabrasLimpias.forEach(element => {
        nuevaLista.includes(element) ? element : nuevaLista.push(element)
    });
    console.log($palabrasNuevas)
    console.log(nuevaLista)
    document.querySelector('#palabras').value = nuevaLista
    document.querySelector('#palabras-nuevas').value = ''
    
}

function crearNuevaLista(event) {
    event.preventDefault()
    let $nombreNuevaLista = document.querySelector('#titulo-nuevo').value
    listasPalabras[$nombreNuevaLista] = nuevaLista
    guardarLocalStorage()
    console.log($nombreNuevaLista) 
    console.log(nuevaLista)
    ocultar($creadorLista)
    mostrar($tematica)
    let tituloAtributos = $nombreNuevaLista.replace(' ', '-')

    const newRadioButton = document.createElement("input");
    newRadioButton.setAttribute('type','radio');
    newRadioButton.setAttribute('name','lista');
    newRadioButton.setAttribute('value', tituloAtributos);
    newRadioButton.setAttribute('id', tituloAtributos);
    const $formularioListas = document.querySelector('#formulario-listas');
    const $ultimoRadio = document.querySelector('#opciones-tematica')
    
   
    const newLabelForRadio = document.createElement('label')
    newLabelForRadio.htmlFor = tituloAtributos

    var contenidoLabel = document.createTextNode($nombreNuevaLista);
    newLabelForRadio.appendChild(newRadioButton)
    newLabelForRadio.appendChild(contenidoLabel)
    
    
    $formularioListas.insertBefore(newLabelForRadio, $ultimoRadio);
}
//funcion sortear palabras
function sortearPalabra(){
    let $nombreLista = document.querySelector('input[name="lista"]:checked').value
    let array = listasPalabras[`${$nombreLista}`]
    let random = Math.floor(Math.random() * (array.length))
    let palabra =  array[random];
    console.log(array, palabra, random)
    return palabra
}
function eliminarRayitas() {
    const $letrasCreadas = document.querySelectorAll('.letra')
    if ($letrasCreadas.length != 0){
        
     $letrasCreadas.forEach(letra => letra.remove()    
    );
 }
}
function crearRayitas(palabra){
const $letrasCorrectas = document.querySelector('#letras-correctas')

let cantidadPalabras = 1

for(let i = 0 ; i< palabra.length; i++){
    if(i===0){
        const nuevoDiv = document.createElement('div')
        nuevoDiv.classList.add(`palabra${cantidadPalabras}`)
        nuevoDiv.classList.add('nueva-palabra')
        $letrasCorrectas.appendChild(nuevoDiv)
        cantidadPalabras++
    }
    if (palabra[i].charCodeAt()== 32){
        const nuevoDiv = document.createElement('div')
        nuevoDiv.classList.add(`palabra${cantidadPalabras}`)
        nuevoDiv.classList.add('nueva-palabra')      
        let $nuevoDiv = document.querySelector(`.palabra${cantidadPalabras-1}`)

        const nuevoP = document.createElement('p')
        nuevoP.classList.add('espacio')
        nuevoP.innerHTML = ' '
        $nuevoDiv.appendChild(nuevoP)

        $letrasCorrectas.appendChild(nuevoDiv)
        cantidadPalabras++
    }

    if(palabra[i].charCodeAt()!= 32) {
        let $nuevoDiv1 = document.querySelector(`.palabra${cantidadPalabras-1}`)
        const nuevoP = document.createElement('p')
        nuevoP.classList.add('letra')
        $nuevoDiv1.appendChild(nuevoP)
  }
 }
}
// crear array de letras correctas
todasLasLetras = []
function arrayCorrectas(palabra) {
    for( let i = 0 ; i < palabra.length ; i++){
       if(!todasLasLetras.includes(palabra[i])){
        todasLasLetras.push(palabra[i])
       } 
    }
    console.log(todasLasLetras)
}
let letrasUsadas  = []
let intentos = 0
let letrasAgregadasCorrectas = []
function CompararCaracter(caracter,palabra, palabraSeparada) {
    const $espacioPalabras = document.querySelectorAll('.letra') 
    palabra = palabra.toUpperCase() 
    let caracterMayuscula = caracter.toString().toUpperCase()
    let caracMayusCode = caracterMayuscula.charCodeAt()
        console.log(caracter)
    
    if ((caracMayusCode >= 65 && caracMayusCode <= 90) || caracMayusCode === 209) {
        if(!letrasUsadas.includes(caracterMayuscula)){
            console.log('Tecla pulsada: ' + caracterMayuscula) 
        if(!letrasUsadas.includes(caracterMayuscula)){
            letrasUsadas.push(caracterMayuscula)
        }
        for( let i = 0 ; i < palabra.length ; i++){
            
            if(caracterMayuscula == palabra[i]){
                $espacioPalabras[i].innerHTML = caracterMayuscula
                $espacioPalabras[i].style.paddingTop = '0px'
                cambiarMensaje('¡Excelente!, vas muy bien :)')
                if(!letrasAgregadasCorrectas.includes(palabra[i])) 
                letrasAgregadasCorrectas.push(palabra[i])  
                console.log(letrasAgregadasCorrectas)
            }

        }
        if(!palabra.includes(caracterMayuscula)){
            intentos++
            cambiarMensaje('¡Fallaste!, intentalo nuevamente')
            ahorcado(intentos, palabraSeparada)
        } 
        agregarLetrasUsadas()
        console.log(letrasUsadas)
        }else{
            cambiarMensaje('¡ya usaste esa letra! :(')
        }
        
    }

    else { 
        cambiarMensaje('¡Presiona una tecla valida! :(')        
    }
    console.log(intentos)
    if (todasLasLetras.every(letra => letrasAgregadasCorrectas.includes(letra))){
        setTimeout(() => {
            mensajeFinal('!Felicitaciones, ganaste!')
        }, 1500);
        
    }
}

//cambiar mensaje final
function mensajeFinal(mensaje){
    const $resultado = document.querySelector('#mensaje-resultado')
    $resultado.style.zIndex ='2'

    mostrar($resultado)
    const $mensajeFinal =document.querySelector('#mensaje-final')
    $mensajeFinal.innerHTML= mensaje
       
}
    
 // borrar letras Usadas
 function borrarLetrasUsadas(){
    const $letrasUsadasAnteriores = document.querySelectorAll('.letra-usada')
    if ($letrasUsadasAnteriores.length != 0){
        
        $letrasUsadasAnteriores.forEach(letra => letra.remove()    
        );
    }
 }
 function agregarLetrasUsadas(){
    const $letrasUsadas = document.querySelector('#letras-usadas-container')
    const $letrasUsadasAnteriores = $letrasUsadas.querySelectorAll('.letra-usada')
    console.log($letrasUsadasAnteriores)
    if ($letrasUsadasAnteriores.length != 0){
        
        $letrasUsadasAnteriores.forEach(letra => letra.remove()    
        );
    }
    
    for ( let i = 0 ; i < letrasUsadas.length ; i++){
        const nuevoP = document.createElement('p')
        nuevoP.className = 'letra-usada'
        nuevoP.innerHTML = letrasUsadas[i]
        $letrasUsadas.appendChild(nuevoP)
    }
 }


//cambiar background image
function cambiarEscenario(imagen) {
    const $ahorcadoCanvas = document.querySelector('#ahorcado-canvas')
    $ahorcadoCanvas.style.backgroundImage = `url('../media/images/${imagen}.jpg')`;

}
//cambiar mensaje temporal
function cambiarMensaje(mensaje){
    document.querySelector('#mensaje-temporal').innerHTML = mensaje
    setTimeout(() => {
        document.querySelector('#mensaje-temporal').innerHTML =''
    }, 3000);
}

//funciones para cambiar de pantallas
function mostrar($idPantalla){
    $idPantalla.classList.remove('hiden')
}
function ocultar($idPantalla){
    $idPantalla.classList.add('hiden')
}

//controlar volumen con slider
const $musica = document.getElementById("bg-musica");
const $barra = document.querySelector('#barra-volumen')
$barra.addEventListener("change",function(ev){	
    $musica.volume = ev.currentTarget.value;	
  },true);


//mutear musica (opciones)
 const $mute = document.querySelector('#mute')
 $mute.addEventListener("change", mutePlay, false);
 
 function mutePlay() {
    let checked = $mute.checked;
   if(checked){
    $musica.volume = 0;
    console.log('esta muteado')
   }else {
    $musica.volume = 1;
    console.log('no esta muteado')
   }
 }
//bloquear doble espaciado en textarea agregar palabras y primer caracter espacio (agregar palabras)
document.querySelector("#palabras-nuevas").addEventListener("keydown", bloquearDobleEspacio);
document.querySelector("#titulo-nuevo").addEventListener("keydown", bloquearDobleEspacio);
let teclaAnterior = "";

function bloquearDobleEspacio(event) {

teclaAnterior = teclaAnterior + " " + event.keyCode;
const arregloTA = teclaAnterior.split(" ");
if (event.keyCode == 32 && arregloTA[arregloTA.length - 2] == 32 || arregloTA[0]) {
event.preventDefault();
}
}
//cambiar colores (opciones)
const $colorTema = document.querySelector('#color-tema')
$colorTema.addEventListener('change',cambiarColor,true)
const $contenidoJuego = document.querySelector('#contenido-juego')
const $juego = document.querySelectorAll('.juego')
function cambiarColor(){
    if(color1.checked){
        $contenidoJuego.style.backgroundColor = '#33691E'
        $juego.forEach(elemento => elemento.style.backgroundColor = '#8BC34A')
    }
    if(color2.checked){
        $contenidoJuego.style.backgroundColor = '#B71C1C'
        $juego.forEach(elemento => elemento.style.backgroundColor = '#F44336')
    }
    if(color3.checked){
        $contenidoJuego.style.backgroundColor = '#1A237E'
        $juego.forEach(elemento => elemento.style.backgroundColor = '#3F51B5')
    }
}

cambiarColor()
function guardarLocalStorage(){
    // Se guarda en localStorage despues de JSON stringificarlo 
    localStorage.setItem('listasDePalabras', JSON.stringify(listasPalabras));
    // Obtener el arreglo de localStorage
    var listas = localStorage.getItem('listasDePalabras');
    // Se parsea para poder ser usado en js con JSON.parse :)
    listas = JSON.parse(listas);
    console.log(listas) 
    }
    //guardarLocalStorage()

  