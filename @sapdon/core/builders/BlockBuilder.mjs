import { BlockComponents } from "../components/BlockComponents.mjs";
import { Builder } from "./builder.mjs";

export class BlockBuilder extends Builder{
    constructor(name, version, data = {}){
      super(name, "block", version, data);
      this.setIdentifier(name);
    }
    setPermutations(permutations){
      this.data.permutations = permutations;
      return this;
    }
    addPermutation(condition, components) {
        if (!this.permutations) this.permutations = {};
        console.log(condition);

        const compactText = condition.replace(/\s/g, "");
        console.log(compactText);
        if (!this.permutations[compactText]) {
          this.permutations[compactText] = {};  // 初始化为空对象
        }
        Object.assign(this.permutations[compactText], components);
        // 转数组
        const permutations = this.permutations;
        const array = Object.keys(this.permutations).map(function(key) {
          return {
            condition: key,
            components: permutations[key]
          };
        });
        console.log(array);
        this.setPermutations(array);
        return this;
    }
    setTraits(name,content){
      const traits = this.data.description?this.data.description.traits:{};
      this.setDescription({
        traits:{
          ...traits,
          [name]:content
        }
      });
      return this;
    }
    setStates(name,content){
      const states = this.data.description?this.data.description.states:{};
      this.setDescription({
        states:{
          ...states,
          [name]:content
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
    setCategory(category) {
      this.setDescription({
        menu_category:{
          category: category
        }
      });
      return this;
    }
  }

  