import { readFileSync } from "fs"

export class NativeEntityData{
    static behData  = JSON.parse(readFileSync('core/data/data_bp.json','utf8'));
    static resData  = JSON.parse(readFileSync('core/data/data_rp.json','utf8'));
    static getDataById(type,id){
        if(type == 'beh'){
            return this.behData[id];
        }
        return this.resData[id];
    }
}