import { BasicBuilder } from "./builder.mjs";

export class BrewingBuilder extends BasicBuilder {
    constructor(name,data = {}) {
      super(name, "recipe_furnace", "1.12", data);
    }
    addTag(tag) {
      if (!this.data.tags) this.data.tags = [];
      this.data.tags.push(tag);
      return this;
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
    setInput(input) {
      this.data.input = input;
    }
    setReagent(reagent) {
      this.data.reagent = reagent;
    }
    setOutput(output) {
      this.data.output = output;
    }
  }