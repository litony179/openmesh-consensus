import crypto from 'crypto'
// post -> check -> 'encrypt' -> save

// JSON : String data format converted from Object type
function encryptDataAsString(chckData: object){
    // parameter is trustful because already parsed in checking process by checkData function.

    // 1) find "items" key in JSON object

    // 2) encrypt "items" values

    // 3) serialize JSON object; object -> string

    // 4) encrypt again.

};

function encryptDataAsJSON(chckData: object) {
    // parameter is trustful because already parsed in checking process by checkData function.

    // 1) find "items" key in JSON object.

    // 2) encrypt "items" values

    // 3) encrypt other values
}