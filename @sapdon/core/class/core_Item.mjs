
import { Boots, Chestplate, Helmet, Leggings } from "./Armor.mjs";
import { Equipment } from "./Equipment.mjs";
import { Food } from "./Food.mjs";
import { Item } from "../class/Item.mjs"

export const ItemAPI = {
    itemList:{},
    getItemByStrings(name){
        return this.itemList[name];
    },
    getAllItems(){
        return Object.values(this.itemList);
    },
    /**
     * 创建基础物品
     * @param {string} identifier 物品唯一标识符 如"sapdon:item"
     * @param {string} category 分类 item equipment none等
     * @param {string} texture 贴图短名称
     * @param {Object} parameters 
     * @returns {Item}
     */
    createItem:function(identifier,category,texture,parameters){
        const item = new Item(identifier,category,texture,parameters);
        this.itemList[identifier] = item;
        return item;
    },
    createFoodItem:function(identifier,category,texture,parameters){
        const item = new Food(identifier,category,texture,parameters);
        this.itemList[identifier] = item;
        return item;
    },
    createEquipmentItem:function(identifier,category,texture,parameters){
        const item = new Equipment(identifier,category,texture,parameters);
        this.itemList[identifier] = item;
        return item;
    },
    createArmorItem:function(type,identifier,category,texture,aromr_texture,parameters){
        switch(type){
            case "Chestplate":{
                const item = new Chestplate(identifier,category,texture,aromr_texture,parameters);
                this.itemList[identifier] = item;
                return item;
            }
            case "Helmet":{
                const item = new Helmet(identifier,category,texture,aromr_texture,parameters);
                this.itemList[identifier] = item;
                return item;
            }
            case "Leggings":{
                const item = new Leggings(identifier,category,texture,aromr_texture,parameters);
                this.itemList[identifier] = item;
                return item;
            }
            case "Boots":{
                const item = new Boots(identifier,category,texture,aromr_texture,parameters);
                this.itemList[identifier] = item;
                return item;
            }
        }
        
    },
}

/*
const item = ItemAPI.creatItem("test:item","item","template_item",{"foil":true});
      item.setMaxStackSize(1);

const food = ItemAPI.creatFoodItem("test:food","item","template_food",{"foil":true});
      food.setMaxStackSize(1);

const sword = ItemAPI.creatEquipmentItem("test:sword","item","template_food",{"foil":true});
      sword.setMaxStackSize(1);
      sword.addEvent("amb:test",{});

const chest = ItemAPI.creatArmorItem("Chestplate","test:chest","equipment","template_chest","textures/models/armor/test_armor_1",{"foil":true});
const helmet = ItemAPI.creatArmorItem("Helmet","test:helmet","equipment","template_helmet","textures/models/armor/test_armor_1",{"foil":true});
const leggings = ItemAPI.creatArmorItem("Leggings","test:leggings","equipment","template_leggings","textures/models/armor/test_armor_2",{"foil":true});
const boots = ItemAPI.creatArmorItem("Boots","test:boots","equipment","template_boots","textures/models/armor/test_armor_1",{"foil":true});



ItemAPI.getAllItems().forEach((item)=>{
    createItemFile(item);
});

console.log(ItemAPI);
   debugger*/