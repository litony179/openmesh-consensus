import { UUID } from "crypto";

interface Product {
    name : string,
    value : string | number
}

interface RawDataFormat {
    id : UUID | string;
    type : string;
    createdDate: Date | string;
    buyer : string;
    seller : string;
    products : Array<Product>;
    method : string;
    payment : number | string;
}

export { Product, RawDataFormat }