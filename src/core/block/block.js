import { BasicBlock } from "./BasicBlock";

export class Block extends BasicBlock{
    constructor(identifier, category, variantDatas, options = {}){
        super(identifier, category, ["none"], options);
        this.init(variantDatas);
    }
    init(variantDatas){
        this.registerState("sapdon:block_variant_tag",{
            "values": { "min": 0, "max": variantDatas.length>1?variantDatas.length-1:1 } 
        });

    }
}

const variantDatas = [];
const textures_arr = [];

for(let i =0;i<16;i++){
    variantDatas.push({
        stateTag:i,
        textures:textures_arr[i]
    });
}

const block = new Block("sapdon:block","construction",[
    {stateTag:1,textures:["garlic_stage_0"]},
    {stateTag:1,textures:["garlic_stage_1"]},
    {stateTag:1,textures:["garlic_stage_2"]},
    {stateTag:1,textures:["garlic_stage_3"]},
]);