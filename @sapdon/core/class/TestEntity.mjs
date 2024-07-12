import { EntityBehavoirBuilder } from "../builders/EntityBehaviorBuilder.mjs";
import { EntityResorceBuilder } from "../builders/EntityResourceBuilder.mjs";
import { EntityComponents } from "../components/EntityComponents.mjs";
import { NativeEntityData } from "./NativeEntiyData.mjs";


export class TestEntity {
    constructor(identifier,templateEntityType,texture,basic_option){
        this.identifier = identifier;
        this.templateEntityType = templateEntityType;
        this.basic_option = basic_option;

        const beh = NativeEntityData.getDataById('beh',templateEntityType);
        const res = NativeEntityData.getDataById('res',templateEntityType);

        this.behavior = new EntityBehavoirBuilder(identifier,beh["format_version"],beh["minecraft:entity"]);
        this.resource = new EntityResorceBuilder(identifier,res["format_version"],res["minecraft:client_entity"]);
        
        this.behavior.setRuntimeIdentifier(templateEntityType);
        this.resource.setTextures("default",texture);
    }
    setGeometry(name,geometry){
        this.resource.setGeometry(name,geometry);
        return this;
    }
    setTextures(name,texture){
        this.resource.setTextures(name,texture);
        return this;
    }
    setLootTable(loot){
        this.behavior.addComponent(EntityComponents.loot(loot));
        return this;
    }
}