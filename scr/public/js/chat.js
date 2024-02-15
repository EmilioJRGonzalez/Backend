
const socket = io()

socket.on('MensajesDelChat', (data)=>{
    //console.log(data)
    render(data)
    let chat = document.getElementById('caja')
    chat.scrollTop = chat.scrollHeight
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus();
})

const render = (data)=>{
    let html = data.map(element =>{
        return(
            `<div>
                <strong> ${element.nombre}</strong>
                <em> ${element.texto}</em>
            </div>`
        )
    }).join(' ')

    document.getElementById('caja').innerHTML = html

}

const addMessage = () =>{
    const msj = {
        nombre: document.getElementById('nombre').value,
        texto: document.getElementById('texto').value
    }
    //console.log(msj)

    socket.emit('MensajeNuevo', msj)

    return false
}