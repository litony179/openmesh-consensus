import { RawDataFormat } from "../../models/blueprint/raw-data-format";


function checkData(rawData: any): RawDataFormat {
    // rawData -> check Extension -> check Harmful -> convert JSON format-> return

    // 1) check Extensions : JSON? or XML?

    // 2) check Harmful

    // 3) convert JSON format if data is XML?

    return rawData;
};

async function checkDataAsync(rawData: any): Promise<RawDataFormat> {
    // rawData -> check Extension -> check Harmful -> convert JSON format-> return

    // 1) check Extensions : JSON? or XML?

    // 2) check Harmful

    // 3) convert JSON format if data is XML?

    return rawData;
};

export { checkData, checkDataAsync };