import { MenuCategory } from "../menu_category";

export class AddonBlock {
    /**
     * Addon方块类
     * @param {string} format_version 格式版本
     * @param {AddonBlockDefinition} definitions 方块定义
     */
    constructor(format_version,definitions){
        this.format_version = format_version;
        this.definitions = definitions;
    }
}

export class AddonBlockDefinition{
    /**
     * 方块定义类
     * @param {AddonBlockDescription} description 方块描述
     * @param {Map} components 方块组件
     */
    constructor(description,components){
        this.description = description;
        this.components = components;
    }
}

export class AddonBlockDescription {
    /**
     * 方块描述类
     * @param {string} identifier 唯一标识符
     * @param {map} states 方块状态
     * @param {MenuCategory} menu_category 
     */
    constructor(identifier,states,menu_category){
        this.identifier = identifier;
        this.states = states;
        this.menu_category = menu_category;
    }
}