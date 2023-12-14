import crypto from 'crypto'
import { Product, RawDataFormat } from './raw-data-format';

// post -> check -> 'encrypt' -> save

// JSON : String data format converted from Object type
function encryptDataToString(chckData: RawDataFormat) {
    // parameter is trustful because already parsed in checking process by checkData function.
    var productArr = chckData.products;
    // // 1) find "products" in JSON object
    // if (Array.isArray(productArr) && productArr.length !== 0) {
    //     // 2) encrypt "products" name & value
    //     productArr.forEach((product:Product) => {
    //         product.name = crypto.createHash('sha256')
    //                                     .update(product.name)
    //                                     .digest('hex');
    //         console.log(product.name);
    //         product.value = crypto.createHash('sha256')
    //                                     .update(`${product.value}`)
    //                                     .digest('hex');
    //         console.log(product.value);
    //     })
        
    // } else {// if products are empty = problem, if products are not Array = problem
    //     console.log("!!The input data is not array or array is empty!!")
    // }

    // 1) find "products" in JSON object
    if (Array.isArray(productArr)) {
        if (productArr.length === 0) { // if products are empty === problem
            console.log("!! The input data is invalid: The fake contract recorded !!");
        } else {
            // 2) encrypt "products" name & value
            productArr.forEach((product:Product) => {
                product.name = crypto.createHash('sha256')
                                        .update(product.name)
                                        .digest('hex');
                console.log(product.name);
                product.value = crypto.createHash('sha256')
                                        .update(`${product.value}`)
                                        .digest('hex');
                console.log(product.value);
            })

            // 3) stringify JSON object; object -> string
            var encryptedJSON = JSON.stringify(chckData);
            // 4) encrypt again.
            encryptedJSON = crypto.createHash('sha256')
                                    .update(encryptedJSON)
                                    .digest('hex');
            console.log(encryptedJSON);
            
            return encryptedJSON;
        }
    }else { // if products are not Array === problem
        console.log("!! The input data is not Array !!");
    }
}

function encryptDataToJSON(chckData: RawDataFormat) {
    // parameter is trustful because already parsed in checking process by checkData function.
    var productArr = chckData.products;

    // 1) find "products" in JSON object
    if (Array.isArray(productArr)) {
        if (productArr.length === 0) { // if products are empty === problem
            console.log("!! The input data is invalid: The fake contract recorded !!");
        } else {
            // 2) encrypt "products" name & value
            productArr.forEach((product:Product) => {
                product.name = crypto.createHash('sha256')
                                        .update(product.name)
                                        .digest('hex');
                console.log(product.name);
                product.value = crypto.createHash('sha256')
                                        .update(`${product.value}`)
                                        .digest('hex');
                console.log(product.value);
            })

            
            // 3) encrypt other values
            chckData.id = crypto.createHash('sha256').update(chckData.id).digest('hex');
            chckData.type = crypto.createHash('sha256').update(chckData.type).digest('hex');
            chckData.createdDate = crypto.createHash('sha256').update(`${chckData.createdDate}`).digest('hex');
            chckData.buyer = crypto.createHash('sha256').update(chckData.buyer).digest('hex');
            chckData.seller = crypto.createHash('sha256').update(chckData.seller).digest('hex');
            chckData.method = crypto.createHash('sha256').update(chckData.method).digest('hex');
            chckData.payment = crypto.createHash('sha256').update(`${chckData.payment}`).digest('hex');

            return chckData;
        }
    }else { // if products are not Array === problem
        console.log("!! The input data is not Array !!");
    }
}