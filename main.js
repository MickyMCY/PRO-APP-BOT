function gerarMultiplicador() {
  const agora = new Date();
  const hora = agora.getUTCHours() + 2; // Johannesburg
  const minutos = agora.getUTCMinutes();

  const finalDeHora = minutos >= 30;
  let faixa = 'azul';
  let multi;

  if (finalDeHora && minutos % 10 === 0) {
    multi = (Math.random() * 10 + 10).toFixed(2); // 10x a 20x
    faixa = multi >= 10 ? 'rosa' : 'roxo';
  } else if (hora >= 12 && hora <= 17) {
    multi = (Math.random() * 5 + 1).toFixed(2); // 1x a 6x
    faixa = multi >= 2 ? 'roxo' : 'azul';
  } else {
    const chance = Math.random();
    if (chance < 0.7) {
      multi = (Math.random() * 1.89 + 1).toFixed(2);
      faixa = 'azul';
    } else if (chance < 0.95) {
      multi = (Math.random() * 7 + 2).toFixed(2);
      faixa = 'roxo';
    } else {
      multi = (Math.random() * 300 + 10).toFixed(2);
      faixa = 'rosa';
    }
  }

  return { multi, faixa };
}

function atualizarRelogio() {
  const agora = new Date();
  agora.setHours(agora.getUTCHours() + 2); // Johannesburg
  const hora = agora.toLocaleTimeString('pt-BR');
  document.getElementById("relogio").textContent = hora;
}

function criarItemHistorico(valor, cor) {
  const item = document.createElement("li");
  item.textContent = valor + "x";
  item.classList.add(cor);
  return item;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnPrever");
  const historico = document.getElementById("listaHistorico");

  if (btn && historico) {
    btn.addEventListener("click", () => {
      btn.disabled = true;
      btn.textContent = "⏳ Processando...";

      setTimeout(() => {
        const { multi, faixa } = gerarMultiplicador();

        // Limpa histórico anterior (deixa só 1)
        historico.innerHTML = "";
        const item = criarItemHistorico(multi, faixa);
        historico.appendChild(item);

        btn.disabled = false;
        btn.textContent = "✈️ Prever próxima rodada";
      }, 500); // 0.5 segundos de delay
    });
  }

  if (document.getElementById("relogio")) {
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
  }
});
