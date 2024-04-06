import { BasicBuilder } from "./builder.mjs";

export class RecipesBuilder extends BasicBuilder{
    constructor(name,type,version,data={}){
      super(name,type,version,data);
      this.setIdentifier(name);
    }
    setDescription(description) {
      if (!this.data.description) this.data.description = {};
      Object.assign(this.data.description, description);
      return this;
    }
    addTag(tag){
      if(!this.data.tags) this.data.tags = [];
      this.data.tags.push(tag);
      return this;
    }
    setPattern(pattern){
      if(!this.data.pattern) this.data.pattern = [];
      this.data.pattern = pattern;
      return this;
    }
    setKey(key){
      if(!this.data.key) this.data.key = {};
      Object.assign(this.data.key,key);
      return this;
    }
    setResult(result){
      if(!this.data.result) this.data.result = {};
      Object.assign(this.data.result,result);
      return this;
    }
    setIdentifier(identifier){
      this.setDescription({
        identifier:identifier
      });
      return this;
    }
  }
