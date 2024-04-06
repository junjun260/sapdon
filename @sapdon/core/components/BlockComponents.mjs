export var BlockComponents = {
  queuedTicking:function(looping,interval_range,event,target,condition){
      return {
        "minecraft:queued_ticking": {
          "looping": looping,
          "interval_range": interval_range, // Two values (in ticks) which will be randomly decided between to determine delay duration.
          "on_tick": {
            "event": event,
            "target": target, // Optional - 'self' is default (targets block)
            "condition": condition // Optional
          }
        }
      }
    },
    onInteract(event,target,condition) {
      return {
        "minecraft:on_interact": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      };
    },
    unitCube:function(){
      return {"minecraft:unit_cube": {}}
    },
    loot:function(loot){
      return {'minecraft:loot': loot}
    },
    destructibleByMining:function(seconds_to_destroy){
      return {
        "minecraft:destructible_by_mining": {
          "seconds_to_destroy": seconds_to_destroy
        }
      }
    },
    destructibleByExplosion:function (explosion_resistance) {
      return {
        "minecraft:destructible_by_explosion": {
          "explosion_resistance": explosion_resistance
        }
      }
    },
    friction:function (friction) {
      return {
        "minecraft:friction": friction
      }
    },
    lightEmission(light_emission) {
      return {
        "minecraft:light_emission": light_emission
      }
    },
    lightDampening:function(light_dampening) {
      return {
        'minecraft:light_dampening': light_dampening
      }
    },
    materialInstances(material_instances) {
      return {
        "minecraft:material_instances": material_instances
      }
    },
    
    collisionBox:function (origin,size) {
     return {
        "minecraft:collision_box": {
          "origin": origin || [-8, 0, -8],
          "size": size || [16, 16, 16]
        }
      }
    },
    
    craftingTable:function(table_name,crafting_tags) {
      return {
        "minecraft:crafting_table": {
        "table_name": table_name||"Example Crafting Table", // Name shown in GUI, can be translated
        "crafting_tags": crafting_tags||["crafting_table"]
        }
      }
    },
    
    flammable:function (catch_chance_modifier, destroy_chance_modifier) {
      return {
        "minecraft:flammable": {
          "catch_chance_modifier": catch_chance_modifier||5, // Affects chance that this block will catch flame when next to a fire
          "destroy_chance_modifier": destroy_chance_modifier||20 // Affects chance that this block will be destroyed by flames when on fire
        }
      }
    },
    geometry:function (geometry) {
      return {
        'minecraft:geometry': geometry
      }
    },
    
    mapColor:function(color) {
     return {
        'minecraft:map_color': color
      }
    },
    
    selectionBox:function(origin,size) {
      return {
        'minecraft:selection_box': {
          "origin": origin || [-8, 0, -8],
          "size": size || [16, 16, 16]
        }
      }
    },
    displayName(displayName) {
      return {
        'minecraft:display_name': displayName
      }
    },
    
    placementFilter:function(filter) {
     return {
        'minecraft:placement_filter': filter
      }
    },
    
    transformation:function(translation,rotation,scale) {
      return {
        "minecraft:transformation": {
          "translation": translation||[-5, 8, 0],
          "rotation": rotation||[90, 180, 0],
          "scale": scale||[0.5, 1, 0.5],
        }
      }
    }
  }