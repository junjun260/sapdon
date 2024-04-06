import fs from "fs";
import path from "path";


/**
 * 保存文件
 * @param {string} filePath 绝对路径
 * @param {string} data 数据
 */
export function saveFile(filePath,data){
  // 确保目录存在
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
    
  // 创建文件并写入内容
  fs.writeFile(filePath,data, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("文件创建成功。");
  });
}

export function copyFileMC(sourcePath, destinationPath) {
  // 确保目录存在
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

  // 检查源文件是否存在
  if (!fs.existsSync(sourcePath)) {
    console.log(`Source file ${sourcePath} does not exist.`);
    return;
  }

  // 创建可读流
  const readStream = fs.createReadStream(sourcePath);

  // 创建可写流
  const writeStream = fs.createWriteStream(destinationPath);

  // 复制文件
  readStream.pipe(writeStream);

  console.log(`File ${sourcePath} copied to ${destinationPath}.`);
}

export function copyFolder(sourcePath, destinationPath) {
  // 确保目录存在
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

  // 检查源路径是否存在
  if (!fs.existsSync(sourcePath)) {
    console.log(`Source path ${sourcePath} does not exist.`);
    return;
  }
  

  // 检查目标路径是否存在，如果不存在则创建它
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }

  // 获取源路径下的所有文件和文件夹
  
  const files = fs.readdirSync(sourcePath);

  // 遍历文件和文件夹
  files.forEach((file) => {
    const sourceFile = path.join(sourcePath, file);
    const destinationFile = path.join(destinationPath, file);

    // 判断是文件还是文件夹
    if (fs.lstatSync(sourceFile).isDirectory()) {
      // 如果是文件夹，则递归调用copyFolder函数
      copyFolder(sourceFile, destinationFile);
    } else {
      // 如果是文件，则直接复制到目标路径
      fs.copyFileSync(sourceFile, destinationFile);
    }
  });

  console.log(`Folder ${sourcePath} copied to ${destinationPath}.`);
}

// 递归遍历目录的函数
export function traverseDirectory(directory,fileName) {
  const files = fs.readdirSync(directory);
  const targetFiles = [];

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()&& file !== 'dist') {
      targetFiles.push(...traverseDirectory(filePath,fileName));
    } else if (stats.isFile() && file === fileName) {
      targetFiles.push(filePath);
    }
  });

  return targetFiles;
}


export function removeImportsFromFile(filePath) {
  // 读取文件内容
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 使用正则表达式替换所有的import语句为空字符串
  const withoutImports = fileContent.replace(/import.*?from\s+['"].*?['"];?/g, '');

  console.log(`已成功删除文件 ${filePath} 中的所有导入语句`);
  return withoutImports;
}

/*

export function createItemFile(item,mod_name){
  const itemId = item.identifier.split(":")[1];
  console.log(item.identifier);
  item.build();
  // 路径
  const mojangPath = pathConfig.mojangPath;
  const behPath = `${mojangPath}/development_behavior_packs/${mod_name}_BP`;
  const resPath = `${mojangPath}/development_resource_packs/${mod_name}_RP`;
  //保存备份文件
  const itemDataPath = `./projects/${mod_name}/dist/BP/items/${itemId}.json`;
  const itemResPath = `./projects/${mod_name}/dist/BP/items/${itemId}.json`;
  saveEctype(itemDataPath,item.behData.toJsonData());
  
  const item_behPath = behPath + "/items/" +itemId +'.json';
  const item_resPath = resPath + "/items/" +itemId +'.json';

  //写入mc
  saveFile(item_behPath,item.behData.toJsonData());
  console.log(item.behData.getFormatVersion());

  if(item.resData.getFormatVersion()!="1.16.100"){
    //只有格式版本不是1.16.100才创建Rp文件
    console.log("sssss");
    saveEctype(itemResPath,item.resData.toJsonData());
    saveFile(item_resPath,item.resData.toJsonData());
  }

  if(item.attachable){
    //只有物品具有Attachables才创建Attachables文件
    console.log("AttachablesT");
    const item_resPath_attachables = resPath + "/attachables/" +itemId +'.json';
    saveFile(item_resPath_attachables,item.attachable.attachableData.toJsonData());
    const AttachablesPath = `./projects/${mod_name}/dist/RP/attachables/${itemId}.json`;
    saveEctype(AttachablesPath,item.attachable.attachableData.toJsonData());
  }
}

export function createEntityFile(entity,mod_name){
  const entityId = entity.identifier.split(":")[1];
  const project = mod_name;
  //保存备份文件
  //beh
  const entitybehDataPath = `./projects/${mod_name}/dist/BP/entities/${entityId}.json`;
  saveEctype(entitybehDataPath,entity.fileData.behData.toJsonData());
  //res
  const entityresDataPath = `./projects/${mod_name}/dist/RP/entity/${entityId}.entity.json`;
  saveEctype(entityresDataPath,entity.fileData.resData.toJsonData());
  //游戏文件
  //beh
  const behPath = `${pathConfig.mojangPath}/development_behavior_packs/${project}_BP`;
  const entity_behPath = behPath + "/entities/" +entityId +'.json';
  //写入mc
  saveFile(entity_behPath,entity.fileData.behData.toJsonData());
  //beh
  const resPath = `${pathConfig.mojangPath}/development_resource_packs/${project}_RP`;
  const entity_resPath = resPath + "/entity/" +entityId +'.entity.json';
  //写入mc
  saveFile(entity_resPath,entity.fileData.resData.toJsonData());
}



export function createBlockFile(block,mod_name){
  const blockId = block.identifier.split(":")[1];
  const project = mod_name;
  //保存备份文件
  const blockDataPath = `./projects/${mod_name}/dist/BP/block/${blockId}.json`;
  saveEctype(blockDataPath,block.biuld());
  //游戏文件
  const behPath = `${pathConfig.mojangPath}/development_behavior_packs/${project}_BP`;
  const block_Path = behPath + "/blocks/" + blockId +'.json';
  //写入mc
  saveFile(block_Path,block.biuld());
}



export function createTestEntityFile(entity,mod_name){
  const entityId = entity.identifier.split(":")[1];
  const project = mod_name;
  //保存备份文件
  //beh
  const entitybehDataPath = `./projects/${mod_name}/dist/BP/entities/${entityId}.json`;
  saveEctype(entitybehDataPath,entity.behavior.toJsonData());
  //res
  const entityresDataPath = './dist/RP/entity/' + entityId + '.entity.json';
  saveEctype(entityresDataPath,entity.resource.toJsonData());
  //游戏文件
  //beh
  const behPath = `${pathConfig.mojangPath}/development_behavior_packs/${project}_BP`;
  const entity_behPath = behPath + "/entities/" +entityId +'.json';
  //写入mc
  saveFile(entity_behPath,entity.behavior.toJsonData());
  //beh
  const resPath = `${pathConfig.mojangPath}/development_resource_packs/${project}_RP`;
  const entity_resPath = resPath + "/entity/" +entityId +'.entity.json';
  //写入mc
  saveFile(entity_resPath,entity.resource.toJsonData());
}


*/