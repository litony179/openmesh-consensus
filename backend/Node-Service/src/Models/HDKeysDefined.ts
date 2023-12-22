import * as HDKey from "hdkey";
import * as crypto from "crypto";

// Defines the Node class that is in charge of creating the outline for the node and its data and function
export class HDNodesys {
    seed: any;
    hdkey: any;

  constructor() {
    this.seed = crypto.randomBytes(32);
    this.hdkey = HDKey.fromMasterSeed(this.seed);
    this.build();
  }

  describeHDsys() {
    console.log(this);
  }

  createchildkey(){
    
  }

  build(): HDNodesys {
    return this;
  }
}

const MasterKey = new HDNodesys();
console.log(MasterKey);
