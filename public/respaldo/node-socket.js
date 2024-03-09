var connected = document.querySelector(".text-success");
var disconnected = document.querySelector(".text-danger");
var textMensaje = document.querySelector("#textMensaje");
var btnEnviar = document.querySelector("#btnEnviar");
var mensajes = document.querySelector(".mensajes");
// @ts-ignore
var socket = io();
socket.on('connect', function () {
    disconnected === null || disconnected === void 0 ? void 0 : disconnected.setAttribute("style", "display:none");
    connected === null || connected === void 0 ? void 0 : connected.setAttribute("style", "");
});
socket.on('disconnect', function () {
    disconnected === null || disconnected === void 0 ? void 0 : disconnected.setAttribute("style", "");
    connected === null || connected === void 0 ? void 0 : connected.setAttribute("style", "display:none");
});
socket.on('respond-msg', function (payload) {
    var p = document.createElement("p");
    p.innerText = payload.msg;
    mensajes === null || mensajes === void 0 ? void 0 : mensajes.appendChild(p);
});
btnEnviar === null || btnEnviar === void 0 ? void 0 : btnEnviar.addEventListener("click", function () {
    //@ts-ignore
    var msg = textMensaje === null || textMensaje === void 0 ? void 0 : textMensaje.value;
    var payload = {
        msg: msg,
        id: "_123456HSJJSK",
        date: new Date().getTime()
    };
    socket.emit('send-message', payload, function (id) {
        console.log("desde el server", id);
    });
});
