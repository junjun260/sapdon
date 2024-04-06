import {
    world,
    system,
    ItemStack,
    MolangVariableMap,
    MinecraftEffectTypes,
    MinecraftEntityTypes,
    DynamicPropertiesDefinition
} from "@minecraft/server"

/*作者:爱喝粥的小奔 or [B站]君俊菌啊*/
/*        代码仅供参考           */


//不可捕捉生物 玩家 村民

const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");

//const player = Array.from(overworld.getPlayers())[0];
const uncatchEntities = ["minecraft:player", "minecraft:villager", "minecraft:villager_v2", "minecraft:ender_dragon", "minecraft:wandering_trader"];
//const uncatchEntities = ["minecraft:player", "minecraft:ender_dragon", "minecraft:wandering_trader"];
/*
//工具
//new DelaySystem √ 
function DelaySystem() {
    this.obj = { a: 1, b: 2, c: 3 };
    this.callbacks = {};
    this.registerCallback = function (id, delayTick, callback) {
        this.callbacks[id] = {
            tick: 0,
            delayTick: delayTick,
            callback: callback
        };
    };
    this.delayRun = function (id) {
        let callbackData = this.callbacks[id];
        if (callbackData) {
            callbackData.tick++;
            //world.say("DelaySystem."+id+".tick:"+callbackData.tick);
            let delayTick = callbackData.delayTick;
            let callback = callbackData.callback;
            if (callbackData.tick > delayTick) {
                callback();
                delete this.callbacks[id];
                callbackData.tick = 0;
                //world.say("DelaySystem.tick_End");
            }
        }
        else {
            //world.say("END");
        }
    }
}
var delaySystem = new DelaySystem();
*/

function inList(a, arr) {
    for (let i in arr) {
        if (a == arr[i]) {
            return false;
        }
    }
    return true;
}

world.afterEvents.worldInitialize.subscribe((e) => {
    world.sendMessage("projectileHitEvent.entityHit:");
    let def = new DynamicPropertiesDefinition();
    def.defineBoolean("catchSate");
    def.defineString("pokeEntityId", 16);
    def.defineString("pokeTypeId", 32);
    e.propertyRegistry.registerEntityTypeDynamicProperties(def, MinecraftEntityTypes.player);

    //new DataSystem
    const objectiveId = "DataSystem";
    let stringJsonObj = world.scoreboard.getObjective(objectiveId);
    if (!stringJsonObj) {
        let Data = {};
        let stringData = JSON.stringify(Data);
        world.scoreboard.addObjective(objectiveId, stringData);
    }
});

world.afterEvents.projectileHit.subscribe((projectileHitEvent) => {
    world.sendMessage("projectileHitEvent.entityHit:" + projectileHitEvent.projectile.typeId);
    if (projectileHitEvent.projectile.typeId == "poke:master_ball") {
        if (projectileHitEvent.source && projectileHitEvent.source.typeId == "minecraft:player") {
            //维度信息
            let dimension = projectileHitEvent.dimension;

            let catchSate = projectileHitEvent.source.getDynamicProperty("catchSate");
            if (catchSate) {
                let entityHit = projectileHitEvent.getEntityHit();
                //world.say("projectileHitEvent.entityHit:"+entity.typeId);
                if (entityHit && inList(entityHit.entity.typeId, uncatchEntities)) {
                    let entity = projectileHitEvent.entityHit.entity;
                    //特征数据获取
                    //minecraft:health √
                    let healthComponent = entity.getComponent("minecraft:health");
                    //world.say("EntityHealthComponent:" + healthComponent);
                    //world.say("EntityHealthComponent.current:"+healthComponent.current);
                    //minecraft:is_baby √
                    let entityIsBabyComponent = entity.hasComponent("minecraft:is_baby");
                    //world.say("entityIsBabyComponent:"+entityIsBabyComponent);

                    //minecraft:color √
                    let entityColorComponent = entity.getComponent("minecraft:color");
                    if (entityColorComponent) {
                        //world.say("entityColorComponent(color):" + entityColorComponent.value);
                    }

                    //minecraft:scale √
                    let entityScaleComponent = entity.getComponent("minecraft:scale");
                    if (entityScaleComponent) {
                        //world.say("entityScaleComponent.value:"+entityScaleComponent.value);
                    }

                    //EntityIsTamedComponent  minecraft:is_tamed  √
                    let entityIsTamedComponent = entity.hasComponent("minecraft:is_tamed");
                    //world.say("entityIsTamedComponent:"+entityIsTamedComponent);

                    //EntityItemComponent  minecraft:item ？
                    let entityItemComponent = entity.getComponent("minecraft:item");
                    if (entityItemComponent) {
                        let item = entityItemComponent.itemStack;
                        //world.say("entityItemComponent.item.typeId:"+item.typeId);
                    }

                    //EntityVariantComponent  minecraft:variant  (只读) √
                    let entityVariantComponent = entity.getComponent("minecraft:variant");
                    if (entityVariantComponent) {
                        //world.say("entityVariantComponent.value:"+entityVariantComponent.value);
                    }

                    //EntitySkinIdComponent  minecraft:skin_id √
                    let entitySkinIdComponent = entity.getComponent("minecraft:skin_id");
                    if (entitySkinIdComponent) {
                        //world.say("entitySkinIdComponent.value:"+entitySkinIdComponent.value);
                    }

                    //EntityInventoryComponent  minecraft:inventory √
                    let entityInventoryComponent = entity.getComponent("minecraft:inventory");
                    let containerData = {};
                    if (entityInventoryComponent) {
                        let container = entityInventoryComponent.container;

                        containerData = {
                            size: container.size,
                            emptySlotsCount: container.emptySlotsCount,
                            type: entityInventoryComponent.containerType,
                            items: {}
                        };

                        //world.say("SlotsCount:"+container.emptySlotsCount+"/"+container.size);
                        //world.say("entityInventoryComponent.containerType:"+entityInventoryComponent.containerType);

                        for (let i = 0; i < container.size; i++) {
                            let item = container.getItem(i);
                            if (item) {
                                let itemData = {
                                    slot: i,
                                    amount: item.amount,
                                    data: item.data,
                                    nameTag: item.nameTag,
                                    typeId: item.typeId,
                                    lore: item.getLore()
                                }
                                //world.say("container.getItem["+i+"]"+item.typeId);
                                containerData.items[i] = itemData;
                                //world.say("containerData.items["+i+"]"+containerData.items[i].typeId);
                            }
                        }
                    }

                    //EntityMarkVariantComponent minecraft:mark_variant  √
                    let entityMarkVariantComponent = entity.getComponent("minecraft:mark_variant");
                    if (entityMarkVariantComponent) {
                        //world.say("entityMarkVariantComponent:"+entityMarkVariantComponent.value);
                    }

                    //EntityIsSaddledComponent minecraft:is_saddled √
                    let entityIsSaddledComponent = entity.hasComponent("minecraft:is_saddled");
                    //world.say("entityIsSaddledComponent:"+entityIsSaddledComponent);

                    let characterData = {
                        id: -entity.id,
                        typeId: entity.typeId,
                        name: entity.nameTag,
                        isBaby: entityIsBabyComponent,
                        isTamed: entityIsTamedComponent,
                        isSaddled: entityIsSaddledComponent,
                        skinId: entitySkinIdComponent ? entitySkinIdComponent.value : undefined,
                        variant: entityVariantComponent ? entityVariantComponent.value : undefined,
                        markVariant: entityMarkVariantComponent ? entityMarkVariantComponent.value : undefined,
                        scale: entityScaleComponent ? entityScaleComponent.value : undefined,
                        health: healthComponent ? healthComponent.current : undefined,
                        color: entityColorComponent ? entityColorComponent.value : undefined,
                        container: entityInventoryComponent ? containerData : undefined
                    }

                    let removeLocation = {
                        x: entity.location.x,
                        y: entity.location.y + 9999,
                        z: entity.location.z
                    }
                    let location = { x: entity.location.x, y: entity.location.y, z: entity.location.z };
                    dimension.spawnParticle("poke:shoufu", location, new MolangVariableMap());
                    entity.teleport(removeLocation, the_end, 0, 0);
                    //entity.kill();

                    //生成
                    let master_ball = new ItemStack(Items.get("poke:master_ball"), 1, 0);
                    let loreList = [];
                    loreList.push("id:" + characterData.id);
                    loreList.push("typeId:" + characterData.typeId);
                    loreList.push("health:" + characterData.health);

                    master_ball.setLore(loreList);
                    let name = characterData.name ? characterData.name : characterData.typeId;
                    master_ball.nameTag = "§6大师球(" + name + ")";
                    master_ball.data = 1;
                    let ball = dimension.spawnItem(master_ball, projectileHitEvent.location);
                    //ball.addEffect(MinecraftEffectTypes.fireResistance, 9999, 1, false);

                    //存储特征数据(读)
                    let stringJsonObj = world.scoreboard.getObjective("DataSystem");
                    let stringJson = stringJsonObj.displayName;
                    let objDataSystem = JSON.parse(stringJson);
                    //(改)
                    objDataSystem[characterData.id] = characterData;
                    //(存)
                    let stringData = JSON.stringify(objDataSystem);
                    world.scoreboard.removeObjective("DataSystem");
                    world.scoreboard.addObjective("DataSystem", stringData);
                }
                else {
                    let master_ball = new ItemStack(Items.get("poke:master_ball"), 1, 0);
                    let ball = dimension.spawnItem(master_ball, projectileHitEvent.location);
                    //ball.addEffect(MinecraftEffectTypes.fireResistance, 9999, 1, false);
                }
            }
            else {
                //释放

                let pokeTypeId = projectileHitEvent.source.getDynamicProperty("pokeTypeId");
                let pokeEntityId = projectileHitEvent.source.getDynamicProperty("pokeEntityId");

                let stringJsonObj = world.scoreboard.getObjective("DataSystem");
                let stringJson = stringJsonObj.displayName;
                let objDataSystem = JSON.parse(stringJson);

                let entityData = objDataSystem[pokeEntityId];

                let entity = dimension.spawnEntity(pokeTypeId, projectileHitEvent.location);

                //事件

                //minecraft:entity_born √
                //world.say("isBaby:"+entityData.isBaby);
                if (entityData.isBaby) {
                    let triggerEventName = "minecraft:entity_born";
                    if (entityData.typeId == "minecraft:wolf") {
                        //minecraft:ageable_set_baby
                        triggerEventName = "minecraft:ageable_set_baby";
                    }
                    entity.triggerEvent(triggerEventName);
                    //world.say("triggerEventName:"+triggerEventName);
                }
                else {
                    //minecraft:ageable_grow_up √
                    entity.triggerEvent("minecraft:ageable_grow_up");
                    //world.say("minecraft:ageable_grow_up");
                }

                //EntityIsSaddledComponent minecraft:is_saddled √
                //world.say("entityData.isSaddled:"+entityData.isSaddled);
                if (entityData.isSaddled) {
                    entity.triggerEvent("minecraft:on_saddled");
                    //world.say("minecraft:on_saddled");
                }



                //EntityIsTamedComponent  minecraft:is_tamed  √
                //world.say("entityData.isTamed:"+entityData.isTamed);
                if (entityData.isTamed) {
                    let entityTameableComponent = entity.getComponent("minecraft:tameable");
                    if (entityTameableComponent) {
                        //猫猫 或 狗狗 可以训服的
                        //world.say("entityTameableComponent.probability:"+entityTameableComponent);
                        entityTameableComponent.tame();
                        //world.say("entityTameableComponent.tame:"+entityTameableComponent.tame());
                    }
                    else {
                        //马
                        entity.triggerEvent("minecraft:on_tame");
                        /*delaySystem.registerCallback("on_tame",20,function(){
                            let entityInventoryComponent = entity.getComponent("minecraft:inventory");
                world.say("delaySystem: entityInventoryComponent:"+entityInventoryComponent);
                        });*/
                    }
                }

                //EntityVariantComponent  minecraft:variant(只读不可改)

                //特征属性 延迟执行
                system.runTimeout(() => {
                    //delaySystem.registerCallback('setData', 1, () => {
                    //EntitySkinIdComponent  minecraft:skin_id √
                    if ((entityData.skinId != undefined)) {
                        let entitySkinIdComponent = entity.getComponent("minecraft:skin_id");
                        //world.say("before skinId:"+entitySkinIdComponent.value);
                        //world.say("entityData.skinId:"+entityData.skinId);
                        entitySkinIdComponent.value = entityData.skinId;
                        //world.say("after skinId:"+entitySkinIdComponent.value);
                    }
                    //EntityMarkVariantComponent minecraft:mark_variant √
                    if ((entityData.markVariant != undefined)) {
                        let entityMarkVariantComponent = entity.getComponent("minecraft:mark_variant");
                        //world.say("entityData.markVariant:"+entityData.markVariant);
                        entityMarkVariantComponent.value = entityData.markVariant;
                        //world.say("after skinId:"+entitySkinIdComponent.value);
                    }

                    //minecraft:scale √ 
                    //world.say("entityData.scale:"+entityData.scale);
                    if ((entityData.scale != undefined)) {
                        let entityScaleComponent = entity.getComponent("minecraft:scale");
                        //解决变种问题 熊猫 马等复杂变种 保留生成 不保证变种一致
                        if (entityScaleComponent) {
                            //delaySystem.registerCallback("delaySetScale", 1, function () {
                            //world.say("entityScaleComponent_entity"+entity);
                            //world.say("entityScaleComponent"+entityScaleComponent);
                            //world.say("entityScaleComponent.value:"+entityScaleComponent.value);
                            entityScaleComponent.value = entityData.scale;
                            //});
                        }
                    }

                    //minecraft:health  √
                    if ((entityData.health != undefined)) {
                        let healthComponent = entity.getComponent("minecraft:health");
                        healthComponent.setCurrent(entityData.health);
                    }

                    //minecraft:color  √
                    //world.say("entityData.color:" + entityData.color);
                    if ((entityData.color != undefined)) {
                        let entityColorComponent = entity.getComponent("minecraft:color");
                        //world.say("color:" + entityData.color);
                        entityColorComponent.value = entityData.color;
                    }

                    //EntityInventoryComponent  minecraft:inventory  √
                    let containerData = entityData.container;
                    if (containerData) {
                        //delaySystem.registerCallback("delaySetInventory", 1, function () {
                        let entityInventoryComponent = entity.getComponent("minecraft:inventory");
                        //world.say("delaySystem2: entityInventoryComponent:"+entityInventoryComponent);
                        let container = entityInventoryComponent.container;
                        //world.say("containerData2 :SlotsCount:"+containerData.emptySlotsCount+"/"+containerData.size);
                        if (containerData.size == container.size) {
                            for (let i = 0; i < containerData.size; i++) {
                                let itemData = containerData.items[i];
                                if (itemData) {
                                    let item = new ItemStack(Items.get(itemData.typeId), itemData.amount, itemData.data);
                                    item.nameTag = itemData.nameTag;
                                    item.setLore(itemData.lore);
                                    //world.say("container.getItem["+i+"]"+item.typeId);
                                    container.setItem(i, item);
                                }
                            }
                        }
                        //world.say("container2 :SlotsCount:"+container.emptySlotsCount+"/"+container.size);
                        //});
                    }
                }, 1);
                //});

                let master_ball = new ItemStack(Items.get("poke:master_ball"), 1, 0);

                let ball = dimension.spawnItem(master_ball, projectileHitEvent.location);
                //ball.addEffect(MinecraftEffectTypes.fireResistance, 9999, 1, true);
            }
        }
    }
});

world.afterEvents.itemStartUseOn.subscribe((afterItemUseEvent) => {
    if (afterItemUseEvent.itemStack.typeId == "poke:master_ball") {
        //捕捉状态
        if (!afterItemUseEvent.itemStack.getLore()) {
            afterItemUseEvent.source.setDynamicProperty("catchSate", true);
            world.sendMessage("catchSate = true");
        }
        else {
            afterItemUseEvent.source.setDynamicProperty("catchSate", false);
            //world.say("catchSate = false");
            let lore = beforeItemUseEvent.item.getLore();
            let lore0 = lore[0].substring(3);
            //world.say("lore[0]:"+lore0);
            let lore1 = lore[1].substring(7);
            //world.say("lore[1]:"+lore1);
            afterItemUseEvent.source.setDynamicProperty("pokeEntityId", lore0);
            afterItemUseEvent.source.setDynamicProperty("pokeTypeId", lore1);
        }

    }
});
