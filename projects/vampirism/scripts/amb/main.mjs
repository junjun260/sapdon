
import { ItemAPI } from "../../../../@sapdon/core/class/core_Item.mjs";
import { EntityAPI } from "../../../../@sapdon/core/class/core_entity.mjs";

ItemAPI.createEquipmentItem("vampirism:vampire_fang","Items","vampireFang_0");
EntityAPI.createTestEntity("vampirism:vampire","minecraft:zombie","textures/entity/vampire");


const vampire_baron = EntityAPI.createTestEntity("vampirism:vampire_baron","minecraft:zombie","textures/entity/vampire_baron");
vampire_baron.setGeometry("default","geometry.vampire_baron");
