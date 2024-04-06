import { Translater } from "../../../../core/class/Translate.mjs";
import { ItemAPI } from "../../../../core/class/core_Item.mjs";
import { EntityAPI } from "../../../../core/class/core_entity.mjs";

EntityAPI.createProjectile("poke:projectile_masterball","textures/items/masterball",1,0.08,[0,0,0],[0,0,0]);

const uncaught_masterball = ItemAPI.createEquipmentItem("poke:uncaught_masterball","equipment","masterball")
      uncaught_masterball.setMaxStackSize(64)
      uncaught_masterball.setThrowable(true,1,false);
      uncaught_masterball.setProjectile(1,"poke:projectile_masterball");

const caught_masterball = ItemAPI.createEquipmentItem("poke:caught_masterball","none","masterball")
      caught_masterball.setMaxStackSize(1)
      caught_masterball.setThrowable(true,1,false);
      caught_masterball.setProjectile(1,"poke:projectile_masterball")
      caught_masterball.setGlint(true);

Translater.regsiterItemTranslater("poke:uncaught_masterball","zh_CN","大师球");