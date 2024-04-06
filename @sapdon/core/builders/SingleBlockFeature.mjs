import { BasicBuilder } from "./builder.mjs";

export class SingleBlockFeature extends BasicBuilder{
    constructor(name,data={}){
      super(name,"single_block_feature","1.13.0",data);
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
    setPlacesBlock(places_block){
      this.data.places_block = places_block;
      return this;
    }
    setEnforceSurvivabilityRules(b){
      this.data.enforce_survivability_rules = b;
      return this;
    }
    addMayReplaceBlock(block){
      if(!this.data.may_replace) this.data.may_replace = [];
      this.data.may_replace.push(block);
      return this;
    }
    setMayAttachTo(may_attach_to){
      if(!this.data.may_attach_to)this.data.may_attach_to = {};
      Object.assign(this.data.may_attach_to,may_attach_to);
      return this;
    }
    setMinSidesMustAttach(number){
      this.setMayAttachTo({
         min_sides_must_attach:number
      });
      return this;
    }
    setAutoRotate(boolean){
      this.setMayAttachTo({
         auto_rotate:boolean
      });
      return this;
    }
  }