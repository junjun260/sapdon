import { Event } from "../objects/Event.mjs";
import { Equipment } from "./Equipment.mjs";


export class Tool extends Equipment {
  blocksDigSpeedList = [];
  constructor(identifier, category, texture, componentsOptions = {}) {
    super(identifier, category, texture, componentsOptions);
    //Tool
    this.setDamage(3);
    this.addToolTag();
    this.setMaxStackSize(1);
    this.setHandEquipped(true);
    this.setMaxDurability(100,1,3);
    this.setCreativeCategory("equipment");
    //默认设置 本身为可修复物品
    this.addRepairableItem(identifier, "context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
  }
  /**
   * 设置单个方块挖掘速度
   * @param {boolean} boolean 如果对该项目施加了效率附魔，是否应该受到影响。
   * @param {string} blockId 方块标识符
   * @param {number} speed 挖掘速度
   */
  setBlockDigSpeed(boolean, blockId, speed) {
    this.blocksDigSpeedList.push(
    {
      "block": blockId,
      "speed": speed,
      "on_dig": {
        "event": "amb:on_tool_used",
        "target": "self"
      }
    });
    this.setDigger(boolean, this.blocksDigSpeedList);
    this.setToolDamage(1);
  }
  /**
   * 设置工具类通用耐久度磨损值
   * @param {number} amount 每次使用工具磨损值
   */
  setToolDamage(amount) {
    this.addEvent("amb:on_tool_used", Event.damage("durability", "self", amount));
  }

  onClickOnUse(event) {
    this.addEvent(`amb:${this.itemName}OnUse`, event);
    this.setOnUse(`amb:${this.itemName}OnUse`, "self");
  }
}


export  class Sword extends Tool{
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt);
      //sword
      this.setDamage(5);
      this.addSwordTag();
      this.setEnchantable("sword",14);
      this.setCanDestroyInCreative(false);
      this.setCreativeCategory("itemGroup.name.sword");
    }
}
//2024.1.18

//2023.8.18   框架
export  class Axe extends Tool{
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt);
      //sword
      this.setDamage(5);
      this.addSwordTag();
      this.setEnchantable("axe",14);
      this.setCanDestroyInCreative(true);
      this.setCreativeCategory("itemGroup.name.axe");
    }
}

export  class Pickaxe extends Tool{
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt);
      //sword
      this.setDamage(5);
      this.addSwordTag();
      this.setEnchantable("pickaxe",14);
      this.setCanDestroyInCreative(true);
      this.setCreativeCategory("itemGroup.name.pickaxe");
    }
  }
