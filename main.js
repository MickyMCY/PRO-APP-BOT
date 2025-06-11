/*  =============================
    Aviator Predictor – lógica JS
    ============================= */

// -------- utilidades de data/hora em Johannesburg (UTC+2) --------
function agoraJoburg() {
  // converte o horário local do navegador para Africa/Johannesburg
  const local = new Date();
  const joburgStr = local.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' });
  return new Date(joburgStr);
}
function formatarHora(dt) {
  return dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// --------- geração de multiplicadores seguindo sua regra ----------
const historico = [];
let cicloBaixosRestantes = 0; // controla 3–4 baixos antes de pagar alto (parte final do horário)

function gerarMultiplicador() {
  const agora = agoraJoburg();
  const min   = agora.getMinutes();
  const sec   = agora.getSeconds();

  let minimo = 1.00, maximo = 6.68; // default (primeiros 10 min)
  let chanceMuitoAlta = 0;          // prob. de 100x+

  if (min >= 10 && min < 30) {
    // “miolo” da hora – roxo moderado, mas ainda tímido
    minimo = 1.00;
    maximo = 9.98;
  } else if (min >= 30 && min < 40) {
    // preparação: 3–4 baixos (1.00‑1.89) e depois paga
    if (cicloBaixosRestantes === 0) {
      cicloBaixosRestantes = 3 + Math.floor(Math.random() * 2); // 3 ou 4
    }
    if (cicloBaixosRestantes > 0) {
      cicloBaixosRestantes--;
      minimo = 1.00;
      maximo = 1.89;
    } else {
      minimo = 2.00;
      maximo = 25.00;
      chanceMuitoAlta = 0.03; // 3 % de chance de 100x+
    }
  } else if (min >= 40) {
    // últimos 20 min – época de “pagar” melhor
    minimo = 2.00;
    maximo = 30.00;
    chanceMuitoAlta = 0.05; // 5 % de chance de 100x+
  }

  //  chance rara de super payout (rosa escuro) – 10x a 8 301x
  if (Math.random() < chanceMuitoAlta) {
    const rosas = [15, 20, 25, 40, 100, 300, 800]; // exemplos, 300x é raríssimo
    const base  = rosas[Math.floor(Math.random() * rosas.length)];
    const decim = Math.random().toFixed(2).slice(2);  // garante casas decimais variadas
    return parseFloat(${base}.${decim});
  }

  //  número “normal” dentro do intervalo escolhido
  const valor = (Math.random() * (maximo - minimo) + minimo);
  return parseFloat(valor.toFixed(2));
}

// ------------ DOM & interação -----------------
const btnsCasa = document.querySelectorAll(".casa");
const home     = document.getElementById("home");
const painel   = document.getElementById("painel");
const nomeCasa = document.getElementById("nomeCasa");
const relogio  = document.getElementById("relogio");
const btnPrev  = document.getElementById("btnPrever");
const ulHist   = document.getElementById("listaHistorico");
const btnVoltar= document.getElementById("voltar");

// troca de tela
btnsCasa.forEach(btn => {
  btn.addEventListener("click", () => {
    nomeCasa.textContent = btn.textContent;
    home.classList.add("hidden");
    painel.classList.remove("hidden");
  });
});
btnVoltar.addEventListener("click", () => {
  painel.classList.add("hidden");
  home.classList.remove("hidden");
});

// relógio em tempo real
setInterval(() => {
  relogio.textContent = formatarHora(agoraJoburg());
}, 1000);

// clique no botão “Prever próxima rodada”
btnPrev.addEventListener("click", () => {
  const mult = gerarMultiplicador();
  const cor  = mult >= 10 ? "rosa" : (mult >= 2 ? "roxo" : "azul");
  const hora = formatarHora(agoraJoburg());

  // guarda no início do histórico
  historico.unshift({ hora, mult, cor });
  if (historico.length > 100) historico.pop(); // limita a 100 itens para não pesar

  renderHistorico();
});

// desenha o histórico na tela
function renderHistorico() {
  ulHist.innerHTML = ""; // limpa
  historico.forEach(item => {
    const li   = document.createElement("li");
    li.className = "itemHist";

    const icone = document.createElement("i");
    icone.className = "fa-solid fa-circle";
    icone.style.color = (item.cor === "azul" ? "var(--azul)" :
                         item.cor === "roxo" ? "var(--roxo)" :
                         "var(--rosa)");

    const multSpan = document.createElement("span");
    multSpan.className = "multiplicador";
    multSpan.textContent = item.mult.toFixed(2) + "x";

    const horaSpan = document.createElement("span");
    horaSpan.className = "hora";
    horaSpan.textContent = item.hora;

    li.appendChild(icone);
    li.appendChild(multSpan);
    li.appendChild(horaSpan);
    ulHist.appendChild(li);
  });
}

// exibe algo para o usuário ver logo de cara
renderHistorico();
