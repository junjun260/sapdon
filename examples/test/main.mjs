import { ItemComponent} from "../../src/core/addon/component/itemComponents.js";
import { BlockAPI } from "../../src/core/factory/BlockFactory.js";
import { ItemAPI } from "../../src/core/factory/ItemFactory.js";




ItemAPI.createItem("sapdon:test_item","items","masterball")
       .addComponent(
            ItemComponent.combineComponents(
                ItemComponent.setDisplayName("大师球"),
                ItemComponent.setMaxStackSize(16),
                ItemComponent.setUseModifiers(0.9,1)
            )
       );











const block = BlockAPI.createBasicBlock(
    "sapdon:test_block",
    "construction",
    [
        "compass_block_up",
        "compass_block_down",
        "compass_block_east",
        "compass_block_west",
        "compass_block_south",
        "compass_block_north",
    ]
);
console.log(block)