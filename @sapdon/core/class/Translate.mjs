
export const Translater = {
    languages:{},
    regsiterItemTranslater:function(ItemId,lang,text){
        if(!this.languages[lang]) this.languages[lang] = [];
        this.languages[lang].push(`item.${ItemId}=${text}`);
        this.languages[lang].push(`item.${ItemId}.name=${text}`);
    },
    regsiterBlockTranslater:function(BlockId,lang,text){
        if(!this.languages[lang]) this.languages[lang] = [];
        this.languages[lang].push(`tile.${BlockId}.name=${text}`);
    },
}

/*
Translater.regsiter("test:item","zh_CN","测试物品");
Translater.regsiter("test:item","en_US","test item");
Translater.createLang();
*/
//debugger

