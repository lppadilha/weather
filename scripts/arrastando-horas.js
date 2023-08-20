const horas = document.querySelector('.horas')

var puxando = false, prevPageX, prevScrollLeft

const comecouPuxar = (e) => {
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
}

horas.addEventListener('mousedown', comecouPuxar)
horas.addEventListener('mouseup', parouPuxar)
horas.addEventListener('mouseleave', parouPuxar)
horas.addEventListener('mousemove', movendo)