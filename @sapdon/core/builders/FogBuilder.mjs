import { BasicBuilder } from "./builder.mjs";

export class FogBuilder extends BasicBuilder {
    constructor(name, data = {}) {
      super(name, "fog_settings", "1.12", data);
    }
    setDescription(description) {
      if (!this.data.description) this.data.description = {};
      Object.assign(this.data.description, description);
      return this;
    }
    setDistance(distance) {
      if (!this.data.distance) this.data.distance = {};
      Object.assign(this.data.distance, distance);
      return this;
    }
    addDiatance(blockType,fog_start,fog_end,fog_color,render_distance_type){
      this.setDistance({
        [blockType]:{
          fog_start:fog_start,
          fog_end:fog_end,
          fog_color:fog_color,
          render_distance_type:render_distance_type
        }
      })
    }
    setIdentifier(identifier) {
      this.setDescription({
        identifier: identifier
      });
      return this;
    }
  }