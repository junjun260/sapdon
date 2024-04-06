
import { Item } from "./Item.mjs";
/**
 * 食物类，继承自稳定版物品类
 */
export class Food extends Item {
    nutrition = 0;
    canAlwaysEat = false;
    saturationModifier = "normal";
    effects = [];

  /**
   * 构造函数
   * @param {string} identifier 物品的 ID
   * @param {string} category 物品的分类
   * @param {string} textuer 物品的贴图
   * @param {Object} componentsOpt 物品的行为组件
   */
  constructor(identifier, category, textuer, componentsOptions = {}) {
    super(identifier, category, textuer, componentsOptions);

    // 设置食物的默认属性
    this.setUseDuration(32);
    this.setNutrition(4);
    this.setCanAlwaysEat(false);
    this.setSaturationModifier('low');
  }
  /**
   * 添加药水效果
   * @param {效果名称} name 
   * @param {*} chance 
   * @param {*} duration 
   * @param {*} amplifier 
   */
  addEffect(name,chance,duration,amplifier) {
    const effect = {
        "name": name,
        "chance": chance,
        "duration": duration,
        "amplifier": amplifier
    };
    this.effects.push(effect);
  }

  addEffects(effects){
    this.effects.concat(effects);
  }

  /**
   * 设置食物是否可以在任何情况下都能食用
   * @param {boolean} boolean 食物是否可以在任何情况下都能食用
   */
  setCanAlwaysEat(boolean) {
    this.canAlwaysEat = boolean;
  }

  /**
   * 设置食物提供的饱食度
   * @param {number} number 食物提供的饱食度
   */
  setNutrition(number) {
   this.nutrition = number;
  }

  /**
   * 设置食物的饱和度修正值
   * @param {string} string 饱和度修正值
   */
  setSaturationModifier(string) {
    this.saturationModifier = string;
  }
}
