import { Block } from "./Block.mjs";
import { CropBlock } from "./CropBlock.mjs";
import {TileBlock} from "./TileBlock.mjs";
import { TreeBlock } from "./TreeBlock.mjs";

export const BlockAPI = {
    blockList:{},
    getBlockByStrings(name){
        return this.itemList[name];
    },
    getAllBlocks(){
        return Object.values(this.blockList);
    },
    createBlock:function(identifier,category,variantDatas){
        const block = new Block(identifier, category, variantDatas);
        this.blockList[identifier] = block;
        return block;
    },
    createTileBlock:function(identifier,category,variantDatas){
        const block = new TileBlock(identifier,category,variantDatas);
        this.blockList[identifier] = block;
        return block;
    },
    createCropBlock:function(identifier,category,variantDatas){
        const block = new CropBlock(identifier,category,variantDatas);
        this.blockList[identifier] = block;
        return block;
    },
    createTreeBlock:function(identifier,category,variantDatas){
        const block = new TreeBlock(identifier,category,variantDatas);
        this.blockList[identifier] = block;
        return block;
    },
}