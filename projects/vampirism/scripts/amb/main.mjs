
import { LootTableBuilder } from "../../../../@sapdon/core/builders/LootTableBuilder.mjs";
import { ItemAPI } from "../../../../@sapdon/core/class/core_Item.mjs";
import { EntityAPI } from "../../../../@sapdon/core/class/core_entity.mjs";


ItemAPI.createEquipmentItem("vampirism:vampire_fang","Items","vampireFang_0");
ItemAPI.createEquipmentItem("vampirism:blood_eye","Items","bloodEye_0");

for(let i=0;i<10;i++){
    ItemAPI.createFoodItem(`vampirism:blood_bottle_${i}`,"Items",`blood_bottle_${i}`);
}

for(let i=0;i<12;i++){
    ItemAPI.createSwordItem(`vampirism:bloodthirsty_${i}`,"Items",`bloodthirsty_${i}`);
}

ItemAPI.createItem("vampirism:coffin","Items","coffin_0");
ItemAPI.createFoodItem("vampirism:garlic","Items","garlic_0");
ItemAPI.createFoodItem("vampirism:human_heart","Items","humanHeart_0");

ItemAPI.createItem("vampirism:gem_of_binding","Items","gemOfBinding_0");
ItemAPI.createItem("vampirism:minion_name_tag","Items","minionNameTag_0");

ItemAPI.createToolItem("vampirism:pitchfork","Items","pitchfork");

for(let i =0;i<5;i++){
    ItemAPI.createToolItem(`vampirism:pure_blood_${i}`,"Items",`pureBlood_${i}`);
}


ItemAPI.createItem("vampirism:vampire_book_0","Items","vampireBook_0");
ItemAPI.createItem("vampirism:vampire_orchid_0","Items","vampireOrchid_0");
ItemAPI.createItem("vampirism:weak_human_heart_0","Items","weakHumanHeart_0");
ItemAPI.createItem("vampirism:weak_vampire_fang_0","Items","weakVampireFang_0");

EntityAPI.createProjectile("vampirism:garlic_bomb","garlic_bomb_0",0.3,0.08,[0,20,0],[0,0,0]);

const leechSword = ItemAPI.createSwordItem("vampirism:leech_sword","Items","leechSword_1");
const leechSwordUnused = ItemAPI.createSwordItem("vampirism:leech_sword_unused","Items","leechSwordUnused_0");

//armor
ItemAPI.createArmorItem("Boots","vampirism:vampire_armor_boots","Items","vampireArmor_boots_0","textures/armor/vampireArmor_1.png");
ItemAPI.createArmorItem("Chestplate","vampirism:vampire_armor_chestplate","Items","vampireArmor_chestplate_0","textures/armor/vampireArmor_1");
ItemAPI.createArmorItem("Helmet","vampirism:vampire_armor_helmets","Items","vampireArmor_helmet_0","textures/armor/vampireArmor_1");
ItemAPI.createArmorItem("Leggings","vampirism:vampire_armor_leggings","Items","vampireArmor_leggings_0","textures/armor/vampireArmor_2");

const loot_vampire_fang = new LootTableBuilder("vampire_fang","loot_tables/entities/vampire_fang")
      .addWeightedRandomPool(1,[
        LootTableBuilder.createItemEntry("vampirism:vampire_fang",1),
        LootTableBuilder.createItemEntry("minecraft:golden_apple",20)
      ]);

for(let i=0;i<5;i++){
    const vampire = EntityAPI.createTestEntity(`vampirism:vampire${i}`,"minecraft:zombie",`textures/entity/vampire${i}`);
    vampire.setLootTable(`loot_tables/entities/vampire_fang.json`);
}

const vampire_baron = EntityAPI.createTestEntity("vampirism:vampire_baron","minecraft:zombie","textures/entity/vampire_baron");
vampire_baron.setGeometry("default","geometry.vampire_baron");

const pig = EntityAPI.createTestEntity("vampirism:vampire_pig","minecraft:pig","textures/entity/mob/vampire_pig");
pig.setLootTable("loot_tables/entities/vampire_fang.json")

EntityAPI.createTestEntity("vampirism:vampire_wolf","minecraft:wolf","textures/entity/mob/vampire_wolf");
EntityAPI.createTestEntity("vampirism:vampire_cow","minecraft:cow","textures/entity/mob/vampire_cow");

/*const text = new TextControl("text","hello World",[32,32],1)
      .setColor(0,100,255)
      .setShadow(true)

HudScreen.addControl("test001",text);*/

