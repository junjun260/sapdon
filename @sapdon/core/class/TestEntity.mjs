import { EntityBehData, EntityResData } from "./Data.mjs";
import { NativeEntityData } from "./NativeEntiyData.mjs";

export class TestEntity {
    constructor(identifier,templateEntityType,basic_option){
        this.identifier = identifier;
        this.templateEntityType = templateEntityType;
        this.basic_option = basic_option;

        const beh = NativeEntityData.getDataById('beh',templateEntityType);
        const res = NativeEntityData.getDataById('res',templateEntityType);

        this.behavior = new EntityBehData(beh["format_version"],beh["minecraft:entity"]);
        this.resource = new EntityResData(res["format_version"],res["minecraft:client_entity"]);

        this.behavior.setDescription('identifier',identifier);
        this.behavior.setDescription("runtime_identifier",templateEntityType);
        this.resource.setDescriptionElement('identifier',identifier);
    }
}