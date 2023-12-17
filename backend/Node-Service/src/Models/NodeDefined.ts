import { v4 as uuidv4 } from "uuid";

export class NodeClass implements NodeBuilderInt {
  NodeHash: String;
  UserId: any;
  Public_key: String = this.generatePublic_key();
  DataMajor: String;
  CreateDate: String = this.DateCreation();
  ConnectionType: String;
  
  constructor(UserId: any, DataMajor: string, ConnectionType: string){
    this.NodeHash = this.generateNodeHash();
    this.UserId = UserId;
    this.Public_key = this.generatePublic_key();
    this.DataMajor = DataMajor;
    this.ConnectionType = ConnectionType;
    this.build();
  }

  describeNode() {
    console.log(this);
  }

  generateNodeHash() {
    return uuidv4();
  }

  generatePublic_key() {
    return uuidv4();  
  }

  DateCreation() {
    let currentDate: Date = new Date();
    let year: number = currentDate.getFullYear();
    let month: number = currentDate.getMonth(); // 0-based (January is 0, February is 1, etc.)
    let day: number = currentDate.getDate();
    let hours: number = currentDate.getHours();
    let minutes: number = currentDate.getMinutes();
    let seconds: number = currentDate.getSeconds();
    this.CreateDate = `${day}-${
      month + 1
    }-${year} ${hours}:${minutes}:${seconds}`;

    return this.CreateDate;
  }

  SetConnectionType(ConnectionType: String): void {
    this.ConnectionType = ConnectionType;
  }

  build(): NodeClass {
    this.NodeHash = this.generateNodeHash(); 
    this.Public_key = this.generatePublic_key();
    return this;
  }
}

export interface NodeBuilderInt {
  SetConnectionType(ConnectionType: String): void;
  build(): NodeClass;
}

// const node = new NodeClass("001_Khalil", "Health", "Restful");
// const node1 = new NodeClass("001_Khalil", "Gaming", "Websocket");
// const node2 = new NodeClass("001_Khalil", "Finance", "Restful");

// node.describeNode();
// node1.describeNode();
// node2.describeNode();