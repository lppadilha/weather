const input = document.querySelector('.procurar input')
const botaoProcurar = document.querySelector('.procurar img')

const apiKey = "1b1e4222cfa54eaf93e01909231208"

const getData = async (cidade) => {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=3&lang=pt`
    
    const res = await fetch(apiUrl)
    const data = await res.json()

    console.log(data)
}  

botaoProcurar.addEventListener('click', (e) => {
    const cidade = input.value
    getData(cidade)
})