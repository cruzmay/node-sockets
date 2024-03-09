import express, { Express } from "express";
import cors from "cors";
import socketServer from "http"
import { Server as SocketServer } from "socket.io"
import { eventTypes } from "../interfaces/eventsTypes";
import { socketController } from "../sockets";


export class Server {
  private app: Express;
  private port: string | undefined;
  public server: socketServer.Server<typeof socketServer.IncomingMessage, typeof socketServer.ServerResponse>;
  public io;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = socketServer.createServer(this.app)
    this.io = new SocketServer(this.server)

    this.middlewares();
    this.routes();
    this.socket()
  }

  private middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }
  public routes() {
    // this.app.use(this.paths.user, userRouter);
  }
  public socket(){
    this.io.on("connection", socketController)
  }
  public listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}
