import { ItemBuilder } from "../builders/ItemBuilder.mjs";

//稳定版api
export class Item {
  /**
   * 构造函数
   * @param {string} identifier 物品的 ID
   * @param {string} category 物品的分类
   * @param {string} texture 物品的贴图
   * @param {Object} componentsOpt 物品的行为组件
   */
  constructor(identifier, category, texture, componentsOptions = {}) {
    this.behData = new ItemBuilder(identifier,"1.10.0").setCategory(category);
    this.behData.tags.push("beh");
    this.resData = new ItemBuilder(identifier,"1.10.0");
    this.resData.tags.push("res");
    this.resData.addComponent({"minecraft:icon": texture});

    this.identifier = identifier;
    this.category = category;
    this.texture = texture;

    this.componentsOptions = componentsOptions;
    this.components = [];
  }

  addComponent(component){
    this.components.push(component);
    this.behData.addComponent(component);
  }

  setBlockPlacer(blockId, alowBlocks) {
    this.addComponent({
      "minecraft:block_placer": {
        "block": blockId,
        "use_on": alowBlocks
      }
    });
  }

  /**
   * 设置物品是否可以被附魔
   * @param {boolean} boolean 物品是否可以被附魔
   */
  setFoil(boolean) {
    this.addComponent({
      "minecraft:foil": boolean
    });
  }

  /**
   * 设置物品的最大耐久度
   * @param {number} number 物品的最大耐久度
   */
  setMaxDamage(number) {
    this.addComponent({
      "minecraft:max_damage": number
    });
  }

  /**
   * 设置物品是否可以堆叠
   * @param {boolean} boolean 物品是否可以堆叠
   */
  setStackedByData(boolean) {
    this.addComponent({ "minecraft:stacked_by_data": boolean });
  }

  /**
   * 设置物品的最大堆叠数量
   * @param {number} number 物品的最大堆叠数量
   */
  setMaxStackSize(number) {
    this.addComponent({ "minecraft:max_stack_size": number });
  }

  /**
   * 设置物品使用的持续时间
   * @param {number} number 物品使用的持续时间
   */
  setUseDuration(number) {
    this.addComponent({ "minecraft:use_duration": number });
  }
}