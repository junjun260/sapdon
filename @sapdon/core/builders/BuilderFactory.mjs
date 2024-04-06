import { ItemBuilder } from "./ItemBuilder.mjs"
import { BlockBuilder } from "./BlockBuilder.mjs"
import { BrewingBuilder } from "./BrewingBuilder.mjs";
import { EntityBehavoirBuilder } from "./EntityBehaviorBuilder.mjs";
import { EntityResorceBuilder } from "./EntityResourceBuilder.mjs";
import { SingleBlockFeature } from "./SingleBlockFeature.mjs";
import { OreFeatureBuilder } from "./OreFeatureBuilder.mjs";
SingleBlockFeature
OreFeatureBuilder

export class BuilderFactory{
    static createItemBuilder(name, version, data){
        return new ItemBuilder(name, version, data);
    }
    static createBlockBuilder(name, version, data){
        return new BlockBuilder(name, version, data);
    }
    static createBrewingBuilder(name, version, data){
        return new BrewingBuilder(name, version, data);
    }
    static createEntityBehavoirBuilder(name, version, data){
        return new EntityBehavoirBuilder(name, version, data);
    }
    static createEntityResorceBuilder(name, lable,version, data){
        return new EntityResorceBuilder(name, lable,version, data);
    }

    static createEntityResorceBuilder(name, lable,version, data){
        return new EntityResorceBuilder(name, lable,version, data);
    }static createEntityResorceBuilder(name, lable,version, data){
        return new EntityResorceBuilder(name, lable,version, data);
    }static createEntityResorceBuilder(name, lable,version, data){
        return new EntityResorceBuilder(name, lable,version, data);
    }static createEntityResorceBuilder(name, lable,version, data){
        return new EntityResorceBuilder(name, lable,version, data);
    }
}