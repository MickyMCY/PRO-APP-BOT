/* ---------- VARIÁVEIS ---------- */
let historico = [];

/* ---------- MOSTRA PAINEL ---------- */
function abrirPrevisao(casa) {
  document.getElementById("painel").classList.remove("hidden");
  document.getElementById("casaSelecionada").textContent =
    Casa selecionada: ${casa};
  document.getElementById("casas").classList.add("hidden");
}

/* ---------- PREVER UMA RODADA ---------- */
function preverRodada() {
  const resDiv = document.getElementById("resultado");
  resDiv.textContent = "Calculando...";
  setTimeout(() => {
    const multObj = gerarMultiplicador();
    mostrarResultado(multObj);
  }, 700);
}

/* ---------- SIMULAR VÁRIAS RODADAS ---------- */
function simularVarias(qtd) {
  let azul = 0, roxo = 0, rosa = 0;
  for (let i = 0; i < qtd; i++) {
    const m = gerarMultiplicador();
    if (m.faixa === "azul") azul++;
    else if (m.faixa === "roxo") roxo++;
    else rosa++;
  }
  document.getElementById("stats").innerHTML =
    `Total: ${qtd}<br>
     🔵 Azul: ${azul}<br>
     🟣 Roxo: ${roxo}<br>
     🌺 Rosa escuro: ${rosa}`;
}

/* ---------- GERA MULTIPLICADOR ---------- */
function gerarMultiplicador() {
  // Hora de Johannesburg
  const agora = new Date();
  const hora = (agora.getUTCHours() + 2) % 24 + agora.getUTCMinutes() / 60;

  // Probabilidades simples (pode refinar se quiser)
  const r = Math.random();
  let faixa;
  if (hora % 1 > 0.5) {
    faixa = r < 0.70 ? "azul" : r < 0.95 ? "roxo" : "rosa";
  } else {
    faixa = r < 0.85 ? "azul" : r < 0.98 ? "roxo" : "rosa";
  }

  let mult;
  if (faixa === "azul")      mult = randRange(1.00, 1.99);
  else if (faixa === "roxo") mult = randRange(2.00, 9.99);
  else                       mult = randRange(10.00, 8310);

  return { mult, faixa };
}

/* ---------- MOSTRA RESULTADO & HISTÓRICO ---------- */
function mostrarResultado({ mult, faixa }) {
  const cor = faixa === "azul" ? "#00BFFF" :
              faixa === "roxo" ? "#B266FF" : "#FF1493";

  historico.unshift({ mult, cor });
  if (historico.length > 10) historico.pop();

  document.getElementById("resultado").innerHTML =
    Resultado: <span style="color:${cor};font-weight:600;">${mult.toFixed(2)}x</span>;

  const hist = historico.map(h =>
    <span style="color:${h.cor};">${h.mult.toFixed(2)}x</span>
  ).join(" ");
  document.getElementById("historico").innerHTML = hist;
}

/* ---------- FUNÇÃO ALEATÓRIA ---------- */
function randRange(min, max) {
  return Math.random() * (max - min) + min;
}
