class NodeClass {
    NodeHash: String = "";
    UserId: String = "";
    Public_key: String = "";
    DataMajor: String = "";
    CreateDate: String = "";
    ConnectionType: Boolean = false;

    describeNode(){
        console.log("NodeHash: " + this.NodeHash);
        console.log("UserId: " + this.UserId);
        console.log("Public_key: " + this.Public_key);
        console.log("DataMajor: " + this.DataMajor);
        console.log("CreateDate: " + this.CreateDate);
        console.log("ConnectionType: " + this.ConnectionType);

        console.log(node);
    }

    generateNodeHash(){
        // generate random hash
    }
}

interface NodeBuilderInt{
    SetNodeHash(NodeHash: String): void;
    SetUserID(UserId: String): void;
    SetPublickey(Public_key: String): void;
    SetDataMajor(DataMajor: String): void;
    SetCreateDate(CreateDate: String): void;
    SetConnectionType(ConnectionType: boolean): void;

    build(): NodeClass;
}

class NodeBuilder implements NodeBuilderInt{
    private node: NodeClass;

    constructor(){
        this.node = new NodeClass;
    }

    SetNodeHash(NodeHash: String): void {
        this.node.NodeHash = NodeHash;   
    }

    SetUserID(UserId: String): void{
        this.node.UserId = UserId;
    }

    SetPublickey(Public_key: String): void{
        this.node.Public_key = Public_key;
    }
    SetDataMajor(DataMajor: String): void{
        this.node.DataMajor = DataMajor;
    }

    SetCreateDate(CreateDate: String): void{
        this.node.CreateDate = CreateDate;
    }

    SetConnectionType(ConnectionType: boolean): void{
        this.node.ConnectionType = ConnectionType;
    }


    build(): NodeClass{
        return this.node;
    }
}

let NodeBuilderInt = new NodeBuilder();
// Data inside is hash example
// Randomly generated
NodeBuilderInt.SetNodeHash("AX3");
// RawData given from Uploader later
// given from auth
NodeBuilderInt.SetUserID("001");
//randomly generated and given
NodeBuilderInt.SetPublickey("XXA#@25jkXD");
//Set by user
NodeBuilderInt.SetDataMajor("Health");
//Instantly generated
NodeBuilderInt.SetCreateDate("02/03/2023");
//Selected by user
NodeBuilderInt.SetConnectionType(true);


let node = NodeBuilderInt.build();
node.describeNode();

