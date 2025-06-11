function gerarMultiplicador() {
  const agora = new Date();
  const hora = agora.getUTCHours() + 2; // Fuso horário de Johannesburg (UTC+2)
  const minutos = agora.getUTCMinutes();

  const minutosNoPeriodo = hora * 60 + minutos;
  const finalDeHora = minutos >= 30;

  let faixa = 'azul'; // Default
  let multi;

  // Lógica de distribuição por hora e minutos
  if (finalDeHora && minutos % 10 === 0) {
    multi = (Math.random() * 10 + 10).toFixed(2); // 10x a 20x
    faixa = multi >= 10 ? 'rosa' : 'roxo';
  } else if (hora >= 12 && hora <= 17) {
    multi = (Math.random() * 5 + 1).toFixed(2); // 1x a 6x
    faixa = multi >= 2 ? 'roxo' : 'azul';
  } else {
    const chance = Math.random();
    if (chance < 0.7) {
      multi = (Math.random() * 1.89 + 1).toFixed(2); // 1x a 2.89x
      faixa = 'azul';
    } else if (chance < 0.95) {
      multi = (Math.random() * 7 + 2).toFixed(2); // 2x a 9x
      faixa = 'roxo';
    } else {
      multi = (Math.random() * 300 + 10).toFixed(2); // 10x a 310x (raro)
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
      const { multi, faixa } = gerarMultiplicador();
      const item = criarItemHistorico(multi, faixa);
      historico.prepend(item);
    });
  }

  if (document.getElementById("relogio")) {
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
  }
});