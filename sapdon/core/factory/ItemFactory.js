//函数工厂
export const Item = {
    _itemList: [],
    registerItem: function(item) {
        this._itemList.push(item);
    },
    getAllItems: function() {
        return [...this._itemList];
    }
}
