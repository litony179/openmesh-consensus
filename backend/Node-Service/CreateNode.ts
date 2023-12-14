import { v4 as uuidv4 } from "uuid";

class NodeClass {
  NodeHash: String = "";
  UserId: String = "";
  Public_key: String = "";
  DataMajor: String = "";
  CreateDate: String = "";
  ConnectionType: String = "";

  describeNode() {
    console.log(node);
  }

  generateNodeHash() {
    this.NodeHash = uuidv4();
    return this.NodeHash;
  }

  generatePublic_key() {
    this.Public_key = uuidv4();
    return this.Public_key;
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
}

interface NodeBuilderInt {
  SetNodeHash(): void;
  SetUserID(UserId: String): void;
  SetPublickey(): void;
  SetDataMajor(DataMajor: String): void;
  SetCreateDate(): void;
  SetConnectionType(ConnectionType: String): void;

  build(): NodeClass;
}

class NodeBuilder implements NodeBuilderInt {
  private node: NodeClass;

  constructor() {
    this.node = new NodeClass();
  }

  SetNodeHash(): void {
    this.node.generateNodeHash();
  }

  SetUserID(UserId: String): void {
    this.node.UserId = UserId;
  }

  SetPublickey(): void {
    this.node.generatePublic_key();
  }
  SetDataMajor(DataMajor: String): void {
    this.node.DataMajor = DataMajor;
  }

  SetCreateDate(): void {
    this.node.DateCreation();
  }

  SetConnectionType(ConnectionType: String): void {
    this.node.ConnectionType = ConnectionType;
  }

  build(): NodeClass {
    return this.node;
  }
}

let NodeBuilderInt = new NodeBuilder();
// Data inside is hash example
// Randomly generated
NodeBuilderInt.SetNodeHash();
// RawData given from Uploader later
// given from auth
NodeBuilderInt.SetUserID("001");
//randomly generated and given
NodeBuilderInt.SetPublickey();
//Set by user
NodeBuilderInt.SetDataMajor("Health");
//Instantly generated
NodeBuilderInt.SetCreateDate();
//Selected by user
NodeBuilderInt.SetConnectionType("Restful");

let node = NodeBuilderInt.build();
node.describeNode();
