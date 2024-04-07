import { Builder } from "./builder.mjs";

export class EntityBehavoirBuilder extends Builder{
    constructor(name, version, data ={}){
      super(name, "entity", version, data);
      this.setIdentifier(this.name);
    }
    setProperties(name, content) {
      const properties = this.data.description ? this.data.description.properties : {};
      this.setDescription({
        properties: {
          ...properties,
            [name]: content
        }
      });
      return this;
    }
    setIdentifier(identifier) {
      this.setDescription({
        identifier: identifier
      });
      return this;
    }
    setSpawnable(boolean){
      this.setDescription({
        is_spawnable: boolean
      });
      return this;
    }
    setSummonable(boolean) {
      this.setDescription({
        is_summonable: boolean
      });
      return this;
    }
    setExperimental(boolean) {
      this.setDescription({
        is_experimental: boolean
      });
      return this;
    }
    setRuntimeIdentifier(identifier) {
      this.setDescription({
        runtime_identifier: identifier
      });
      return this;
    }
  }
  
  
  
  
  
  
  
  