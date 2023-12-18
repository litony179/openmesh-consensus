import crypto from 'crypto';

async function hashNupdate(param: string): Promise<string> {
    try {
        param = crypto.createHash('sha256').update(param).digest('hex');
    } catch (error) {
        console.log(error);
    }
    return param
}

export { hashNupdate };