import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { TicketController } from "../models/ticket-controller"

const ticketController = new TicketController()

const socketController = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    console.log("cliente conectado", socket.id)
    socket.on("disconnect", () => {
      console.log("cliente desconectado", socket.id)
    })
    socket.on("send-message", (payload, callback) => {
      const id = new Date().getTime().toString()
      callback(id)
      socket.broadcast.emit("respond-msg", payload)
    })
  }

  export {
    socketController
  }