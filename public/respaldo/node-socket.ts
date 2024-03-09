const connected    = document.querySelector(".text-success")
const disconnected = document.querySelector(".text-danger")
const textMensaje  =  document.querySelector("#textMensaje")
const btnEnviar    =  document.querySelector("#btnEnviar")
const mensajes = document.querySelector(".mensajes")


// @ts-ignore
const socket = io()
socket.on( 'connect', () => {
    disconnected?.setAttribute("style", "display:none")
    connected?.setAttribute("style", "")
})
socket.on('disconnect', () => {
    disconnected?.setAttribute("style", "")
    connected?.setAttribute("style", "display:none")
})
socket.on('respond-msg', (payload: any) => {
    const p = document.createElement("p")
    p.innerText = payload.msg
    mensajes?.appendChild(p)
})
btnEnviar?.addEventListener("click", () => {
    //@ts-ignore
    const msg = textMensaje?.value
    const payload = {
        msg,
        id: "_123456HSJJSK",
        date: new Date().getTime()
    }
    socket.emit( 'send-message', payload, (id: string) => {
        console.log("desde el server", id)
    })
})