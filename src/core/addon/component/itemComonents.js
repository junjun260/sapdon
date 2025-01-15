
export const ItemCompoment = {
    stable:{
        fuel:(duration)=>{
            return {
                "minecraft:fuel": {
                    "duration": duration
                },
            }
        },
        icon:(textures)=>{
            return {
                "minecraft:icon":{
                    "textures": textures
                }
            }
        }
    }
    
}