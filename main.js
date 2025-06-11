let historico = [];

function abrirPrevisao(casa) {
  const painel = document.getElementById("painel");
  const textoCasa = document.getElementById("casaSelecionada");
  const casasContainer = document.getElementById("casasContainer");

  painel.classList.remove("hidden");
  textoCasa.innerText = Casa selecionada: ${casa};
  casasContainer.style.display = "none"; // Esconde os botões das casas
}

function preverRodada() {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "⏳ Calculando...";
  setTimeout(() => {
    const agora = new Date();
    const horaJoanesburgo = (agora.getUTCHours() + 2) % 24;
    const minuto = agora.getUTCMinutes();
    const horaDecimal = horaJoanesburgo + minuto / 60;

    const resultado = gerarMultiplicadorAtual(horaDecimal);

    const cor = resultado.faixa === "azul" ? "#00BFFF" :
                resultado.faixa === "roxo" ? "#B266FF" : "#FF1493";

    historico.unshift({ mult: resultado.multiplicador, cor });
    if (historico.length > 10) historico.pop();

    resultadoDiv.innerHTML = Resultado previsto: <span style="color:${cor}; font-weight:bold;">${resultado.multiplicador.toFixed(2)}x</span>;
    atualizarHistorico();
  }, 800);
}

function gerarMultiplicadorAtual(horaDecimal) {
  let faixa;
  let rand = Math.random();

  if (horaDecimal % 1 > 0.5) {
    if (rand < 0.7) faixa = "azul";
    else if (rand < 0.95) faixa = "roxo";
    else faixa = "rosa";
  } else {
    if (rand < 0.85) faixa = "azul";
    else if (rand < 0.98) faixa = "roxo";
    else faixa = "rosa";
  }

  let multiplicador;
  if (faixa === "azul") {
    multiplicador = Math.random() * (1.99 - 1.00) + 1.00;
  } else if (faixa === "roxo") {
    multiplicador = Math.random() * (9.99 - 2.00) + 2.00;
  } else {
    multiplicador = Math.random() * (8310 - 10.00) + 10.00;
  }

  return { multiplicador, faixa };
}

function atualizarHistorico() {
  const div = document.getElementById("historico");
  div.innerHTML = "<strong>Últimos resultados:</strong><br>";
  historico.forEach(h => {
    div.innerHTML += <span style="color:${h.cor}">${h.mult.toFixed(2)}x</span>;
  });
}
