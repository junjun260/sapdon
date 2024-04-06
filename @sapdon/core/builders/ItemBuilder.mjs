import { Builder } from "./builder.mjs";

export class ItemBuilder extends Builder{
    constructor(name, version, data = {}){
      super(name, "item", version, data);
      this.setIdentifier(name);
    }
    setIdentifier(identifier) {
      this.setDescription({
        identifier: identifier
      });
      return this;
    }
    setCategory(category) {
      this.setDescription({
        category: category
      });
      return this;
    }
  }
  
  /*const item = new ItemBuilder("sapdon:item","1.10.0")
      .setCategory("item")
      .addComponent(ItemComponents.max_stack_size(64))
      .addComponent(ItemComponents.glint(true)).build();
  console.log(item)
  debugger*/