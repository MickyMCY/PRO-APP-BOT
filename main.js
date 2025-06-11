
let historico = [];

function abrirPrevisao(casa) {
    document.getElementById("previsao").classList.remove("hidden");
}

function preverRodada() {
    const btn = document.querySelector('.btn-prever');
    const resultadoEl = document.getElementById("resultado");

    btn.disabled = true;
    resultadoEl.innerHTML = '<span style="color: #aaa;">⏳ Calculando previsão, aguarde...</span>';

    setTimeout(() => {
        const agora = new Date();
        const horaUTC = agora.getUTCHours();
        const horaJoanesburgo = (horaUTC + 2) % 24;
        const minuto = agora.getUTCMinutes();
        const horaDecimal = horaJoanesburgo + minuto / 60;
        const resultado = gerarMultiplicadorAtual(horaDecimal);

        let cor;
        if (resultado.faixa === "azul") cor = "#00BFFF";
        else if (resultado.faixa === "roxo") cor = "#B266FF";
        else cor = "#FF1493";

        const textoResultado = `Resultado previsto: <span style="color:${cor}">${resultado.multiplicador}x</span>`;
        resultadoEl.innerHTML = textoResultado;

        // Som de efeito (requisição simples de áudio)
        const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
        audio.play();

        // Atualiza histórico
        historico.unshift({ mult: resultado.multiplicador, cor });
        if (historico.length > 10) historico.pop();
        atualizarHistorico();

        btn.disabled = false;
    }, 1500); // Delay de simulação
}

function gerarMultiplicadorAtual(hora) {
    const rand = Math.random();
    let faixa;

    if (hora >= 0 && hora < 12) {
        faixa = rand < 0.80 ? "azul" : rand < 0.98 ? "roxo" : "rosa";
    } else if (hora >= 12 && hora < 12.5) {
        faixa = rand < 0.90 ? "azul" : rand < 0.99 ? "roxo" : "rosa";
    } else if (hora % 1 >= 0.5) {
        faixa = rand < 0.60 ? "azul" : rand < 0.90 ? "roxo" : "rosa";
    } else if (hora >= 20 && hora < 24) {
        faixa = rand < 0.40 ? "azul" : rand < 0.85 ? "roxo" : "rosa";
    } else {
        faixa = rand < 0.75 ? "azul" : rand < 0.95 ? "roxo" : "rosa";
    }

    let multiplicador;
    if (faixa === "azul") {
        multiplicador = (1 + Math.random() * 0.99).toFixed(2);
    } else if (faixa === "roxo") {
        multiplicador = (2 + Math.random() * 7.99).toFixed(2);
    } else {
        const chances = Math.random();
        if (chances < 0.90) {
            multiplicador = (10 + Math.random() * 90).toFixed(2);
        } else if (chances < 0.98) {
            multiplicador = (100 + Math.random() * 900).toFixed(2);
        } else {
            multiplicador = (1000 + Math.random() * 7310).toFixed(2);
        }
    }

    return { faixa, multiplicador };
}

function atualizarHistorico() {
    const histDiv = document.getElementById("historico");
    if (!histDiv) return;

    histDiv.innerHTML = "<h3>Histórico de previsões</h3><div class='lista-historico'>" + historico.map(h => 
        `<span style="color:${h.cor}">${h.mult}x</span>`
    ).join(" ") + "</div>";
}
