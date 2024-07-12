//这里是主程序启动文件
import fs from "fs"
import path from "path";
import {readFileSync} from "fs"
import vm from "node:vm"

import  {Mod, pathConfig}  from "./manifest.mjs";
import { copyFileMC, copyFolder, saveFile,removeImportsFromFile,traverseDirectory} from "./tools/file.mjs";
import {generateItemTextureJson } from "./tools/itemTexturesSet.mjs"
import { Entity, Projectile } from "../core/class/Entity.mjs";
import { Equipment } from "../core/class/Equipment.mjs";

import { ItemAPI } from "../core/class/core_Item.mjs";
import { BlockAPI } from "../core/class/core_block.mjs";
import { EntityAPI } from "../core/class/core_entity.mjs";
import { BlockComponents } from "../core/components/BlockComponents.mjs";
import { ItemComponents } from "../core/components/ItemComponents.mjs";
import { EntityComponents } from "../core/components/EntityComponents.mjs";
import { Translater } from "../core/class/Translate.mjs";
import { Builder } from "../core/builders/builder.mjs";
import { LootTableBuilder } from "../core/builders/LootTableBuilder.mjs";
import { ItemEvent } from "../core/events/ItemEvents.mjs";
import { Item } from "../core/class/Item.mjs";
import { Block } from "../core/class/Block.mjs";
import { ItemBuilder } from "../core/builders/ItemBuilder.mjs";
import { EntityBehavoirBuilder } from "../core/builders/EntityBehaviorBuilder.mjs";
import { EntityResorceBuilder } from "../core/builders/EntityResourceBuilder.mjs";
import { BlockBuilder } from "../core/builders/BlockBuilder.mjs";
import { RecipesBuilder } from "../core/builders/RecipesBuilder.mjs";
import { HudScreen, TextControl } from "../core/ui/UI.mjs";
import { generateBlockTextureJson } from "./tools/blockTexturesSet.mjs";
import { BlockEvent } from "../core/events/BlockEvents.mjs";
import { BlockTextureSet } from "../core/class/BlockTextureSet.mjs";


//启动
//执行遍历projects文件夹下的目录所有的manifest
const manifestPaths = traverseDirectory(pathConfig.projectsPath,'manifest.json');

//如果有清单文件就读取该文件
const manifests = manifestPaths.map(manifest => {
  return JSON.parse(readFileSync(manifest,'utf8'));
});

console.log(manifestPaths)

manifests.forEach((element,index)=>{
    //建立配置文件
    //如果清单文件不存在就新建
    const project_name = manifestPaths[index].split('\\')[1];
    //console.log(manifests[index]);
    const behPath = `${pathConfig.mojangBetaPath}/development_behavior_packs/${element.mod_name}_BP`;
    const resPath = `${pathConfig.mojangBetaPath}/development_resource_packs/${element.mod_name}_RP`;

    const behPathCopy = `./projects/${project_name}/dist/BP`;
    const resPathCopy = `./projects/${project_name}/dist/RP`;
    
    if(!fs.existsSync(`${behPath}/manifest.json`)||!fs.existsSync(`${resPath}/manifest.json`)){
      //清单文件
      const mod = new Mod(element.mod_name,element.version, element.min_engine_version, element);
      saveFile(`${behPath}/manifest.json`,mod.behManifest.toJSON());
      saveFile(`${resPath}/manifest.json`,mod.resManifest.toJSON());
      //保存备份文件
      saveFile(`${behPathCopy}/manifest.json`,mod.behManifest.toJSON());
      saveFile(`${resPathCopy}/manifest.json`,mod.resManifest.toJSON());
    }
    
    //图片
    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${behPath}/pack_icon.png`);
    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${resPath}/pack_icon.png`);

    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${behPathCopy}/pack_icon.png`);
    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${resPathCopy}/pack_icon.png`);

    //itemTextures.json
    const itemTexturesPath = `./projects/${project_name}/textures/items`;
    const outputPath = `./projects/${project_name}/textures/item_texture.json`;

    generateItemTextureJson(itemTexturesPath, outputPath)
    .then(() => {
      console.log("Item texture JSON file generated successfully.");
    })
    .catch((err) => {
      console.error("Error generating item texture JSON:", err);
    });
    
    //blockTextures.json
    const blockTexturesPath = `./projects/${project_name}/textures/blocks`;
    const outputBlockPath = `./projects/${project_name}/textures/terrain_texture.json`;
    
    generateBlockTextureJson(blockTexturesPath, outputBlockPath)
    .then(() => {
      console.log("Block texture JSON file generated successfully.");
    })
    .catch((err) => {
      console.error("Error generating block texture JSON:", err);
    });

    //复制文件夹
    copyFolder(`./projects/${project_name}/textures`,`${resPath}/textures`);
    copyFolder(`./projects/${project_name}/models`,`${resPath}/models`);

    copyFolder(`./projects/${project_name}/textures`,`${resPathCopy}/textures`);
    copyFolder(`./projects/${project_name}/models`,`${resPathCopy}/models`);

    if(element.scripts.sapi){
        copyFolder(`./projects/${project_name}/scripts/sapi`,`${behPath}/scripts/sapi`);
        copyFolder(`./projects/${project_name}/scripts/sapi`,`${behPathCopy}/scripts/sapi`);
    }
    console.log(`./projects/${project_name+"/sapi/"+element.scripts.amb}`);

    //清理ItemAPI
    ItemAPI.itemList = [];
    BlockAPI.blockList = [];
    EntityAPI.entityList = [];
    Builder.builderList = [];

    //清理翻译文件
    Translater.languages = {};

    //执行sapdon api
    const codeText = removeImportsFromFile(`./projects/${project_name+"/"+element.scripts.amb}`);
    const script = new vm.Script(codeText);
    // 创建一个具有所需模块的虚拟上下文
    const context = {
      fs:fs,
      HudScreen:HudScreen,
      TextControl:TextControl,
      Equipment: Equipment,
      Projectile: Projectile,
      Builder:Builder,
      RecipesBuilder:RecipesBuilder,
      LootTableBuilder:LootTableBuilder,
      ItemEvent:ItemEvent,
      BlockEvent:BlockEvent,
      Translater:Translater,
      ItemAPI:ItemAPI,
      BlockAPI:BlockAPI,
      EntityAPI:EntityAPI,
      ItemComponents:ItemComponents,
      BlockComponents:BlockComponents,
      EntityComponents:EntityComponents,
    };
    // 在虚拟上下文中执行代码
    const sandbox = vm.createContext(context);
    script.runInContext(sandbox);

    //blocks.json

    saveFile(`${resPathCopy}/blocks.json`,JSON.stringify(BlockTextureSet));
    saveFile(`${resPath}/blocks.json`,JSON.stringify(BlockTextureSet));

    //languages.json
    const languages = Object.keys(Translater.languages);console.log(languages)
    saveFile(`${resPathCopy}/texts/languages.json`,JSON.stringify(languages));
    saveFile(`${resPath}/texts/languages.json`,JSON.stringify(languages));


    //langs
    for(let lang in Translater.languages){
      const langArr = Translater.languages[lang];
      let conext = "";
      for(let i in langArr){
        conext += langArr[i]
        conext += "\n";
      }
      //console.log(`lang:${lang} langArr:${langArr}`);
      saveFile(`${resPathCopy}/texts/${lang}.lang`,conext);
      saveFile(`${resPath}/texts/${lang}.lang`,conext);
    }

    //UI
    const hud_screen_conext = HudScreen.build();
    saveFile(`${resPathCopy}/ui/hud_screen.json`,hud_screen_conext);
    saveFile(`${resPath}/ui/hud_screen.json`,hud_screen_conext);

    Builder.builderList.forEach((builder)=>{
      const lable = builder.lable;
      const name = builder.name.split(":")[1];
      const dataText = JSON.stringify(builder.build(),null,2);
      switch(lable){
        case "item":
          if(builder.tags.includes("res")){
            saveFile(`${resPathCopy}/items/${name}.json`,dataText);
            saveFile(`${resPath}/items/${name}.json`,dataText);
          }
          else{
            saveFile(`${behPathCopy}/items/${name}.json`,dataText);
            saveFile(`${behPath}/items/${name}.json`,dataText);
          }
          break;
        case "block":
          saveFile(`${behPathCopy}/blocks/${name}.json`,dataText);
          saveFile(`${behPath}//blocks/${name}.json`,dataText);
          break;
        case "loot":
          const path = builder.path;
          saveFile(`${behPathCopy}/${path}.json`,dataText);
          saveFile(`${behPath}/${path}.json`,dataText);
          break;
        case "entity":
          console.log(dataText);
          saveFile(`${behPathCopy}/entities/${name}.json`,dataText);
          saveFile(`${behPath}/entities/${name}.json`,dataText);
          break;
        case "client_entity":
          saveFile(`${resPathCopy}/entity/${name}.json`,dataText);
          saveFile(`${resPath}/entity/${name}.json`,dataText);
          break;
        case "attachable":
          saveFile(`${resPathCopy}/attachables/${name}.json`,dataText);
          saveFile(`${resPath}/attachables/${name}.json`,dataText);
          break;
        case "recipe_shaped":
          saveFile(`${behPathCopy}/recipes/${name}.json`,dataText);
          saveFile(`${behPath}/recipes/${name}.json`,dataText);
          break;
      }
    });
});


    
    

//debugger