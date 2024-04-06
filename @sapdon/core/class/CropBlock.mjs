import { LootTableBuilder } from "../builders/LootTableBuilder.mjs";
import { BlockComponents } from "../components/BlockComponents.mjs";
import { BlockEvent } from "../events/BlockEvents.mjs";
import { TileBlock } from "./TileBlock.mjs";

export class CropBlock extends TileBlock{
  constructor(identifier, category, variantDatas){
    super(identifier, category, variantDatas);

    this.seedList = [];
    this.cropList = [];
    this.farmlandList = ["minecraft:farmland"];
    this.fertilizerList = [];
    this.stateNumber = variantDatas.length;
    this.randomTickEvents = [];
    this.onInteractEvents = [];

    this.setGeometry("geometry.crop");
    this.setCollisionBox([0,0,0],[0,0,0]);
    this.setLightDampening(0);

    //生长
    this.addRandomTickEvent({
      condition: "q.block_state('sapdon:block_variant_tag') <" + (this.stateNumber),
      set_block_state: {"sapdon:block_variant_tag":"q.block_state('sapdon:block_variant_tag') + 1"}
    });
    //施肥
    this.addOnInteractEvent({
      condition: "q.block_state('sapdon:block_variant_tag') <" + (this.stateNumber)+"&&q.is_item_name_any('slot.weapon.mainhand', 'minecraft:bone_meal')",
      set_block_state: {
        "sapdon:block_variant_tag": "q.block_state('sapdon:block_variant_tag') + Math.random(1," +(this.stateNumber)+"- q.block_state('sapdon:block_variant_tag'))"
      },
      decrement_stack: {},
      run_command: {
        "command": ["particle minecraft:crop_growth_emitter ~~~", "playsound item.bone_meal.use @a ~~~","say run"]
      }
    });
  }
  setSeed(seed){
    this.setComponent(BlockComponents.loot(seed));
  }
  setCrops(){
    const pool = this.cropList.forEach(crop => {
      return LootTableBuilder.createItemEntry(crop,1);
    });
    const crop = new LootTableBuilder(this.identifier+"_crops","loot_tables/blocks/"+this.identifier.slice(':')[1]+"_crops");
    crop.addWeightedRandomPool(this.cropList.length,pool);
  }
  addCrop(crop){
    this.cropList.push(crop);
    this.setCrops();
  }
  setFarmlands(){
    this.setPlacementFilter({"conditions": [{
      "allowed_faces": ["up"],
      "block_filter": [...this.farmlandList]
    }]});
  }
  addFarmland(farmland){
    this.farmlandList.push(farmland);
    this.setFarmlands();
  }
  setRandomTickEvents(events){
    this.setRandomTicking("sapdon:random_ticking","self","1.0");
    this.addEvent("sapdon:random_ticking",events);
  }
  addRandomTickEvent(event){
    this.randomTickEvents.push(event);
    this.setRandomTickEvents({sequence:[...this.randomTickEvents]});
  }
  setOnInteractEvents(events){
    this.setOnInteract("sapdon:interact","self","1.0");
    this.addEvent("sapdon:interact",events);
  }
  addOnInteractEvent(event){
    this.onInteractEvents.push(event);
    this.setOnInteractEvents({sequence:[...this.onInteractEvents]});
  }
}