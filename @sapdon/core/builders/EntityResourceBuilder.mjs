import { BasicBuilder } from "./builder.mjs";

export class EntityResorceBuilder extends BasicBuilder {
    constructor(name,version,data={}){
      super(name,"client_entity",version,data);
      this.setIdentifier(name);
    }
    setDescription(description){
      if(!this.data.description) this.data.description = {};
      Object.assign(this.data.description,description);
      return this;
    }
    setEnableAttachables(boolean){
      this.setDescription({
        enable_attachables:boolean
      });
      return this;
    }
    setHideArmor(boolean){
      this.setDescription({
        hide_armor:boolean
      });
      return this;
    }
    setIdentifier(identifier) {
      this.setDescription({
        identifier:identifier
      });
      return this;
    }
    setMaterials(name, material) {
      const materials = this.data.description ? this.data.description.materials : {};
      this.setDescription({
        materials:{
          ...materials,
          [name]: material,
        }
      });
      return this;
    }
    setTextures(name, texture) {
      const textures = this.data.description ? this.data.description.textures : {};
      this.setDescription({
        textures: {
          ...textures,
            [name]: texture,
        }
      });
      return this;
    }
    setGeometry(name, geometry) {
      const geometry_ = this.data.description ? this.data.description.geometry : {};
      this.setDescription({
        geometry: {
          ...geometry_,
            [name]: geometry,
        }
      });
      return this;
    }
    setAnimations(name, animation) {
      const animations = this.data.description ? this.data.description.animations : {};
      this.setDescription({
        animations: {
          ...animations,
            [name]: animation,
        }
      });
      return this;
    }
    setScripts(name, script) {
      const scripts = this.data.description ? this.data.description.scripts : {};
      this.setDescription({
        scripts: {
          ...scripts,
            [name]: script,
        }
      });
      return this;
    }
    addRenderController(controller) {
      if(!this.renderControllers) this.renderControllers = [];
      
      this.renderControllers.push(controller);
      this.setDescription({
        render_controllers:this.renderControllers
      });
      return this;
    }
    addAnimationControllers(controller) {
      if(!this.animationControllers) this.animationControllers = [];
      this.animationControllers.push(controller);
      this.setDescription({
        animationControllers: this.animationControllers
      });
      return this;
    }
  }

  export class AttachableBuilder extends EntityResorceBuilder{
    constructor(name, version, data = {}){
      super(name, version, data);
      this.lable = "attachable";
    }
  }
