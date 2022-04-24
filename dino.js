const dino = document.querySelector('.dino');
const imgDino = document.createElement('img');
imgDino.src = 'dino archives/dino.png'
dino.appendChild(imgDino);
const background = document.querySelector('.background')
let isJumping = false;
let position = 0;

function handleKeyDown(event) {
    if(event.keyCode === 32) {  //event.keyCode identifica o código de caracter de uma técla especifica
        if(!isJumping){
            jump();
        }        
    }
}

function jump() {
    
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 200) {
            clearInterval(upInterval)
            
            let downInterval = setInterval(() => {
                position -= 20;
                dino.style.bottom = `${position}px`;
                
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
            },20);

        } else {
            position += 20;
            dino.style.bottom = `${position}px`;
        }

    },20)
}

function createCactus() {
    const cactus = document.createElement('div');
    const imgCactus = document.createElement('img');
    let cactusPosition = 1300;
    let randomTime = Math.random() * 4500;
    imgCactus.src = 'dino archives/cactus.png';

    cactus.classList.add('cactus');
    cactus.style.left = 1300 + "px";
    background.appendChild(cactus);
    cactus.appendChild(imgCactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus)
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            
            //Gameover

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>' + '<h3>Pressione F5 para recomeçar...</h3>'
            document.body.style.textAlign = 'center';
            document.body.style.fontFamily = 'Segoe UI';
            document.body.style.fontSize = '20pt';
            document.body.style.color = '#A9A9A9';

        } else {
            cactusPosition -=10;
            cactus.style.left = cactusPosition + 'px' ;
        }
    },20)

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyDown);  //adicionou evento ao documento e chamo a function quando ele acontece