var jogador = 'X';
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var jogadorVencedor = document.getElementById('vencedor-selecionado');
const seqVenc = [
                 [1,2,3], [4,5,6],[7,8,9],
                 [1,4,7], [2,5,8], [3,6,9], 
                 [1,5,9], [3,5,7]
                ]


function resset(){
    console.log('entrei')
    for(var p = 1; p <= 9; p++){
        var quad = document.getElementById(p);
        quad.style.color = '#986CE6';
        quad.style.backgroundColor = '#986CE6';
        quad.innerHTML = '-';
        jogadorSelecionado.innerHTML = ''
        jogadorVencedor.innerHTML = ''
    }
}

function escolherQuadrado(id) {
    var quadrado = document.getElementById(id);
    if(quadrado.innerHTML != "-" || checaVencedor(seqVenc) == true){
        return;
    }

    quadrado.innerHTML = jogador;
    quadrado.style.color = '#fff';          

    if (checaVencedor(seqVenc) == true){
        jogadorVencedor.innerHTML = jogador;
    }    

    mudarJogador(jogador); 
}

function mudarJogador(valor) {
    jogador = valor;

    if (jogador === 'X') {
        jogador = 'O'
        jogadorSelecionado.innerHTML = jogador;
    } else if (jogador === 'O') {
        jogador = 'X'
        jogadorSelecionado.innerHTML = jogador;
    }
}

function checaVencedor(arr){
    for(let i = 0; i <= 7; i++){

        var q1 = document.getElementById(arr[i][0]);
        var q2 = document.getElementById(arr[i][1]);
        var q3 = document.getElementById(arr[i][2]);

        if((q1.innerHTML == q2.innerHTML && q2.innerHTML  == q3.innerHTML)&&(q1.innerHTML != '-' && q2.innerHTML != '-' && q3.innerHTML != '-')){
                q1.style.transition = '0.5s';
                q2.style.transition = '0.5s';
                q3.style.transition = '0.5s';           
                q1.style.backgroundColor ='#39007A';
                q2.style.backgroundColor ='#39007A';
                q3.style.backgroundColor ='#39007A';
                return true
        }
    }
}


