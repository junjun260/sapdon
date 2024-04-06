import { Entity, Projectile } from "./Entity.mjs";

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
    createProjectile:function(identifier, texture, power, gravity, angle_offset, offset){
        const entity = new Projectile(identifier, texture, power, gravity, angle_offset, offset);
        this.entityList[identifier] = entity;
        return entity;
    }
}