const yourShip = document.getElementsByClassName('player-shooter')[0];
const playArea = document.getElementById('main-play-area');
const objetosImg = ['shooter/machine.png', 'shooter/planet.png', 'shooter/fire-brock.png'];
const instructionsText = document.getElementsByClassName('game-instructions')[0];
const startButton = document.getElementsByClassName('start-button')[0];
let objectInterval;

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
    newLaser.style.top = `${yPosition - 15}px`;  //posiciona o laser
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let objects = document.querySelectorAll('.obj')

        objects.forEach((object) => {  //comparando se objeto foi atingido, se sim troca o src da img
            if(checkLaserCollision(laser, object)) {
                object.src = 'shooter/explosion.png';
                object.classList.remove('obj')
                object.classList.add('dead-alien');
            }
        })
        
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
    let objectSprite = objetosImg[Math.floor(Math.random() * objetosImg.length)]; //sorteio de imagem
    newObject.src = objectSprite;
    newObject.classList.add('obj');
    newObject.classList.add('obj-transition');
    newObject.style.left = `370px`;
    newObject.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newObject);
    moveObject(newObject);
}

//função para movimentar os inimigos

function moveObject(object) {
    let moveObjectInterval = setInterval(() => {
        console.log(object)
        let xPosition = parseInt(window.getComputedStyle(object).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(object.classList).includes('dead-alien')) {
                object.remove();
            } else {
                gameOver();
            } 
        } else {
            object.style.left = `${xPosition - 1}px`
        }
    },20);
}  

//função para colisão
function checkLaserCollision(laser, object) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;

    let objectTop = parseInt(object.style.top);
    let objectLeft = parseInt(object.style.left);
    let objectBottom = objectTop - 30;

    if(laserLeft != 340 && laserLeft + 60 >= objectLeft) {
        if(laserTop <= objectTop && laserTop >= objectBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}


//inicia o Jogo

startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);

    objectInterval = setInterval(() => {
        createObjects();
    },3000)
}

//função de game over

function gameOver() {
    window.removeEventListener['keydown', flyShip]
    clearInterval(objectInterval);
    let objects = document.querySelectorAll('.obj');
    objects.forEach((object) => object.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());   
    yourShip.style.top = '350px';
    startButton.style.display = 'block';
    startButton.style.justfyContent = 'center';
    startButton.style.alignItems = 'center';
    startButton.style.padding = '15px 0'
    instructionsText.style.display = 'block';
    instructionsText.style.justfyContent = 'center';
    instructionsText.style.alignItems = 'center';
    instructionsText.style.textAlign = 'center';
}
