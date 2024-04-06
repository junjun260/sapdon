
export var EntityComponents = {
    behavior:{
        random_stroll:function(priority,speed_multiplier){
            return {
                "minecraft:behavior.random_stroll": {
                    "priority": priority,
                    "speed_multiplier": speed_multiplier
                },
            }
        },

        random_look_around:function(priority){
            return {
                "minecraft:behavior.random_look_around": {
                    "priority": priority
                },
            }
        },

        look_at_player:function(priority,look_distance,probability){
            return {
                "minecraft:behavior.look_at_player": {
                    "priority": priority,
                    "look_distance": look_distance,
                    "probability": probability
                },
            }
        },
        
        hurt_by_target:function(priority){
            return {
                "minecraft:behavior.hurt_by_target": {
                    "priority": priority
                },
            }
        },
        
        nearest_attackable_target:function(priority,within_radius,reselect_targets,entity_types){
            return {
                "minecraft:behavior.nearest_attackable_target": {
                    "priority": priority,
                    "within_radius": within_radius,
                    "reselect_targets": reselect_targets,
                    "entity_types": entity_types||[
                        {
                            "filters": {
                                "any_of": [
                                    {
                                        "test": "is_family",
                                        "subject": "other",
                                        "value": "player"
                                    }
                                ]
                            },
                            "max_dist": 35
                        }
                    ]
                },
            }
        },

        delayed_attack:function(priority,attack_once,track_target,require_complete_path,random_stop_interval,reach_multiplier,speed_multiplier,attack_duration,hit_delay_pct){
            return {
                "minecraft:behavior.delayed_attack": {
                    "priority": priority,
                    "attack_once": attack_once,
                    "track_target": track_target,
                    "require_complete_path": require_complete_path,
                    "random_stop_interval": random_stop_interval,
                    "reach_multiplier": reach_multiplier,
                    "speed_multiplier": speed_multiplier,
                    "attack_duration": attack_duration,
                    "hit_delay_pct": hit_delay_pct
                },
            }
        },

    },
    
    navigation_walk:function(can_walk,can_path_over_water,avoid_water,avoid_damage_blocks,avoid_sun,can_pass_doors,can_open_doors){
        return {
            "minecraft:navigation.walk": {
                "can_path_over_water": can_path_over_water,
                "avoid_water": avoid_water,
                "avoid_damage_blocks": avoid_damage_blocks,
                "can_walk": can_walk,
                "avoid_sun": avoid_sun,
                "can_pass_doors": can_pass_doors,
                "can_open_doors": can_open_doors
            }
        }
    },

    movement_basic:function(){
        return {
            "minecraft:movement.basic": {},
        }
    },

    jump_static:function(){
        return {
           "minecraft:jump.static": {},
        }
    },
    //baisc
    loot:function(loot){
        return {
            "minecraft:loot": {
                "table": loot
            },
        }
    },

    movement:function(movement){
        return {
            "minecraft:movement": {
                "value": movement
            },
        }
    },

    attack:function(damage){
        return {
            "minecraft:attack": {
                "damage": damage
            },
        }
    },

    health:function(value,max){
        return {
            "minecraft:health": {
                "value": value,
                "max": max
            },
        }
    },

    type_family:function(type_family){
        return {
            "minecraft:type_family": {
                "family": type_family
            },
        }
    },
   
    scale:function(scale){
        return {
            "minecraft:scale": {
                "value": scale
            }
        }
    },
    collisionBox:function(width,height){
        return {
            "minecraft:collision_box": {
                "width": width,
                "height": height
            }
        }
    },
    projectile:function(anchor,power,gravity,angle_offset,offset,on_hit){
        return {
            "minecraft:projectile": {
				"anchor": anchor,
				"power": power,
				"gravity": gravity,
				"angle_offset": angle_offset,
				"offset": offset,
                "on_hit": {
					"impact_damage": {
						"filter": "blaze",
						"damage": 3,
						"knockback": true
					},
					"remove_on_hit": {},
					"particle_on_hit": {
						"particle_type": "snowballpoof",
						"num_particles": 6,
						"on_entity_hit": true,
						"on_other_hit": true
					}
				},
			}
        }
    },
    pushable:function(is_pushable,is_pushable_by_piston){
        return {
            "minecraft:pushable": {
				"is_pushable": is_pushable,
				"is_pushable_by_piston": is_pushable_by_piston
			}
        }
    }, 
    physics:function(){
        return {
            "minecraft:physics": {}
        }
    },
    nameable:function(){
        return {
            "minecraft:nameable": {
            }
        }
    },
    equip_item:function(){
        return {
            "minecraft:equip_item": {
            },
        }
    },
    burns_in_daylight:function(){
        return {
            "minecraft:burns_in_daylight": {
            },
        }
    },
    can_climb:function(){
        return {
            "minecraft:can_climb": {
            },
        }
    },
}
