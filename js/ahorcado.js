const  pantalla = document.querySelector("canvas");
const pincel = pantalla.getContext("2d");
function error1(){
  pincel.fillStyle = "black";
  pincel.fillRect(95,3,5,150);
}
function error2(){
  pincel.fillStyle = "black";
  pincel.fillRect(95,3,70,5);
}
function error3(){
  pincel.fillStyle = "black";
  pincel.fillRect(165,3,5,22);
}
function error4(){
  pincel.strokeStyle = "black";
  pincel.lineWidth = 5
  pincel.fillStyle = "black";
  pincel.beginPath();
  pincel.arc(169, 37, 10, 0, 4*3.14);
  pincel.stroke();
  pincel.fill();
}
function error5(){
  pincel.fillStyle = "black";
  pincel.fillRect(165,49,7,40);
}
function error6(){
//brazo derecho
pincel.strokeStyle = "black";
pincel.lineWidth = 5
pincel.moveTo(169,50);
pincel.lineTo(185,80);
pincel.stroke();
}
function error7(){
//brazo izquierdo
pincel.strokeStyle = "black";
pincel.lineWidth = 5
pincel.moveTo(169,50);
pincel.lineTo(153,80);
pincel.stroke();
}
function error8(){
//pierna derecha
pincel.strokeStyle = "black";
pincel.lineWidth = 5
pincel.moveTo(169,85);
pincel.lineTo(185,120);
pincel.stroke();
}
function error9(){
//pierna izquierda
pincel.strokeStyle = "black";
pincel.lineWidth = 5
pincel.moveTo(169,85);
pincel.lineTo(153,120);
pincel.stroke();
}
function caraViva(){
//ojo izquierdo
pincel.fillStyle = 'white';
pincel.beginPath();
pincel.arc(164, 33, 2.5, 0, 4*3.14);
pincel.fill();
//ojo derecho
pincel.fillStyle = 'white';
pincel.beginPath();
pincel.arc(173, 33, 2.5, 0, 4*3.14);
pincel.fill();
// boca
pincel.fillStyle = 'white';
function radians(grados){
    return grados * Math.PI / 180;
  }
pincel.beginPath();
pincel.arc(169, 38, 8, radians(0), radians(-180));
pincel.fill();
};

function caraMuerta() {
    pincel.strokeStyle = "white";
    pincel.beginPath()
    pincel.lineWidth = 2
    //muerto
    //ojo izquierdo
    pincel.moveTo(161,36);
    pincel.lineTo(167,30);
    pincel.stroke();
    pincel.moveTo(167,36);
    pincel.lineTo(161,30);
    pincel.stroke();
    //ojo derecho
    pincel.moveTo(177,36);
    pincel.lineTo(171,30);
    pincel.stroke();
    pincel.moveTo(171,36);
    pincel.lineTo(177,30);
    pincel.stroke();
    //boca
    pincel.moveTo(163,43);
    pincel.lineTo(175,43);
    pincel.stroke();
    
}
function ahorcado(numero,palabra, palabraSeparada){
  switch (numero) {
    case 0:
      break;
    case 1:
      error1();
      break;
    case 2:
      error1();
      error2();
      break;
    case 3:
      error1();
      error2();
      error3();
      break;
    case 4:
      error1();
      error2();
      error3();
      error4();
      caraViva();
      break;
    case 5:
      error1();
      error2();
      error3();
      error4();
      error5();
      caraViva();
      break;
    case 6:
      error1();
      error2();
      error3();
      error4();
      error5();
      error6();
      caraViva();
      break;
    case 7:
      error1();
      error2();
      error3();
      error4();
      error5();
      error6();
      error7();
      caraViva();
      break;
    case 8:
      error1();
      error2();
      error3();
      error4();
      error5();
      error6();
      error7();
      error8();
      caraViva();
      break;
    case 9:
      error1();
      error2();
      error3();
      error4();
      error5();
      error6();
      error7();
      error8();
      error9();
      caraMuerta();
      cambiarEscenario('infierno')
      setTimeout(() => {
        mensajeFinal(`¡Perdiste!, la palabra era ${palabraSeparada}`)
      }, 1500);
      
      break;
  }
}

