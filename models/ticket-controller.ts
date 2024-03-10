import path from "path";
import data from "../db/data.json"
import {writeFileSync} from "fs"

export class TicketController {
  private last: number;
  private date: number;
  private tickets: number[];
  private lastTickets: number[];

  constructor() {
    this.last = 0;
    this.date = new Date().getDate();
    this.tickets = [];
    this.lastTickets = [];

    this.init()
  }
  private get toJson() {
    return {
      last: this.last,
      date: this.date,
      tickets: this.tickets,
      lastTickets: this.lastTickets,
    };
  }
  private init(){
    const {last, lastTickets, date, tickets} = data
    if(date === this.date) {
        this.last = last
        this.lastTickets = lastTickets
        this.tickets = tickets
    } else {
        this.saveDataToDb()
    }
    console.log(data)
  }
  saveDataToDb(){
    const dbPath = path.join(__dirname, "../db/data.json")
    writeFileSync(dbPath, JSON.stringify(this.toJson))
  }
}
