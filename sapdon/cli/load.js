import { pathToFileURL } from 'url';
import { Item } from '../core/factory/ItemFactory.js';

export const loadAndExecuteMod = async (modPath) => {
    try {
        // 将路径转换为 file:// URL
        const fileUrl = pathToFileURL(modPath).href;

        // 动态加载 JavaScript 文件
        await import(fileUrl);
        const ItemList = Item.getAllItems();
        console.log(ItemList);

        console.log(`已加载并执行 ${modPath} 文件！`);
    } catch (err) {
        console.error(`加载或执行 ${modPath} 失败：${err.message}`);
    }
};