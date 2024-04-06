//这里是主程序启动文件
import fs from "fs"
import path from "path";
import {readFileSync} from "fs"
import vm from "node:vm"

import  {Mod, pathConfig}  from "./manifest.mjs";
import { copyFileMC, copyFolder, saveFile,removeImportsFromFile,traverseDirectory} from "./tools/file.mjs";

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
      Equipment: Equipment,
      Projectile: Projectile,
      Builder:Builder,
      RecipesBuilder:RecipesBuilder,
      LootTableBuilder:LootTableBuilder,
      ItemEvent:ItemEvent,
      Translater:Translater,
      ItemAPI:ItemAPI,
      BlockAPI:BlockAPI,
      EntityAPI:EntityAPI,
      ItemComponents:ItemComponents,
      BlockComponents:BlockComponents,
      EntityComponents:EntityComponents
    };
    // 在虚拟上下文中执行代码
    const sandbox = vm.createContext(context);
    script.runInContext(sandbox);
/*
    ItemAPI.getAllItems().forEach((item)=>{
      if(item instanceof Item){
        const behData = new ItemBuilder(item.identifier,'1.10.0');
        behData.tags.push("beh");
    
        const resData = new ItemBuilder(item.identifier,'1.10.0');
        resData.tags.push("res");
    
        resData.setComponents({"minecraft:icon": item.texture});
    
        //components
        const defaultComponents = {
            "foil": false,
            "max_damage": 0,
            "use_duration": 0,
            "max_stack_size": 64,
            ...item.componentsOptions
        };

        Object.entries(defaultComponents).forEach(([key,value])=>{
            item.components.push({[`minecraft:${key}`]:value});
        }, {});

        item.components.forEach((component)=>{
            behData.setComponents(component);
        });
      }

      if(item instanceof Equipment){
        const behData = new ItemBuilder(item.identifier,'1.16.100')
        behData.setCategory(item.category)
        behData.setComponents(ItemComponents.icon(item.texture));

        //this.setComponentsOptions(this.componentsOptions);
        //tags
        item.tags.forEach((tag)=>{
            item.addComponet({[`tag:${tag}`]:{}});
        });
        //repairableItemList
        if(item.repairableItemList.length>0)
        item.addComponet(ItemComponents.repairable(item.repairableItemList));

        //components
        item.components.forEach((component)=>{
            behData.setComponents(component);
        });

        //events
        item.events.forEach((event)=>{
            behData.setEvents(event);
        });
      }
    });

    BlockAPI.getAllBlocks().forEach((block)=>{
        if(block instanceof Block){
          const blockData = new BlockBuilder(block.identifier,"1.12.30");
          blockData.setIdentifier(block.identifier);
          blockData.setCategory(block.category);
          block.registerState("sapdon:block_variant_tag",{
            "values": { "min": 0, "max": block.variantDatas.length>1?block.variantDatas.length-1:1 } 
          });
          //materialInstances
          block.variantDatas.forEach(({stateTag})=>{
            block.addPermutation(`q.block_state('sapdon:block_variant_tag') == ${stateTag}`,BlockComponents.materialInstances(block.materialInstances[stateTag]));
          });
          //states
          for(let name in block.states){
            blockData.setStates(name,block.states[name]);
          }
          //components
          blockData.setComponents(block.components);
          
          //events
          blockData.setEvents(block.events);
          //permutations
          block.permutations.forEach(({condition,components})=>{
            //console.log(components)
            blockData.addPermutation(condition,components);
          });
        }
    });

    EntityAPI.getAllEntities().forEach((entity)=>{
      if(entity instanceof Entity){
        const behData = new EntityBehavoirBuilder(entity.identifier,"1.16.0",{});
        const resData = new EntityResorceBuilder(entity.identifier,"1.10.0",{});

        behData.setSpawnable(entity.options.spawnable||true);
        behData.setSummonable(entity.options.summonable||true);
        behData.setExperimental(entity.options.experimental||false);
        behData.setRuntimeIdentifier(entity.options.runtime_identifier == "self" ? identifier : entity.options.runtime_identifier);
        
        //beh
        entity.components.concat(entity.behaviorData.components);

        entity.components.forEach((component)=>{
          behData.setComponents(component);
        });

        //res
        entity.resourceData.materials.forEach(({name,material})=>{
          resData.setMaterials(name,material);
        });
        entity.resourceData.textures.forEach(({name,texture})=>{
          resData.setTextures(name,texture);
        });
        entity.resourceData.geometry.forEach(({name,geometry})=>{
          resData.setGeometry(name,geometry);
        });
        entity.resourceData.animations.forEach(({name,animation})=>{
          resData.setAnimations(name,animation);
        });
        entity.resourceData.scripts.forEach(({name,script})=>{
          resData.setScripts(name,script);
        });
        resData.addRenderController(...entity.resourceData.renderControllers);
      }
    });
*/
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
          saveFile(`${behPathCopy}/entities/${name}.json`,dataText);
          saveFile(`${behPath}/entities/${name}.json`,dataText);
          break;
        case "client_entity":
          saveFile(`${resPathCopy}/entity/${name}.json`,dataText);
          saveFile(`${resPath}/entity/${name}.json`,dataText);
          break;
        case "attachable":
          saveFile(`${behPathCopy}/attachables/${name}.json`,dataText);
          saveFile(`${behPath}/attachables/${name}.json`,dataText);
          break;
        case "recipe_shaped":
          saveFile(`${behPathCopy}/recipes/${name}.json`,dataText);
          saveFile(`${behPath}/recipes/${name}.json`,dataText);
          break;
      }
    });
});


    
    

//debugger