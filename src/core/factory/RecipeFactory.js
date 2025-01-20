import { Registry } from "../registry.js";
import { AddonRecipeFurnace_1_17 } from "../addon/recipe/recipeFurnace.js";
import { RecipeTags } from "../addon/recipe/data.js";

class RecipeRegistry extends Registry {
	/**
	 *
	 * @param {string} input
	 * @param {string} output
	 */
	registerSimpleFurnace(input, output) {
		this.registerFurnace(`sapdon:furnace_${output.split(":")[1]}_${input.split(":")[1]}`, [RecipeTags.Furnace], input, output);
	}

	registerFurnace(identifier, tags, input, output) {
		this.register(new AddonRecipeFurnace_1_17().identifier(identifier).tags(tags).input(input).output(output));
	}
}

export const RecipeAPI = new RecipeRegistry();
