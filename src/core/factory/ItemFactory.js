import { Item } from "../item/Item.js";

//函数工厂
export const ItemAPI = {
    _itemList: [],
    registerItem: function(item) {
        this._itemList.push(item);
    },
    getAllItems: function() {
        return [...this._itemList];
    },
    createItem:function(identifier,category, texture, options = {}){
        const item = new Item(identifier,category, texture,options);
        this.registerItem(item)
        return item;
    }
}
