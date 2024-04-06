import { BasicBuilder } from "./builder.mjs";

export class FeatureRules extends BasicBuilder{
    constructor(name,data={}){
      super(name,"feature_rules","1.13.0",data);
    }
    setDescription(description) {
      if (!this.data.description) this.data.description = {};
      Object.assign(this.data.description, description);
      return this;
    }
    setIdentifier(identifier) {
      this.setDescription({
        identifier: identifier
      });
      return this;
    }
    setPlacesFeature(feature) {
      this.setDescription({
        places_feature: feature
      });
      return this;
    }
    setConditions(conditions){
      if (!this.data.conditions) this.data.conditions = {};
      Object.assign(this.data.conditions,conditions);
    }
    setDistribution(distribution) {
      if (!this.data.distribution) this.data.distribution = {};
      Object.assign(this.data.distribution, distribution);
      this.data.places_block = places_block;
      return this;
    }
    setIterations(iterations){
      this.setDistribution({
        iterations:iterations
      });
      return this;
    }
    setBiomeFilter(biome_filter){
      if(!this.data.conditions["minecraft:biome_filter"]) this.data.conditions["minecraft:biome_filter"] = [];
      this.setConditions({
        "minecraft:biome_filter":biome_filter
      });
      return this;
    }
    addBiomeFilter(biome_filter) {
      if (!this.data.conditions["minecraft:biome_filter"]) this.data.conditions["minecraft:biome_filter"] = [];
      this.data.conditions["minecraft:biome_filter"].push(biome_filter)
      return this;
    }
  }