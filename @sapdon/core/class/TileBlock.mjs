import { Block } from "./Block.mjs";

export class TileBlock extends Block{
    constructor(identifier, category, variantDatas){
        super(identifier,category,variantDatas);
    }
    
    setRandomTicking(event,target,condition) {
        this.setComponent({
            "minecraft:random_ticking": {
                "on_tick": {
                  "event": event,
                  "target": target, // Optional - 'self' is default (targets block)
                  "condition": condition
                }
            }
        })
    }

    setOnInteract(event,target,condition) {
      this.setComponent({
        "minecraft:on_interact": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      });
    }

    setOnPlaced(event,target,condition) {
      this.setComponent({
        "minecraft:on_placed": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      });
    }

    setOnPlayerDestroyed(event,target,condition) {
      this.setComponent({
        "minecraft:on_player_destroyed": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      });
    }

    setOnPlayerPlacing(event,target,condition) {
      this.setComponent({
        "minecraft:on_player_placing": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      });
    }
    setOnStepOff(event,target,condition) {
      this.setComponent({
        "minecraft:on_step_off": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      });
    }
    setOnStepOn(event,target,condition) {
      this.setComponent({
        "minecraft:on_step_on": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      });
    }
    setQueuedTicking(looping,interval_range,event,target,condition) {
      this.setComponent({
        "minecraft:queued_ticking": {
          "looping": looping,
          "interval_range": interval_range, // Two values (in ticks) which will be randomly decided between to determine delay duration.
          "on_tick": {
            "event": event,
            "target": target, // Optional - 'self' is default (targets block)
            "condition": condition // Optional
          }
        }
      });
    }

    setOnStepOn(event,target,condition) {
      this.setComponent({
        "minecraft:on_step_on": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition// Optional
        }
      });
    }

    setOnFallOn(event,target,condition,min_fall_distance) {
      this.setComponent({
        "minecraft:on_fall_on": {
          "event": event,
          "target": target, // Optional - 'self' is default (targets block)
          "condition": condition,// Optional
          "min_fall_distance": min_fall_distance
        }
      });
    }
}

