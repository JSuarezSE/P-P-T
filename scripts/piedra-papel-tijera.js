let tablaResultado = JSON.parse(localStorage.getItem('resultado')) || {
  ganaste:0,
  perdiste:0,
  empates:0
}; 
resultadoElement = document.querySelector('.js-resultado');
actualizarResultado();
let resultado = '';

let isAutoPlay = false;

let intervalId;

function autoplay(){
  if (!isAutoPlay) {
      intervalId = setInterval(() => {
      const jugadaPersona = movimientoMaquina();
      juego(jugadaPersona);
      }, 1000);
      isAutoPlay = true;
  }else {
      clearInterval(intervalId);
      isAutoPlay=false;
  }
}

    document.querySelector('.js-piedra')
    .addEventListener('click', () => {
      juego('piedra');
    });
    
    document.querySelector('.js-papel')
    .addEventListener('click', () => {
      juego('papel');
    });

    document.querySelector('.js-tijera')
    .addEventListener('click', () => {
      juego('tijera');
    });

    document.body.addEventListener('keydown', (event)=>{
      if(event.key==='a'){
        juego('piedra');
      }else if(event.key==='s'){
        juego('papel');
      }else if (event.key==='d') {
        juego('tijera');
      }
    })
function juego(jugadaPersona){

const jugadaMaquina = movimientoMaquina();

if (jugadaPersona==='tijera'){
      if (jugadaMaquina==='piedra'){
      resultado =  'Perdiste';

    } else if(jugadaMaquina==='papel'){
      resultado ='Ganaste';
    } else if(jugadaMaquina==='tijera'){
      resultado='Empate';
    }

} else if(jugadaPersona==='papel'){  
      if (jugadaMaquina==='piedra'){
      resultado =  'Ganaste';
    } else if(jugadaMaquina==='papel'){
      resultado ='Empate';
    } else if(jugadaMaquina==='tijera'){
      resultado='Perdiste';
    }

} else if (jugadaPersona==='piedra'){
      if (jugadaMaquina==='piedra'){
    resultado =  'Empate';
    } else if(jugadaMaquina==='papel'){
      resultado ='Perdiste';
    } else if(jugadaMaquina==='tijera'){
      resultado='Ganaste';
    }

}

if (resultado === 'Ganaste'){

  tablaResultado.ganaste +=1;

} else if (resultado === 'Perdiste'){

  tablaResultado.perdiste +=1;

} else if(resultado==='Empate'){

  tablaResultado.empates += 1;

}
localStorage.setItem('resultado', JSON.stringify(tablaResultado));

actualizarJugada(jugadaPersona,jugadaMaquina);
actualizarResultado();
actualizarSolucion();

}

function actualizarResultado(){
resultadoElement.innerHTML = `Has Ganado: ${tablaResultado.ganaste}, Perdido: ${tablaResultado.perdiste}, Empatado: ${tablaResultado.empates}`;

}

function actualizarJugada(jugadaPersona,jugadaMaquina){

document.querySelector('.js-jugada').innerHTML= `Tu jugaste: <img src="images/${jugadaPersona}.png" class="icon-${resultado}" > La computadora: <img src="images/${jugadaMaquina}.png" class="icon-Empate">`;
}
function actualizarSolucion(){
document.querySelector('.js-solucion').innerHTML= `${resultado}`
}


function movimientoMaquina(){

const numeroRandom = Math.random();
let jugadaMaquina= '';

if(numeroRandom>=0 && numeroRandom < 1/3 ){
  jugadaMaquina = 'piedra';
} else if(numeroRandom>= 1/3 && numeroRandom < 2 / 3){
  jugadaMaquina = 'papel';

} else if(numeroRandom >= 2 /3 && numeroRandom <  1){
  jugadaMaquina = 'tijera';
}
  return jugadaMaquina;
}