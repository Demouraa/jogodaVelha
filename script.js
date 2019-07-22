const sequenciaVencedora = [
    [0,1,2], //primeira sequencia vencedora
    [3,4,5], //segunda sequencia vencedora
    [6,7,8], //terceira sequencia vencedora
    [0,4,8], //quarta sequencia vencedora
    [2,4,6], //quinta sequencia vencedora
    [0,3,6], //sexta sequencia vencedora
    [1,4,7], //sétima sequencia vencedora
    [2,5,8]  //oitava sequencia vencedora
];

/*cria uma variavel que se conecta a classe q*/
const grid = () => Array.from(document.getElementsByClassName('q'));

/*remove a letra q do id e transforma o resto da string em um numero*/
const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', '')); 

/*verifica qual quadrado esta vazio.*/
const qVazio = () => grid().filter(_qEl => _qEl.innerText === '');

/*verifica se todos os itens dentro do array são os mesmos,e que o array não possui nenhum elemento vazio.*/
/*.every verifica se todos os elementos do array batem com o solicitado pela função.*/
const igual = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== ''); 

/*index é o quadrado(0 a 8) que a jogada sera feita e letter é o X ou O. A variavel muda o valor do texto para X ou O.*/
const turno = (index, letter) => grid()[index].innerText = letter;

/*Função que define que a maquina, Jogadorbolinha ira realizar jogadas...aletórias*/
const jogadorbolinha = () => qNumId(qVazio()[Math.floor(Math.random() * qVazio().length)]);

const fimDeJogo = (sequenciaVencedora) => { 
    sequenciaVencedora.forEach(_qEl => _qEl.classList.add('vencedor'));
    alert('Acabou o Jogo. Obrigado por jogar!');
    disableListeners();
    console.log('Fim de jogo', sequenciaVencedora); 
}

const checarVitoria = () => {
    let vitoria = false;

    sequenciaVencedora.forEach(_c => {
        const _grid = grid();
        const sequencia = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if(igual(sequencia)) {
            vitoria = true;
            fimDeJogo(sequencia);
        }
    });

    return vitoria;
}

const vezdaMaquina = () => {
    disableListeners();
    setTimeout(() => {
        turno(jogadorbolinha(), 'O');
        if(!checarVitoria())
            enableListeners();
    }, 100);
}

/*Função que atribui funções a outras funções conectando o código*/
const clickFn =  ($event) => {
    turno(qNumId($event.target), 'X');
    if(!checarVitoria())
        vezdaMaquina();
};

/*para cada elemento q, adiciona um evento click*/
const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn/*clickfunction, função click*/));

/*para cada elemento q, remove um evento click, assim o jogador a não joga na vez do b*/
const disableListeners = () => grid().forEach(_qEl=> _qEl.removeEventListener('click', clickFn));

enableListeners();