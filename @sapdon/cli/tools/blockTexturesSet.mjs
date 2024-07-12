import fs from "fs";
import path from "path";

export async function generateBlockTextureJson(itemTexturesPath, outputPath) {
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
        const filePathList = filePath.split("/");
        const replacePath = filePathList[0]+"/"+filePathList[1]+"/"+filePathList[2]+"/";
        const textureData = { textures: filePath.replace(replacePath,"") };
        //console.log(replacePath);
        const fileName = path.basename(file, ".png");
        itemTexturesSet[fileName] = textureData;
      }
    }
  }

  const itemTextureJson = JSON.stringify({ 
        texture_name: "atlas.terrain",
        resource_pack_name: "sapdon",
        padding: 8,
        num_mip_levels: 4,
        texture_data: itemTexturesSet 
    },null,2);
  await fs.promises.writeFile(outputPath, itemTextureJson);
}