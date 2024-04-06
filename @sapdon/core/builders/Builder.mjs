export class BasicBuilder {
    static builderList = [];
    constructor(name, lable, version , data = {}) {
      this.name = name;
      this.tags = [];
      this.lable = lable;
      this.version = version;
      this.data = data ;
      this.elements = {};
      Builder.builderList.push(this);
    }
    build(){
      const data = {
        ["format_version"]:this.version,
        [`minecraft:${this.lable}`]:this.data
      };
      return data;
    }
}

export class Builder extends BasicBuilder{
    constructor(name, lable, version, data = {}){
        super(name, lable, version, data);
    }
    setDescription(description){
        if(!this.data.description) this.data.description = {};
        Object.assign(this.data.description,description);
        return this;
    }
    setComponents(components){
        if(!this.data.components) this.data.components = {};
        Object.assign(this.data.components,components);
        return this;
    }
    setEvents(events){
        if(!this.data.events) this.data.events = {};
        Object.assign(this.data.events,events);
        return this;
    }
    addComponent(component){
        this.setComponents(component);
        return this;
    }
    addEvent(event){
        this.setEvents(event);
        return this;
    }
}

  
