import fs, { readFile, readFileSync, readdirSync } from "fs";
import { saveEctype } from "./amb/file.mjs";

//const conext = readFileSync('dist/BP/entities/entity001.json','utf8')
//console.log(conext)


const mcpack_bp_path = "mcpack/beh/entities/"
const mcpack_rp_path = "mcpack/res/entity/"

const files_rp = readdirSync(mcpack_rp_path,'utf8')
const files_bp = readdirSync(mcpack_bp_path,'utf8')


function readFilesInDir(dirPath){
    const data = [];
    const files = readdirSync(dirPath,'utf8');
    for(const file of files){
        const filePath = `${dirPath}/${file}`;
        const fileContent = readFileSync(filePath,"utf8");
        data.push({'file':file,'content':fileContent});
        //console.log(`${file}:${fileContent}`);
        //console.log(typeof(fileContent));
    }
    return data;
}

function transforObject(jsonText){
    const sanitizedJsonText = jsonText.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '')
    .replace(/,(\s*[\]}])/g, '$1');
    console.log(sanitizedJsonText)
    return JSON.parse(sanitizedJsonText);
}

const NativeEntityBeh = {};
const beh_arr = readFilesInDir(mcpack_bp_path);
beh_arr.forEach(({file,content})=>{
    NativeEntityBeh[`minecraft:${file.replace('.json','')}`] = transforObject(content);
})
const NativeEntityBehPath = 'script/amb/data/data_bp.json';
saveEctype(NativeEntityBehPath,JSON.stringify(NativeEntityBeh));

const NativeEntityRes = {};
const res_arr = readFilesInDir(mcpack_rp_path);
res_arr.forEach(({file,content})=>{
    NativeEntityRes[`minecraft:${file.replace('.entity.json','')}`] = transforObject(content);
})
const NativeEntityResPath = 'script/amb/data/data_rp.json';
saveEctype(NativeEntityResPath,JSON.stringify(NativeEntityRes));


console.log(NativeEntityRes)
console.log(NativeEntityBeh)


//debugger