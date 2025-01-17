import { AddonRecipe } from "./recipe.js";
import { RecipeTypes } from "./data.js";

export class AddonRecipeFurnace extends AddonRecipe {
	constructor(format_version, definitions) {
		super(format_version, RecipeTypes.Furnace, definitions)
	}

	input(item, data, count) {
		if (!data) {
			this.definitions.input = item;
		} else {
			if (!count) count = 1;
			this.definitions.input = { item, data, count };
		}
		return this;
	}

	output(item) {
		this.definitions.output = item;
		return this;
	}
}

export class AddonRecipeFurnace_1_12 extends AddonRecipeFurnace {
	constructor(definitions = {}) {
		super("1.12", definitions);
	}
}

export class AddonRecipeFurnace_1_17 extends AddonRecipeFurnace {
	constructor(definitions = {}) {
		super("1.17", definitions);
	}
}