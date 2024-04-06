export class OreFeatureBuilder extends BasicBuilder{
    constructor(name, data = {}) {
        super(name,"ore_feature", "1.13.0", data);
        this.setIdentifier("minecraft:" + name);
    }
    setIdentifier(identifier) {
      this.data.description = { "identifier": identifier };
      return this;
    }
    setCount(count) {
      this.data.count = count;
      return this;
    }
    setReplaceRules(replace_rules){
      this.data["minecraft"].replace_rules = replace_rules;
      return this;
    }
    addReplaceRule(placesBlock, mayReplace) {
      if (!this.data.replace_rules) this.data.replace_rules = [];
      this.data.replace_rules.push(
        {
          "places_block": placesBlock,
          "may_replace": mayReplace
        }
      );
      return this;
    }
}

