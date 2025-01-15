import { pathToFileURL } from 'url';
import { ItemAPI } from '../core/factory/ItemFactory.js';
import { Item } from '../core/item/Item.js';
import path from 'path';
import { saveFile } from './utils.js';

export const loadAndExecuteMod = async (modPath,buildDirPath) => {
    try {
        // 将路径转换为 file:// URL
        const fileUrl = pathToFileURL(modPath).href;

        // 动态加载 JavaScript 文件
        await import(fileUrl);
        const ItemList = ItemAPI.getAllItems();

        const buildBehDirPath = path.join(buildDirPath,"behavior_packs/");
        const buildResDirPath = path.join(buildDirPath,"resource_packs/");

        //Item -> "bp/item"
        console.log("itemList:",ItemList)

        ItemList.forEach((item)=>{
            //console.log("ssss",item.identifier)
            const itemName = item.identifier.split(":")[1];
            if(item instanceof Item){
                const itemPath = path.join(buildBehDirPath,`items/${itemName}.json`);
                console.log(itemPath)
                saveFile(itemPath,JSON.stringify(item.toJson(),null,2))
            }
        });

        console.log(`已加载并执行 ${modPath} 文件！`);
    } catch (err) {
        console.error(`加载或执行 ${modPath} 失败：${err.message}`);
    }
};