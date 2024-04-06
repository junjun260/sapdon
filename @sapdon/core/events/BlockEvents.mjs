let event = {
    //播放项摆动动画  无
    "swing": {},
    //射击组件
    "shoot": {
        "projectile": "minecraft:snowball",//发射的生物任何
        "launch_power": 5,//力度
        "angle_offset": 20//角度偏移
    },
    //伤害组件
    "damage": {
        "type": "magic",//伤害类型
        "target": "other",//伤害目标
        "amount": 4//伤害大小
    },
    //是否在创造模式下递减
    "decrement_stack": {
        "ignore_game_mode": false
    },
    //给予目标药水效果
    "add_mob_effect": {
        "effect": "poison",
        "target": "holder",
        "duration": 8,
        "amplifier": 3
    },
    //
    "remove_mob_effect": {
        "effect": "poison",
        "target": "holder"
    },
    //
    "transform_item": {
        "transform": "minecraft:apple"
    },
    //随机传送
    "teleport": {
        "target": "holder",
        "max_range": [8, 8, 8]
    },
    //序列化  
    "sequence": [
        {
            "add_mob_effect": {
                "effect": "poison",
                "target": "holder",
                "duration": 8,
                "amplifier": 3
            }
        },
        {
            "transform_item": {
                "transform": "minecraft:apple"
            }
        }
    ],
    
    "randomize": [
        {
            "weight": 1,
            "transform_item": {
                "transform": "minecraft:apple"
            }
        },
        {
            "weight": 2,
            "add_mob_effect": {
                "effect": "weakness",
                "target": "holder",
                "duration": 8,
                "amplifier": 3
            }
        }
    ],
    
    "run_command": {
        "command": ["say hi"],
        "target": "other"
    }

}


//Event对象用于返回Event组件
export const BlockEvent = {
    setBlockState:function(blockState,value){
        return {
            "set_block_state": {
                [blockState]:value
            }
        }
    },
    damage:function(type,target,amount){
        const damage_event = {
            "damage": {
                "target": target,//伤害目标
                "type":type,
                "amount": amount//伤害大小
            }
        };
        return damage_event;
    },
    addMobEffect:function(effect,target,duration,amplifier) {
        const effect_event ={
            "add_mob_effect": {
                "effect": effect,
                "target": target,
                "duration": duration,
                "amplifier": amplifier
            }
        }
        return effect_event;
    },
    shoot:function(projectile,launch_power,angle_offset){
        const shoot_event = {
            "shoot": {
                "projectile": projectile,//发射的生物任何
                "launch_power": launch_power,//力度
                "angle_offset": angle_offset//角度偏移
            }
        }
        return shoot_event;
    },
    transformItem:function(itemId){
        const transform_item_event ={
            "transform_item": {
                "transform":itemId
            }
        }
        return transform_item_event;
    },
    teleport:function(target,sx,sy,sz){
        const teleport_event ={
            "teleport": {
                "target": target,
                "max_range": [sx, sy, sz]
            }
        };
        return teleport_event;
    },
    runCommand:function(commandArr,target){
        const run_command_event ={
            "run_command": {
                "command":commandArr,
                "target": target
            }
        }
        return run_command_event;
    },
    sequence:{
        add:function(condition,event){
            return {
                "sequence": event
            }
        },
    }
};