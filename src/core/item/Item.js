import { ItemCompoment } from "../addon/component/itemComonents.js";
import { AddonItem, AddonItemDefinition, AddonItemDescription } from "../addon/item/item.js";
import { AddonMenuCategory } from "../addon/menu_category.js";

export class Item {
    constructor(identifier, category, texture, options = {}) {
        // 参数校验
        if (!identifier || !category || !texture) {
            throw new Error("identifier, category, and texture are required");
        }

        this.identifier = identifier;
        this.category = category;
        this.texture = texture;
        this.group = options.group;
        this.hide_in_command = options.hide_in_command || false; // 默认值为 false
        this.components = new Map();

        // 初始化默认组件
        this.addComponent("minecraft:icon", ItemCompoment.stable.icon(this.texture));
    }

    /**
     * 添加组件
     * @param {string} key - 组件名称
     * @param {object} value - 组件值
     */
    addComponent(key, value) {
        if (!key || !value) {
            throw new Error("key and value are required");
        }
        this.components.set(key, value);
    }

    /**
     * 移除组件
     * @param {string} key - 组件名称
     */
    removeComponent(key) {
        if (!key) {
            throw new Error("key is required");
        }
        this.components.delete(key);
    }

    /**
     * 将物品转换为 JSON 格式
     * @returns {object} - 物品的 JSON 数据
     */
    toJson() {
        const item = new AddonItem(
            "1.21.40", // 版本号
            new AddonItemDefinition(
                new AddonItemDescription(
                    this.identifier,
                    new AddonMenuCategory(
                        this.category,
                        this.group,
                        this.hide_in_command
                    )
                ),
                Object.fromEntries(this.components) // 将 Map 转换为普通对象
            )
        );
        return item.toJson();
    }
}

// 示例用法
/*
const item = new Item("sapdon:test", "items", "masterball", {
    group: "tools",
    hide_in_command: true
});

// 添加自定义组件
item.addComponent("minecraft:fuel", { duration: 60 });

console.log(JSON.stringify(item.toJson(), null, 2));
debugger;
*/