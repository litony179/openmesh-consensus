import crypto from 'crypto'
import { hashNupdate } from './utils/hashNupdate';
import { Body, Product, RawDataFormat } from '../../models/blueprint/raw-data-format';

// post -> check -> 'encrypt' -> save

// JSON : String data format converted from Object type
function encryptDataToString(chckData: RawDataFormat) {
    // parameter is trustful because already parsed in checking process by checkData function.
    var productArr = chckData.body.products;
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
            productArr.forEach((product: Product) => {
                product.productName = crypto.createHash('sha256')
                    .update(product.productName)
                    .digest('hex');
                console.log(product.productName);
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
    } else { // if products are not Array === problem
        console.log("!! The input data is not Array !!");
    }
}

function encryptDataToJSON(chckData: RawDataFormat) {
    // parameter is trustful because already parsed in checking process by checkData function.
    var productArr = chckData.body.products;

    // 1) find "products" in JSON object
    if (Array.isArray(productArr)) {
        if (productArr.length === 0) { // if products are empty === problem
            console.log("!! The input data is invalid: The fake contract recorded !!");
        } else {
            // 2) encrypt "products" name & value
            productArr.forEach((product: Product) => {
                product.productName = crypto.createHash('sha256')
                    .update(product.productName)
                    .digest('hex');
                console.log(product.productName);
                product.value = crypto.createHash('sha256')
                    .update(`${product.value}`)
                    .digest('hex');
                console.log(product.value);
            })


            // 3) encrypt other values
            chckData.body.buyer = crypto.createHash('sha256').update(chckData.body.buyer).digest('hex');
            chckData.body.seller = crypto.createHash('sha256').update(chckData.body.seller).digest('hex');
            chckData.body.method = crypto.createHash('sha256').update(chckData.body.method).digest('hex');
            chckData.body.payment = crypto.createHash('sha256').update(`${chckData.body.payment}`).digest('hex');

            return chckData;
        }
    } else { // if products are not Array === problem
        console.log("!! The input data is not Array !!");
    }
}

// JSON : String data format converted from Object type
async function encryptDataToStringAsync(chckData: RawDataFormat) {
    // parameter is trustful because already parsed in checking process by checkData function.
    var productArr = chckData.body.products;

    try {
        // 1) find "products" in JSON object
        if (Array.isArray(productArr)) {
            if (productArr.length === 0) { // if products are empty === problem
                throw new Error("The products are empty!");
            } else {
                // 2) encrypt "products" name & value
                //  2-1) Use Promise.all + map(async function);
                await Promise.all([
                    productArr.map(async (p) => {
                        p.productName = await hashNupdate(p.productName);
                        p.value = await hashNupdate(String(p.value));
                    })
                ]);

                // 3) stringify JSON object; object -> string -> encrypt
                const encrypted = await hashNupdate(JSON.stringify(chckData.body));

                return encrypted;
            }
        } else { // if products are not Array === problem
            throw new TypeError("The products are not Array!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function encryptDataToJSONAsync(chckData: RawDataFormat) {
    // parameter is trustful because already parsed in checking process by checkData function.
    var productArr = chckData.body.products;

    try {
        // 1) find "products" in JSON object
        if (Array.isArray(productArr)) {
            if (productArr.length === 0) { // if products are empty === problem
                throw new Error("The products are empty!");
            } else {
                // 2) encrypt "products" name & value
                //  2-1) Use Promise.all + map(async function);
                await Promise.all([
                    productArr.map(async (p) => {
                        p.productName = await hashNupdate(p.productName);
                        p.value = await hashNupdate(String(p.value));
                    })
                ]);

                // 3) encrypt other values
                //  3-1) repetitive activities = function
                //  3-2) concern creating function for concurrency
                await Promise.all([
                    chckData.body.buyer = await hashNupdate(chckData.body.buyer),
                    chckData.body.seller = await hashNupdate(chckData.body.seller),
                    chckData.body.method = await hashNupdate(chckData.body.method),
                    chckData.body.payment = await hashNupdate(String(chckData.body.payment))
                ]);

                return chckData;
            }
        } else { // if products are not Array === problem
            throw new TypeError("The products are not Array!");
        }
    } catch (error) {
        console.log(error);
    }
}

export { encryptDataToJSON, encryptDataToString, encryptDataToJSONAsync, encryptDataToStringAsync };