import { BlockAPI } from "../../../../@sapdon/core/class/core_block.mjs";
import { ItemAPI } from "../../../../@sapdon/core/class/core_Item.mjs";
import { TreeBlock } from "../../../../@sapdon/core/class/TreeBlock.mjs";
import { BlockComponents } from "../../../../@sapdon/core/components/BlockComponents.mjs";
import { BlockEvent } from "../../../../@sapdon/core/events/BlockEvents.mjs";

ItemAPI.createItem("sapdon:masterball","item","masterball");

const VariantDatas = [];
for(let i = 0;i<16;i++){
    const variant = {
        stateTag:i,
        textures:[
            "test_log_oak","test_log_top","test_log_top",
            "test_log_oak","test_log_oak","test_log_oak",
            "test_log_oak"
        ]};
    VariantDatas.push(variant);
}

const treeBlock = BlockAPI.createTileBlock("sapdon:test_log","nature",VariantDatas);


const treeStateSetEvent = {
    sequence:[
        {
            condition: "q.block_state('sapdon:block_variant_tag') <"+ 15,
            set_block_state:  {
                "sapdon:block_variant_tag":"q.block_state('sapdon:block_variant_tag')+1"
            },
            run_command: {
                "command": ["particle minecraft:crop_growth_emitter ~~~", "say run"]
            }
        },
        {
            condition: "q.block_state('sapdon:block_variant_tag') ==" + 15,
            set_block_state:  {"sapdon:block_variant_tag":"0"},
            run_command: {
                "command": ["particle minecraft:crop_growth_emitter ~~~", "say reset"]
            }
        }
    ]
};
treeBlock.addEvent("sapdon:tree_state_set",treeStateSetEvent);

treeBlock.setQueuedTicking(true,[10,10],"sapdon:tree_state_set","self","1");

for(let i = 0;i<16;i++){
    let size = Math.floor((i+1)/16*10)/10; //0.2-1
    treeBlock.addPermutation(`q.block_state('sapdon:block_variant_tag') == ${i}`,
        BlockComponents.transformation([0,0,0],[0,0,0],[size,size,size])
    ); 
}

