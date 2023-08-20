const botao = []
var ativado = []
ativado[0] = false
ativado[1] = false

for (var i = 0; i < 2; i++) {
    botao[i] = document.querySelector(`.botao${i}`)
}

function clicouBotao(e) {
    if (ativado[e]) {
        botao[e].style.justifyContent = "left"
    } else {
        botao[e].style.justifyContent = "right"
    }

    ativado[e] ? ativado[e] = false : ativado[e] = true
}