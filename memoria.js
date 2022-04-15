let order = []; //Garda a ordem de jogadas
let clickedOrder = []; //guarda a ordem dos Clicks
let Score = 0;


/*
    0 - Verde
    1 - vermelho
    2- amarelo
    3 - azul
*/

const blue = document.getElementById('blue')        // Atribuição das cores para uma constante 
const red = document.getElementById('red')          // Atribuição das cores para uma constante 
const green = document.getElementById('green')      // Atribuição das cores para uma constante 
const yellow = document.getElementById('yellow')    // Atribuição das cores para uma constante 


//Cria ordem aleatória de cores
function shuffleOrder() {
    let colorOrder = math.floor(math.random() * 4) //math.floor retorna um arredondamento e math.ramdom sorteia um numero
    order.push(colorOrder);
    clickedOrder = []

    for(let i in order){
        let elementeColor = createColorElemente(order[i]);
        lightColor(elementeColor, Number(i) + 1);
    }
}

//Acende a próxima Cor
let lightColor = (element, number) => {
    number = number * 500
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}


//Checa se os botões clicados estão na ordem certa do jogo
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]) {
            lose();
            break;
        }
    }

    if(clickedOrder.length == order.length){
        alert(`Pontuação: ${Score} \nVocê acertou! Iniciando Próximo nivel!`)
        nextLevel();
    }
}

//Função para o click do usuário
let click = (color) => {
    clickedOrder.push(color);
   createColorElemente(color).classList.add('selected')

    setTimeout(() => {
        createColorElemente(color).classList.remove('selected');
        checkOrder();
    }, 250)
}

//função que retorna a cor

let createColorElemente = (color) => {
    if (color == 0){
        return green;
    } else if(color == 1) {
        return red;
    } else if(color ==2){
        return yellow;
    } else if (color ==3) {
        return blue;
    }
}

// função para proximo nivel do jogo

let nextLevel = () => {
    Score++;
    shuffleOrder();
}

// Função para game over
let lose = () => {
    alert(`Pontuação :${Score} \nVocê perdeu o Jogo \nClicque em OK para iniciar um novo Jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    alert('Bem vindo ao Gênius! Iniciando um novo Jogo')
    Score = 0

    nextLevel();
}

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)


playGame();