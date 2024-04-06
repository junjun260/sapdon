
/**
 * 要实现的功能：根据textures路径下的items文件夹下的xxx.png文件，生成item_texture.json文件，
 * 文件内容为：{
 * "texture_data": {
 *   "xxx":{
 *		"textures":"textures/items/xxx"
     }
  }
*/

import fs from "fs";
import path from "path";

async function generateItemTextureJson(itemTexturesPath, outputPath) {
  const fileList = [];
  const directoryList = [itemTexturesPath];
  const itemTexturesSet = {};

  while (directoryList.length > 0) {
    const currentDirectory = directoryList.shift();
    const files = await fs.promises.readdir(currentDirectory);

    for (const file of files) {
      const filePath = currentDirectory+"/"+file;
      const fileStats = await fs.promises.stat(filePath);

      if (fileStats.isDirectory()) {
        directoryList.push(filePath);
      } 
      else if (file.endsWith(".png")) {
        const textureData = { textures: filePath.replace("./projects/thaumcraft/","") };
        const fileName = path.basename(file, ".png");
        itemTexturesSet[fileName] = textureData;
      }
    }
  }

  const itemTextureJson = JSON.stringify(
    { texture_data: itemTexturesSet },
    null,
    2
  );

  await fs.promises.writeFile(outputPath, itemTextureJson);
}

// Usage example:
const itemTexturesPath = "./projects/thaumcraft/textures/items";
const outputPath = "./projects/thaumcraft/textures/item_texture.json";

generateItemTextureJson(itemTexturesPath, outputPath)
  .then(() => {
    console.log("Item texture JSON file generated successfully.");
  })
  .catch((err) => {
    console.error("Error generating item texture JSON:", err);
});