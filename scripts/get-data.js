const input = document.querySelector('.procurar input')
const botaoProcurar = document.querySelector('.procurar img')

const apiKey = "1b1e4222cfa54eaf93e01909231208"

var procurou
var ondeEstaClicado = 0
var data

window.onload = function() {
    getData("rio de janeiro")
}

// arrastando 

const horas = document.querySelector('.horas')

var puxando = false, prevPageX, prevScrollLeft

const comecouPuxar = (e) => {
    horas.style.scrollBehavior = "auto"
    puxando = true
    prevPageX = e.pageX
    prevScrollLeft = horas.scrollLeft
}

const movendo = (e) => {
    if (!puxando) return
    e.preventDefault()
    let positionDiff = e.pageX - prevPageX
    horas.scrollLeft = prevScrollLeft - positionDiff
}

const parouPuxar = () => {
    puxando = false
    horas.style.scrollBehavior = "smooth"
}

horas.addEventListener('mousedown', comecouPuxar)
horas.addEventListener('mouseup', parouPuxar)
horas.addEventListener('mouseleave', parouPuxar)
horas.addEventListener('mousemove', movendo)

/// dia

var dia = []
var cima = []

for (var i = 0; i < 3; i++) {
    dia[i] = document.querySelector(`.dia${i}`)
    cima[i] = document.querySelector(`.dia${i} .cima`)
}

const clicouDia = (e) => {
    if (cima[e].classList.contains('clicado')) return

    for (var i = 0; i < 3; i++) {
        if (cima[i].classList.contains('clicado')) {
            cima[i].classList.remove('clicado')
        }
    }

    cima[e].classList.toggle('clicado')
    ondeEstaClicado = e
    setHoras()

    horas.scrollLeft = 0
}

/////

const getData = async (cidade) => {
    if(procurou == cidade) return

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=3&lang=pt`
    
    const res = await fetch(apiUrl)
    data = await res.json()

    procurou = cidade

    //console.log(data)
    setData()
}

/*
current_name - data.location.name
current_temp_c - data.current.temp_c
current_temp_f - data.current.temp_f
current_vento - data.current.wind_kph
current_umidade - data.current.humidity
current_condicao - data.current.condition.text
current_condicao_icon - data.current.condition.icon

forecast_media_c - data.forecast.forecastday[i].day.mintemp_c
forecast_media_c2 - data.forecast.forecastday[i].day.maxtemp_c 
forecast_media_f - data.forecast.forecastday[i].day.maxtemp_f
forecast_media_f2 - data.forecast.forecastday[i].day.mintemp_f
forecast_chuva - data.forecast.forecastday[i].day.daily_chance_of_rain
forecast_condicao = data.forecast.forecastday[i].day.condition.text

forecast_temp_c - data.forecast.forecastday[i].day.avgtemp_c
forecast_temp_f - data.forecast.forecastday[i].day.avgtemp_f
forecast_umidade - data.forecast.forecastday[i].day.avghumidity
forecast_vento - data.forecast.forecastday[i].day.maxwind_kph

data.forecast.forecastday[i].hour[i].time
data.forecast.forecastday[i].hour[i].temp_c
data.forecast.forecastday[i].hour[i].condition.text

var current_name,
    current_vento,
    current_umidade,
    current_chuva,
    current_temp_c

var forecast_dia_mintemp_c,
    forecast_dia_maxtemp_c,
    forecast_dia_condition_text,
    forecast_dia_condition_icon,
    forecast_dia_temp_c,
    forecast_dia_vento,
    forecast_dia_umidade,
    forecast_dia_chuva,
    forecast_dia_sol

var forecast_hora_horario = [[]],
    forecast_hora_temp_c = [[]],
    forecast_hora_condition_icon = [[]]
*/
/*
    current_name = data.location.name
    current_vento = data.current.wind_kph
    current_umidade = data.current.humidity
    current_temp_c = data.current.temp_c

    forecast_dia_mintemp_c[i] = data.forecast.forecastday[i].day.mintemp_c
    forecast_dia_maxtemp_c[i] = data.forecast.forecastday[i].day.maxtemp_c 
    forecast_dia_condition_text[i] = data.forecast.forecastday[i].day.condition.text
    forecast_dia_condition_icon[i] = data.forecast.forecastday[i].day.condition.icon
    forecast_dia_temp_c[i] = data.forecast.forecastday[i].day.avgtemp_c
    forecast_dia_vento[i] = data.forecast.forecastday[i].day.maxwind_kph
    forecast_dia_umidade[i] = data.forecast.forecastday[i].day.avghumidity
    forecast_dia_chuva[i] = data.forecast.forecastday[i].day.daily_chance_of_rain
    forecast_dia_sol[i] = data.forecast.forecastday[i].astro.sunset

    for(var x = 0; x < 3; x++) {
        for(var i = 0; i < 24; i += 2) {
            forecast_hora_horario[x][i] = data.forecast.forecastday[x].hour[i].time
            forecast_hora_temp_c[x][i] = data.forecast.forecastday[x].hour[i].temp_c
            forecast_hora_condition_icon[x][i] = data.forecast.forecastday[x].hour[i].condition.icon
        }
    }
*/

const setData = () => {
    setMain()
    setDia()
    setHoras()
}

const setHoras = () => {
    for(var i = 0; i < 24; i += 2) {
        var horario = data.forecast.forecastday[ondeEstaClicado].hour[i].time.substring(11)
        var turno = false
        if(parseInt(horario) <= 12) turno = false
            else turno = true

        document.querySelector(`.horas .hora${i} #temp`).innerHTML = `${parseInt(data.forecast.forecastday[ondeEstaClicado].hour[i].temp_c)}°C`
        document.querySelector(`.horas .hora${i} img`).src = data.forecast.forecastday[ondeEstaClicado].hour[i].condition.icon
        document.querySelector(`.horas .hora${i} #horario`).innerHTML = horario
        document.querySelector(`.horas .hora${i} #turno`).innerHTML = turno ? "PM" : "AM"
    }
}

const setDia = () => {
    var dataHoje = new Date()
    var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]

    for(var i = 0; i < 3; i++) {
        document.querySelector(`.dia${i} .cima .icone #dia`).innerHTML = semana[dataHoje.getDay() + i]
        document.querySelector(`.dia${i} .cima .icone #icon`).src = data.forecast.forecastday[i].day.condition.icon
        document.querySelector(`.dia${i} .cima #temp`).innerHTML = `${parseInt(data.forecast.forecastday[i].day.avgtemp_c)}°C`
        document.querySelector(`.dia${i} .cima #descricao`).innerHTML = data.forecast.forecastday[i].day.condition.text

        document.querySelector(`.dia${i} .baixo .dados #vento`).innerHTML = `${parseInt(data.forecast.forecastday[i].day.maxwind_kph)} km/h`
        document.querySelector(`.dia${i} .baixo .dados #umidade`).innerHTML = `${data.forecast.forecastday[i].day.avghumidity}%`
        document.querySelector(`.dia${i} .baixo .dados #chuva`).innerHTML = `${data.forecast.forecastday[i].day.daily_chance_of_rain}%`
    }
}

const setMain = () => {
    
    // Esquerda - Cima
    document.querySelector('.esquerda #cidade').innerHTML = data.location.name
    document.querySelector('.esquerda #data').innerHTML = `${pegarData('semana')}, ${pegarData('dia')} de ${pegarData('mes')}, ${pegarData('ano')}`

    // Esquerda - Detalhes
    document.querySelector('.esquerda .vento .dados #valor').innerHTML = `${parseInt(data.current.wind_kph)} km/h`
    document.querySelector('.esquerda .umidade .dados #valor').innerHTML = `${data.current.humidity}%`
    document.querySelector('.esquerda .prob-de-chuva .dados #valor').innerHTML = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`
    document.querySelector('.esquerda .por-do-sol .dados #valor').innerHTML = data.forecast.forecastday[0].astro.sunset

    // Direita
    //document.querySelector('.direita img').src = data.current.condition.icon
    document.querySelector('.direita .dados #temp').innerHTML = `${parseInt(data.current.temp_c)}°C`
    document.querySelector('.direita .dados #media').innerHTML = `${parseInt(data.forecast.forecastday[0].day.mintemp_c)}°C - ${parseInt(data.forecast.forecastday[0].day.maxtemp_c)}°C`
    document.querySelector('.direita .dados #descricao').innerHTML = data.current.condition.text
}

// Eventos

botaoProcurar.addEventListener('click', (e) => {
    const cidade = input.value
    getData(cidade)
})

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const cidade = input.value
        getData(cidade)
    }
})


// Funcões

const pegarData = (data) => {
    var dataHoje = new Date()

    var semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    var mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    switch(data) {
        case "semana": data = semana[dataHoje.getDay()]
            break
        case "dia": data = dataHoje.getDate()
            break
        case "mes": data = mes[dataHoje.getMonth()]
            break
        case "ano": data = dataHoje.getFullYear()
    }

    return data
}