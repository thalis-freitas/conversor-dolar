let data = document.getElementById("data")
let dataAtual = new Date()

// Formatação as datas para que sejam passadas em português
var dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

var meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
]

let diaSemana = dias[dataAtual.getDay()]
let diaMes = dataAtual.getDate()
let mes = meses[dataAtual.getMonth()]
let ano = dataAtual.getFullYear()
let horas = dataAtual.getHours()
let minutos = dataAtual.getMinutes()

if (minutos < 10) minutos = "0" + minutos
if (minutos == 0) minutos = "00"
if (horas < 10 && horas > 0) horas = "0" + horas
if (horas == 0) horas = "00"
if (diaMes < 10) diaMes = "0" + diaMes

data.innerHTML = ` ${diaSemana}, ${diaMes} de ${mes} de ${ano}, ${horas}:${minutos}`

// link para receber o valor atualizado do dolar
let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL"

let dolarHoje = document.getElementById("dolar-hoje")

// função para mostrar o valor atual do dolar sempre que a página for atualizada 
onload = () => {

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((dados) => {
            let respostaDolar = (dados.USDBRL.ask)
            let dolar = parseFloat(respostaDolar).toFixed(2)
            dolarHoje.innerHTML = `Dolar hoje = R$${dolar}`
        })
}

function converterParaReal() {

    let inputDolar = document.getElementById("input-dolar")
    let valor = inputDolar.value

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((dados) => {
            let respostaDolar = (dados.USDBRL.ask)
            let dolar = parseFloat(respostaDolar).toFixed(2)

            let resultado = document.getElementById("resultado-real")
            let valorConvertido = valor * dolar

            if (valor <= 0) {
                alert("Por favor insira um valor positivo para realizar a conversão")
            }
            else {
                conteudoResultado = ` $${valor} = R$${(valorConvertido).toFixed(2)}`
                resultado.innerHTML = conteudoResultado
            }
        }
        )
}

function converterParaDolar() {

    let inputReal = document.getElementById("input-real")
    let valor = inputReal.value

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((dados) => {
            let respostaDolar = (dados.USDBRL.ask)
            let dolar = parseFloat(respostaDolar).toFixed(2)

            let resultado = document.getElementById("resultado-dolar")
            let valorConvertido = valor / dolar

            if (valor <= 0) {
                alert("Por favor insira um valor positivo para realizar a conversão")
            } else {
                conteudoResultado = `R$${valor} = $${(valorConvertido).toFixed(2)}`
                resultado.innerHTML = conteudoResultado
            }
        }
        )

}

let btnConverterParaReal = document.getElementById("converter-para-real")
btnConverterParaReal.addEventListener("click", converterParaReal)

let btnConverterParaDolar = document.getElementById("converter-para-dolar")
btnConverterParaDolar.addEventListener("click", converterParaDolar)
