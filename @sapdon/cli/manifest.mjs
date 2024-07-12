export const pathConfig = {
  mojangPath: `C:/Users/${process.env.USERNAME}/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang`,
  mojangBetaPath:`C:/Users/${process.env.USERNAME}/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang`,
  projectsPath: './projects'
};

//C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang
class Manifest {
  constructor(version = 2, header = {}, modules = [], dependencies = []) {
    this.version = version;
    this.header = header;
    this.modules = modules;
    this.dependencies = dependencies;
  }

  toJSON() {
    return JSON.stringify({
      format_version: this.version,
      header: this.header,
      modules: this.modules,
      dependencies: this.dependencies
    }, null, 2);
  }
}


class Header {
  constructor(name = null, description = null, uuid = null, version = [], min_engine_version = []) {
    this.name = name;
    this.uuid = uuid;
    this.version = version;
    this.description = description;
    this.min_engine_version = min_engine_version;
  }

  toJSON() {
    return {
      name: this.name,
      uuid: this.uuid,
      version: this.version,
      description: this.description,
      min_engine_version: this.min_engine_version
    };
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export class Mod {
  config = {
    format_version: 2,
    path: null
  }
  
  constructor(mod_name, version, min_engine_version, descriptionInterce = {}) {
    this.mod_name = mod_name;
    this.version = version;
    this.min_engine_version = min_engine_version;
    this.descriptionInterce = descriptionInterce;

    const uuidBeh = generateUUID();
    const uuidRes = generateUUID();

    const headerBeh = new Header(this.mod_name, this.descriptionInterce.description, uuidBeh, this.version, this.min_engine_version).toJSON();
    const headerRes = new Header(this.mod_name, this.descriptionInterce.description, uuidRes, this.version, this.min_engine_version).toJSON();

    const createModule = (type, uuid) => ({
      "type": type,
      "uuid": uuid,
      "version": [1, 0, 0]
    });

    const modulesBeh = [createModule("data", generateUUID()), ...(this.descriptionInterce.scripts && this.descriptionInterce.scripts.sapi ? [{ type: "script", uuid: generateUUID(), entry: this.descriptionInterce.scripts.sapi, version: this.version }] : [])];
    const modulesRes = [createModule("resources", generateUUID())];

    const dependencies_BP = this.descriptionInterce.dependencies || [];
    const dependencies_RP = [];


    this.behManifest = new Manifest(this.config.format_version, headerBeh, modulesBeh, dependencies_BP);
    this.resManifest = new Manifest(this.config.format_version, headerRes, modulesRes, dependencies_RP);
  }
}