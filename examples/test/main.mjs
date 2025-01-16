import { ItemCompoment } from "../../src/core/addon/component/itemComonents.js";
import { BlockAPI } from "../../src/core/factory/BlockFactory.js";
import { ItemAPI } from "../../src/core/factory/ItemFactory.js";



const item = ItemAPI.createItem("sapdon:test_item","items","masterball");
item.addComponent(ItemCompoment.displayName("大师球"));

const block =BlockAPI.createBasicBlock(
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