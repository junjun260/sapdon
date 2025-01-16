import { BasicBlock } from "../block/block.js";


export const BlockAPI = {
    _blockList:[],
    registerBlock: function(item) {
        this._blockList.push(item);
    },
    getAllBlocks: function(){
        return [...this._blockList];
    },
    /**
     * 基础方块类
     * @param {string} identifier 方块唯一标识符
     * @param {string} category 菜单栏分类 可选："construction", "nature", "equipment", "items", and "none"
     * @param {Array} textures_arr 纹理数组 [上,下,东,西,南,北]
     * @param {Object} options 可选参数
     * @param {string} options.group 分组，默认为 "construction"
     * @param {boolean} options.hide_in_command 是否在命令中隐藏，默认为 false
     */
    createBasicBlock: function(identifier, category, textures_arr, options = {}){
        const block = new BasicBlock(identifier, category, textures_arr, options);
        this.registerBlock(block);
        return block;
    }
}

