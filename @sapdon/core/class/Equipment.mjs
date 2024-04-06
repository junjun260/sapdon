import { ItemBuilder } from "../builders/ItemBuilder.mjs";
import { ItemComponents } from "../components/ItemComponents.mjs";


export class Equipment{
    constructor(identifier, category, texture, componentsOptions = {}) {
        this.behData = new ItemBuilder(identifier,"1.16.100").setCategory(category);
        this.behData.addComponent(ItemComponents.icon(texture));

        this.identifier = identifier;
        this.category = category;
        this.texture = texture;
        this.componentsOptions = componentsOptions;
        this.itemName = identifier.slice(':')[1];

        this.tags = [];
        this.events = [];
        this.components = [];
        this.repairableItemList = [];

        this.setComponentsOptions(componentsOptions);
    }

    addComponet(component){
        this.components.push(component);
        this.behData.addComponent(component);
        return this;
    }

    setComponentsOptions(componentsOptions) {
      const defaultComponents = {
        "foil": false,
        "max_stack_size": 64,
        "use_duration": 0,
        "allow_off_hand": false,
        "hand_equipped": false,
        ...componentsOptions
      };
      Object.entries(defaultComponents).forEach(([key,value])=>{
          this.components.push({[`minecraft:${key}`]:value});
        }, {});
        return this;
    }
    setItemName(string){
        this.itemName = string;
        const options = ItemComponents.display_name(string);
        this.addComponet(options);
    }
    setGlint(boolean){
        const options = ItemComponents.glint(boolean);
        this.addComponet(options);
        return this;
    }
    setMaxStackSize(number) {
        const options = ItemComponents.max_stack_size(number);
        this.addComponet(options);
        return this;
    }
    
    setUseDuration(number) {
        const options = ItemComponents.use_duration(number);
        this.addComponet(options);
        return this;
    }
    
    allowOffHand(boolean) {
        const options = ItemComponents.allow_off_hand(boolean);
        this.addComponet(options);
        return this;
    }
    setHandEquipped(boolean) {
        const options = ItemComponents.hand_equipped(boolean);
        this.addComponet(options);
        return this;
    }
   
    setDamage(number) {
        const options = ItemComponents.damage(number);
        this.addComponet(options);
        return this;
    }
    setHoverTextColor(string) {
        const options = ItemComponents.hover_text_color(string);
        this.addComponet(options);
        return this;
    }
    setCanDestroyInCreative(boolean) {
        const options = ItemComponents.can_destroy_in_creative(boolean);
        this.addComponet(options);
        return this;
    }
    setMaxDurability(maxDurability, minDamage, maxDamage) {
        const options = ItemComponents.durability(maxDurability, minDamage, maxDamage);
        this.addComponet(options);
        return this;
    }
    //以上是基础方法
    setCreativeCategory(string) {
        const options = ItemComponents.creative_category(string);
        this.addComponet(options);
        return this;
    }
    
    setBlockPlacer(blockId, alowBlocks) {
        const options = ItemComponents.block_placer(blockId, alowBlocks);
        this.addComponet(options);
        return this;
    }
    
    setEntityPlacer(entityId, alowBlocks, disBlock) {
        const options = ItemComponents.entity_placer(entityId,alowBlocks,disBlock);
        this.addComponet(options);
        return this;
    }
    
    setWearable(dispensable,slot) {
        const options = ItemComponents.wearable(dispensable,slot);
        this.addComponet(options);
        return this;
    }
    
    setThrowable(do_swing_animation,max_draw_duration,scale_power_by_draw_duration) {
        const options = ItemComponents.throwable(do_swing_animation,max_draw_duration,scale_power_by_draw_duration);
        this.addComponet(options);
        return this;
    }
    setProjectile(power, entityId) {
        const options = ItemComponents.projectile(entityId,power);
        this.addComponet(options);
        return this;
    }
    
    setShooter(charge_on_draw, launch_power_scale, max_draw_duration, max_launch_power, scale_power_by_draw_duration, ammunition) {
        const options = ItemComponents.shooter(charge_on_draw, launch_power_scale, max_draw_duration, max_launch_power, scale_power_by_draw_duration, ammunition);
        this.addComponet(options);
        return this;
      }

    setDyePowder(color) {
        const options = ItemComponents.dye_powder(color);
        this.addComponet(options);
        return this;
    }
    
    setKnockbackResistance(protection) {
        const options = ItemComponents.knockback_resistance(protection);
        this.addComponet(options);
        return this;
    }
    
    setEnchantable(slot, value) {
        const options = ItemComponents.enchantable(slot,value);
        this.addComponet(options);
        return this;
    }
    
    setArmor(protection) {
        const options = ItemComponents.armor(protection);
        this.addComponet(options);
        return this;
    }
    
    setRecord(sound,duration,comparatorSignal) {
        const options = ItemComponents.record(sound,duration,comparatorSignal);
        this.addComponet(options);
        return this;
      }
    
    setDigger(use_efficiency, arr) {
        const options = ItemComponents.digger(use_efficiency,arr);
        this.addComponet(options);
        return this;
    }
    
    setRepairable(arr) {
        const options = ItemComponents.repairable(arr);
        this.addComponet(options);
        return this;
    }
    
    setOnUse(event, target) {
        const options = ItemComponents.on_use(event, target);
        this.addComponet(options);
        return this;
    }
    
    setOnUseOn(event, target) {
        const options = ItemComponents.on_use_on(event, target);
        this.addComponet(options);
        return this;
      }
    

    // 添加标签
    addTag(tag) {
        this.tags.push(tag);
        return this;
    }
  
    // 添加常见标签
    addSwordTag() {
      this.addTag('minecraft:is_sword');
      return this;
    }
  
    addToolTag() {
      this.addTag('minecraft:is_tool');
      return this;
    }
  
    addAxeTag() {
      this.addTag('minecraft:is_axe');
      return this;
    }
  
    // 添加事件
    addEvent(eventName, eventConext) {
      const event = {[eventName]: eventConext};
      this.events.push(event);
      this.behData.addEvent(event);
      return this;
    }

    /**
     * 添加可修复物品列表
     * @param {Array} itemsList 可修复物品列表
     * @param {string|molang} repair_amount 修复值表达式
     */
    addRepairableItemsList(itemsList, repair_amount) {
      this.repairableItemList.push(
      {
        "items": itemsList,
        "repair_amount": repair_amount
      });
      return this;
    }
    /**
     * 添加单个可修复物品
     * @param {string} itemId 物品标识符
     * @param {number|molang} repair_amount  修复值表达式
     */
    addRepairableItem(itemId, repair_amount) {
      this.repairableItemList.push(
      {
        "items": [itemId],
        "repair_amount": repair_amount
      });
      return this;
    }
  }
