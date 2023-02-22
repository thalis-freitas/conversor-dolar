'use strict'

let date = document.getElementById('date')
let currentDate = new Date()
let days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
              'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
let weekday = days[currentDate.getDay()]
let monthday = currentDate.getDate()
let month = months[currentDate.getMonth()]
let year = currentDate.getFullYear()
let hours = currentDate.getHours()
let minutes = currentDate.getMinutes()

if (minutes < 10) minutes = '0' + minutes
if (hours < 10) hours = '0' + hours
if (monthday < 10) monthday = '0' + monthday
date.innerHTML = `${weekday}, ${monthday} de ${month} de ${year}, ${hours}:${minutes}`

let url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL'
let dollarToday = document.getElementById('dollar-today')
let dollar = new Number

fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        dollar = parseFloat(data.USDBRL.ask).toFixed(2)
        dollarToday.innerHTML = `Dólar hoje = R$${dollar}`
    })
    .catch(() => {  
        dollarToday.innerHTML = `Ops, ocorreu um erro...`}
    )

document.querySelector('#convert-to-real').addEventListener('click', ()=>{ 
    let valor = document.getElementById('input-dollar').value
    let resultado = document.getElementById('real-result')
    if (valor <= 0) {
        alert('Por favor insira um valor positivo para converter')
    }else {
        resultado.innerHTML = ` $${valor} = R$${(valor * dollar).toFixed(2)}`
    }
})

document.querySelector('#convert-to-dollar').addEventListener('click', ()=>{
    let valor = document.getElementById('input-real').value
    let resultado = document.getElementById('dollar-result')
    if (valor <= 0) {
        alert('Por favor insira um valor positivo para converter')
    } else {
        resultado.innerHTML = `R$${valor} = $${(valor / dollar).toFixed(2)}`
    }
})