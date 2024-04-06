//Items 1.16.100+
export var ItemComponents = {
    glint:function(boolean){
        return {"minecraft:glint": boolean}
    },
    display_name:function(string){
        return {
            "minecraft:display_name": {
                "value": string
              },
        };
    },
    on_use:function(event,target){
        return {
            "minecraft:on_use": {
                "on_use": {
                  "event": event,
                  "target": target
                }
            }
        };
    },
    cooldown:function(category,duration){
        return {
            "minecraft:cooldown": {
                "category":category, // May be a custom string, as to disable the large, white cooldown bar on multiple cooldown items
                "duration": duration
            }
        };
    },

    food:function(){
        return {
            "minecraft:food": {
                "on_consume": {
                    "event": "example_event",
                    "target": "holder" // Can also be 'self' to trigger an item event
                },
                "nutrition": 3,
                "can_always_eat": true,
                "saturation_modifier": "normal", // Can also be a float value. 
                "using_converts_to": "minecraft:apple" // Changes the food or drink into another item when consumed. It can be changed to any item.
            }
        };
    },
    
    use_animation:function(animation){
        return {
            "minecraft:use_animation": animation
        };
    },
    use_duration:function(number){
        return {
            "minecraft:use_duration": number
        };
    },
    max_stack_size:function(number){
        return {
            "minecraft:max_stack_size": number
        };
    },
    foil:function(boolean){
        return {
            "minecraft:foil": boolean
        };
    },
    icon:function(texture){
        return {
            "minecraft:icon": {
                "texture": texture
            }
        };
    },
    ignores_permission: function(boolean) {
        return {
            "minecraft:ignores_permission": boolean 
        };
    },
    mining_speed: function(speed) {
        return {
            "minecraft:mining_speed": speed
        };
    },
    damage: function(value) {
        return { 
            "minecraft:damage": value 
        };
    },
    can_destroy_in_creative: function(boolean) {
        return {
            "minecraft:can_destroy_in_creative": boolean 
        };
    },
    dye_powder: function(color) {
        return { 
            "minecraft:dye_powder": {
                "color": color 
            } 
        };
    },
    mirrored_art: function(boolean) {
        return { 
            "minecraft:mirrored_art": boolean 
        };
    },
    explodable: function(boolean) {
        return { 
            "minecraft:explodable": boolean 
        };
    },
    should_despawn: function(boolean) {
        return { 
            "minecraft:should_despawn": boolean 
        };
    },
    liquid_clipped: function(boolean) {
        return { 
            "minecraft:liquid_clipped": boolean 
        };
    },
    allow_off_hand: function(boolean) {
        return { 
            "minecraft:allow_off_hand": boolean 
        };
    },
    projectile: function(entity, minPower) {
        return { 
            "minecraft:projectile": { 
                "projectile_entity": entity, 
                "minimum_critical_power": minPower 
            } 
        };
    },
    block_placer: function(block, useBlockDescription) {
        return { 
            "minecraft:block_placer": { 
                "block": block, 
                "use_block_description": useBlockDescription 
            } 
        };
    },
    interact_button: function(buttonText) {
        return { 
            "minecraft:interact_button": buttonText 
        };
    },
    hand_equipped: function(boolean) {
        return { 
            "minecraft:hand_equipped": boolean 
        };
    },
    stacked_by_data: function(boolean) {
        return { 
            "minecraft:stacked_by_data": boolean 
        };
    },
    chargeable: function(movementModifier, event, target) {
        return { 
            "minecraft:chargeable": { 
                "movement_modifier": movementModifier, 
                "on_complete": { 
                    "event": event, 
                    "target": target 
                } 
            } 
        };
    },
    hover_text_color: function(color) {
        return { 
            "minecraft:hover_text_color": color 
        };
    },
    entity_placer: function(entity, useOn, dispenseOn) {
        return { 
            "minecraft:entity_placer": { 
                "entity": entity, 
                "use_on": useOn, 
                "dispense_on": dispenseOn 
            } 
        };
    },
    on_use_on: function(event, target) {
        return { 
            "minecraft:on_use_on": { 
                "on_use_on": { 
                    "event": event, 
                    "target": target 
                } 
            } 
        };
    },
    knockback_resistance: function(protection) {
        return { 
            "minecraft:knockback_resistance": { 
                "protection": protection 
            } 
        };
    },
    enchantable: function(slot, value) {
        return { 
            "minecraft:enchantable": { 
                "slot": slot, 
                "value": value 
            } 
        };
    },
    shooter: function(maxDrawDuration, chargeOnDraw, scalePowerByDrawDuration, ammunition) {
        return { 
            "minecraft:shooter": { 
                "max_draw_duration": maxDrawDuration, 
                "charge_on_draw": chargeOnDraw,
                "scale_power_by_draw_duration": scalePowerByDrawDuration, 
                "ammunition": ammunition   
            } 
        };
    },
    durability: function(maxDurability, minDamage, maxDamage) {
        return {
            "minecraft:durability": {
                "max_durability": maxDurability,
                "damage_chance": {
                "min": minDamage,
                "max": maxDamage
                }
            }
        };
    },
    armor: function(protection, textureType) {
        return {
            "minecraft:armor": {
                "protection": protection,
                "texture_type": textureType
            }
        };
    },
    wearable: function(dispensable, slot) {
        return {
            "minecraft:wearable": {
                "dispensable": dispensable,
                "slot": slot
            }
        };
    },
    record: function(soundEvent, duration, comparatorSignal) {
        return {
            "minecraft:record": {
                "sound_event": soundEvent,
                "duration": duration,
                "comparator_signal": comparatorSignal
            }
        };
    },
    repairable: function(repairItems) {
        return {
            "minecraft:repairable": {
                "repair_items": repairItems
            }
        };
    },
    cooldown: function(category, duration) {
        return {
            "minecraft:cooldown": {
                "category": category,
                "duration": duration
            }
        };
    },
    digger: function(useEfficiency, destroySpeeds) {
        return {
            "minecraft:digger": {
                "use_efficiency": useEfficiency,
                "destroy_speeds": destroySpeeds
            }
        };
    },
    fertilizer: function(type) {
        return {
            "minecraft:fertilizer": {
                "type": type
            }
        };
    },
    throwable: function(doSwingAnimation, maxDrawDuration, scalePowerByDrawDuration) {
        return {
            "minecraft:throwable": {
                "do_swing_animation": doSwingAnimation,
                "max_draw_duration": maxDrawDuration,
                "scale_power_by_draw_duration": scalePowerByDrawDuration
            }
        };
    },
    creative_category: function(parent) {
        return {
            "minecraft:creative_category": {
                "parent": parent
            }
        };
    },
    food: function(onConsume) {
        return {
            "minecraft:food": {
                "on_consume": onConsume
            }
        };
    }
};

