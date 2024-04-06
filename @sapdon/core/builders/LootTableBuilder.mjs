import { BasicBuilder } from "./builder.mjs";

export class LootTableBuilder extends BasicBuilder{
    constructor(name, path){
        super(name, "loot", null);
        this.path = path;
    }
    addWeightedRandomPool(rolls, entries,conditions =[]) {
        if(!this.data.pools) this.data.pools = [];
        this.data.pools.push({
            "conditions":conditions,
            "rolls": rolls,
            "entries": entries
        });
        return this;
    }
    // 添加分层池
    addTieredPool(tiers, entries, conditions =[]) {
        if(!this.data.pools) this.data.pools = [];
        this.pools.push({
            "conditions":conditions,
            "tiers": tiers,
            "entries": entries
        });
        return this;
    }
    // 创建物品条目
    static createItemEntry(name, weight, functions = []) {
        return {
          "type": "item",
          "name": name,
          "weight": weight,
          "functions": functions
        };
    }
    // 创建空条目
    static createEmptyEntry() {
        return {
          "type": "empty",
          "weight": 0
        };
    }
    // 创建条件
    static createCondition(conditionType, conditionData) {
        return {
          "condition": conditionType,
          ...conditionData
        };
    }
    // 创建函数
    static createFunction(functionType, functionData) {
        return {
          "function": functionType,
          ...functionData
        };
    }
    build(){
      return {
        pools:this.data.pools
      };
    }
  }
  /*
  const loot = new LootTableBuilder("aa","./blocks")
  .addWeightedRandomPool(1,[
    LootTableBuilder.createItemEntry("test:item1",1)
    ,
    LootTableBuilder.createItemEntry("test:item2",1)
    ,
    LootTableBuilder.createItemEntry("test:item3",1)
]).build()
console.log(loot)
debugger*/