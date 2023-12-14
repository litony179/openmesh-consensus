export interface CheckData {
    (rawData: any) : undefined;
}

export interface EncryptData {
    (chckData: undefined) : undefined;
}

export interface SaveData {
    (encData: undefined) : void;
}

export interface LoadData {
    (whose:string, reqData: string) : any;
}