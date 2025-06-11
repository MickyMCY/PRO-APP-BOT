const botoesCasa = document.querySelectorAll('.bet-button');
const painel = document.getElementById('painel');
const home = document.getElementById('home');
const casaSelecionada = document.getElementById('casaSelecionada');
const voltar = document.getElementById('voltar');
const prever = document.getElementById('prever');
const resultadoPrevisao = document.getElementById('resultadoPrevisao');
const historicoLista = document.getElementById('listaHistorico');
const botoesSimular = document.querySelectorAll('.simular');
const azulCount = document.getElementById('azulCount');
const roxoCount = document.getElementById('roxoCount');
const rosaCount = document.getElementById('rosaCount');

let historico = [];

function getHorarioJohannesburg() {
  const agoraUTC = new Date();
  const offset = 2; // UTC+2
  return new Date(agoraUTC.getTime() + offset * 60 * 60 * 1000);
}

function gerarMultiplicador() {
  const agora = getHorarioJohannesburg();
  const minutos = agora.getMinutes();
  let chance = Math.random();

  if (minutos <= 30) {
    if (chance < 0.7) return randomRange(1.00, 1.99, 'azul');
    else if (chance < 0.97) return randomRange(2.00, 9.99, 'roxo');
    else return randomRange(10.00, 150.00, 'rosa');
  } else {
    if (chance < 0.5) return randomRange(1.00, 1.99, 'azul');
    else if (chance < 0.9) return randomRange(2.00, 9.99, 'roxo');
    else return randomRange(10.00, 8310.00, 'rosa');
  }
}

function randomRange(min, max, faixa) {
  const valor = +(Math.random() * (max - min) + min).toFixed(2);
  return { valor, faixa };
}

function atualizarHistorico(multiplicador) {
  historico.unshift(multiplicador);
  if (historico.length > 10) historico.pop();

  historicoLista.innerHTML = '';
  let azul = 0, roxo = 0, rosa = 0;

  historico.forEach(({ valor, faixa }) => {
    const li = document.createElement('li');
    li.textContent = ${valor.toFixed(2)}x;
    li.classList.add(faixa);
    historicoLista.appendChild(li);

    if (faixa === 'azul') azul++;
    if (faixa === 'roxo') roxo++;
    if (faixa === 'rosa') rosa++;
  });

  azulCount.textContent = azul;
  roxoCount.textContent = roxo;
  rosaCount.textContent = rosa;
}

prever.addEventListener('click', () => {
  const mult = gerarMultiplicador();
  resultadoPrevisao.textContent = ${mult.valor}x;
  resultadoPrevisao.className = resultado ${mult.faixa};
  atualizarHistorico(mult);
});

botoesSimular.forEach(botao => {
  botao.addEventListener('click', () => {
    const qtd = parseInt(botao.dataset.qtd);
    for (let i = 0; i < qtd; i++) {
      atualizarHistorico(gerarMultiplicador());
    }
    resultadoPrevisao.textContent = Simulado ${qtd} rodadas;
    resultadoPrevisao.className = 'resultado';
  });
});

botoesCasa.forEach(botao => {
  botao.addEventListener('click', () => {
    const casa = botao.dataset.casa;
    casaSelecionada.textContent = casa;
    home.style.display = 'none';
    painel.style.display = 'block';
  });
});

voltar.addEventListener('click', () => {
  painel.style.display = 'none';
  home.style.display = 'block';
  historico = [];
  historicoLista.innerHTML = '';
  azulCount.textContent = roxoCount.textContent = rosaCount.textContent = '0';
  resultadoPrevisao.textContent = '';
});
