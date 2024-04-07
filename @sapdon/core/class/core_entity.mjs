import { Entity, Projectile } from "./Entity.mjs";
import { TestEntity } from "./TestEntity.mjs";

export const EntityAPI = {
    entityList:{},
    getEntityByStrings(name){
        return this.entityList[name];
    },
    getAllEntities(){
        return Object.values(this.entityList);
    },
    createEntity:function(identifier, resourceData, behaviorData, options={}){
        const entity = new Entity(identifier, resourceData, behaviorData, options);
        this.entityList[identifier] = entity;
        return entity;
    },
    /**
     * 用于以原版生物数据创建自定义生物
     * @param {string} identifier 唯一标识符
     * @param {string} template_entity_type 模版生物类型
     * @param {string} texture_path 贴图路径
     * @param {string} basic_option 基础参数
     * @returns TestEntiy类
     */
    createTestEntity:function(identifier,template_entity_type,texture_path,basic_option){
        const entity = new TestEntity(identifier,template_entity_type,texture_path,basic_option);
        this.entityList[identifier] = entity;
        return entity;
    },
    createProjectile:function(identifier, texture, power, gravity, angle_offset, offset){
        const entity = new Projectile(identifier, texture, power, gravity, angle_offset, offset);
        this.entityList[identifier] = entity;
        return entity;
    }
}