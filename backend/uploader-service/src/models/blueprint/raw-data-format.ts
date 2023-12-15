import { Schema } from "mongoose";

interface Header {
    id: Schema.Types.UUID;
    type: string;
    createdDate: Date;
}

interface Product {
    productName: string,
    value: string | number
}

interface Body {
    buyer: string;
    seller: string;
    products: Array<Product>;
    method: string;
    payment: number | string;
}

// interface RawDataFormat {
//     id : Schema.Types.UUID;
//     type : string;
//     createdDate: Date;
//     buyer : string;
//     seller : string;
//     products : Array<Product>;
//     method : string;
//     payment : number | string;
// }

// interface RawDataFormat {
//     header: {
//         id : Schema.Types.UUID;
//         type : string;
//         createdDate: Date;
//     },
//     body: {
//         buyer : string;
//         seller : string;
//         products : [
//             {
//                 productName: string,
//                 value: number | string
//             }
//         ];
//         method : string;
//         payment : number | string;
//     }
// }

interface RawDataFormat {
    header: Header;
    body: Body;
}

// export { Product, RawDataFormat }
// export { RawDataFormat };
export { Header, Body, Product, RawDataFormat };