import { TileBlock } from "./TileBlock.mjs";
import { BlockEvent } from "../events/BlockEvents.mjs";
import { BlockComponents } from "../components/BlockComponents.mjs";

export class TreeBlock extends TileBlock{
    constructor(identifier, category, variantDatas){
        super(identifier, category, variantDatas);
        //cube
        this.addUnitCube();
        //axis
        this.registerState("sapdon:axis",[0, 1, 2]);
        //set_axis
        this.addEvent("sapdon:set_axis",
            BlockEvent.setBlockState("sapdon:axis","Math.floor(q.block_face / 2)")
        );
        this.setOnPlayerPlacing("sapdon:set_axis","self","1");

        this.addPermutation("q.block_state('sapdon:axis') == 0",
            BlockComponents.transformation([0,0,0],[0,0,0],[1,1,1])
        );

        this.addPermutation("q.block_state('sapdon:axis') == 1",
            BlockComponents.transformation([0,0,0],[90,0,0],[1,1,1])
        );

        this.addPermutation("q.block_state('sapdon:axis') == 2",
            BlockComponents.transformation([0,0,0],[0,0,90],[1,1,1])
        );
    }
}