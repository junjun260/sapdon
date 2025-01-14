import { Block } from "../addon/block/Block"

export const BlockAPI = {
    _blockList:[],
    getAllBlocks: function(){
        return [...this._blockList];
    },
    createBlock: function(){
        const block = new Block();
        this._blockList.push(block);
        return block;
    }
}