const yourShip = document.getElementsByClassName('player-shooter')[0];
const playArea = document.getElementById('main-play-area');
const objetosImg = ['shooter/machine.png', 'shooter/planet.png', 'shooter/fire-brock.png'];


//Função movimento e disparo
function flyShip(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if (event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//Função de Subir
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top'); // "getComputedStyle" Pega o código css e "getPropertyValue('top')" passa qual propriedade voce quer
    if(parseInt(topPosition) <= 0) {
        return
    } else{
        let position = parseInt(topPosition);
        position -= 30;
        yourShip.style.top = `${position}px`;
    }
}

//Função de Descer
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top'); // "getComputedStyle" Pega o código css e "getPropertyValue('top')" passa qual propriedade voce quer
    if(parseInt(topPosition) >= 510) {
        return
    } else{
        let position = parseInt(topPosition);
        position += 30;
        yourShip.style.top = `${position}px`;
    }
}

//funcionalidade de tiro

function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img')
    newLaser.src = 'shooter/shot.png';  //adiciona o source a TAG img
    newLaser.classList.add('laser') ;  //adiciona uma classe a TAG img
    newLaser.style.left = `${xPosition}px`;   //posiciona o laser
    newLaser.style.top = `${yPosition - 10}px`;  //posiciona o laser
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        
        if( xPosition === 580) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`
        }
    }, 10);
}

//função para criar inimigos(objetos) aleatórios
function createObjects() {
    let newObject = document.createElement('img');
    let objectSprite = objetosImg[Math.floor(math.random() * objetosImg.length)]; //sorteio de imagem
    newObject.src = objectSprite;
    newObject.classList.add('obj');
    newObject.classList.add('obj-transition');
    newObject.style.left = `370px`;
    newObject.style.top = `${math.floor(math.random() * 330) + 30}`;
    playArea.appendChild(newObject);
    moveObject();

}


window.addEventListener('keydown', flyShip); //função que ativa o teclado