import { BlockBuilder } from "../builders/BlockBuilder.mjs";
import { LootTableBuilder } from "../builders/LootTableBuilder.mjs";
import { BlockComponents } from "../components/BlockComponents.mjs";
import { BlockTextureSet } from "./BlockTextureSet.mjs";

export class Block {
    constructor(identifier, category, variantDatas){
      this.blockData = new BlockBuilder(identifier,"1.12.30").setCategory(category);
      this.identifier = identifier;
      this.category = category;
      this.variantDatas = variantDatas;

      this.states = {};
      this.traits = {};
      this.events = {};
      this.components = {};
      this.variantComponents = {};
      this.permutations = [];
      this.materialInstances = {};

      this.registerState("sapdon:block_variant_tag",{
        "values": { "min": 0, "max": this.variantDatas.length>1?this.variantDatas.length-1:1 } 
      });

      const sideArr = ['*','up', 'down', 'north', 'east', 'south','west'];
      const blockTextures = {
        textures:{}
      };
      this.variantDatas.forEach(({stateTag,textures,material}) => {
        const materialObj = {};
        textures.forEach((texture,index)=>{
          materialObj[sideArr[index]] = {
              "texture":texture,
              "render_method": material?material.render_method:"alpha_test",
              "face_dimming": material?material.face_dimming:false,
              "ambient_occlusion": material?material.ambient_occlusion:false
          };
          blockTextures.textures[sideArr[index]] = texture;
        });
        this.materialInstances[stateTag] = materialObj;
        this.setVariantMaterialInstances(stateTag,materialObj);
      });
      BlockTextureSet[this.identifier] = blockTextures;
    }
    // 添加事件
    addEvent(eventName, event) {
      if(!this.events[eventName]) this.events[eventName] = {};
      Object.assign(this.events[eventName],event);
      this.blockData.addEvent({[eventName]:event});
    }
   
    registerState(name, context) {
      if(!this.states[name]) this.states[name] ={};
      Object.assign(this.states[name],context);
      this.blockData.setStates(name,context);
    }

    registerTrait(name, context) {
      if(!this.traits[name]) this.traits[name] ={};
      Object.assign(this.traits[name],context);
      this.blockData.setTraits(name,context);
    }


    setComponent(component){
      Object.assign(this.components,component);
      this.blockData.addComponent(component);
    }
  
    setVariantComponent(stateTag, component) {
      if(!this.variantComponents[stateTag]){
        this.variantComponents[stateTag] = {};
      }
      Object.assign(this.variantComponents[stateTag],component);
      if(stateTag==0) this.setComponent(component);
      this.addPermutation(`q.block_state('sapdon:block_variant_tag') == ${stateTag}`,component);
    }
    setVariantMaterialInstances(stateTag,material){
      Object.assign(this.materialInstances[stateTag],material);
      this.setVariantComponent(stateTag,BlockComponents.materialInstances(this.materialInstances[stateTag]));
    }
    addPermutation(condition, components) {
      this.permutations.push({ condition, components });
      this.blockData.addPermutation(condition,components);
    }

    addTag(tag){
      this.setComponent({[`tag:${tag}`]:{}});
    }

    addUnitCube() {
      const unit_cube = BlockComponents.unitCube();
      this.setComponent(unit_cube);
    }
    setLoot(loot) {
      const loot_ = BlockComponents.loot(loot);
      this.setComponent(loot_);
    }
    setDestructibleByMining(seconds_to_destroy) {
      const optionObj = BlockComponents.destructibleByMining(seconds_to_destroy);
      this.setComponent(optionObj);
    }
    setDestructibleByExplosion(explosion_resistance) {
      const optionObj = BlockComponents.destructibleByExplosion(explosion_resistance);
      this.setComponent(optionObj);
    }
    setFriction(friction) {
      const optionObj = BlockComponents.friction(friction);
      this.setComponent(optionObj);
    }
    setLightEmission(light_emission) {
      const optionObj = BlockComponents.lightEmission(light_emission);
      this.setComponent(optionObj);
    }
    setLightDampening(light_dampening) {
      const optionObj = BlockComponents.lightDampening(light_dampening);
      this.setComponent(optionObj);
    }
    setMaterialInstances(material_instances) {
      //const optionObj = BlockComponents.materialInstances(material_instances);
      this.setVariantMaterialInstances(0,material_instances);
    }
    setCollisionBox(origin,size) {
      const optionObj = BlockComponents.collisionBox(origin,size);
      this.setComponent(optionObj);
    }
    setCraftingTable(table_name,crafting_tags) {
      const optionObj = BlockComponents.craftingTable(table_name,crafting_tags);
      this.setComponent(optionObj);
    }
    setFlammable(catch_chance_modifier, destroy_chance_modifier) {
      const optionObj = BlockComponents.flammable(catch_chance_modifier,destroy_chance_modifier);
      this.setComponent(optionObj);
    }
    setGeometry(geometry) {
      const optionObj = BlockComponents.geometry(geometry);
      this.setComponent(optionObj);
    }
    setMapColor(color) {
      const optionObj = BlockComponents.mapColor(color);
      this.setComponent(optionObj);
    }
    setSelectionBox(origin,size) {
      const optionObj = BlockComponents.selectionBox(origin,size);
      this.setComponent(optionObj);
    }
    setPlacementFilter(filter) {
      const optionObj = BlockComponents.placementFilter(filter);
      this.setComponent(optionObj);
    }
    setTransformation(translation,rotation,scale) {
      const optionObj = BlockComponents.transformation(translation,rotation,scale);
      this.setComponent(optionObj);
    }
    out() {
      const blockData = {
        identifier: this.identifier,
        category: this.category,
        states: this.states,
        permutations: this.permutations,
        materialInstances:this.materialInstances,
        variants:this.components,
        events:this.events
      };
      return blockData;
    }
  }


  
