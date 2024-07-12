
/*
class UIControl {
    constructor(type,size){
        this.size = size;
        this.type = type;
    }
}
*/

export class TextControl{
    constructor(id,text,size,layer){
       this.id = id;
       this.type = "label";
       this.text = text;
       this.size = size;
       this.layer = layer;
    }
    setMaxSize(max_size_x,max_size_y){
        this.max_size = [max_size_x,max_size_y];
        return this;
    }
    setColor(r,g,b){
        this.color = [r/255,g/255,b/255];
        return this;
    }
    setShadow(shadow){
        this.shadow = shadow;
        return this;
    }
    setFontType(font_type){
        //smooth,OldSmoothFront:MinecraftTen
        this.font_type = font_type;
        return this;
    }
    setBackupFontType(back_font_type){
        this.back_font_type = back_font_type;
        return this;
    }
    setTextAlignment(text_aligment){
        //center,left,right
        this.text_aligment = text_aligment;
        return this;
    }
    setFontScale(font_size){
        this.font_scale_factor = font_size;
        return this;
    }
    setBinding(name,override){
        this.bindings = [
            {
                bindings_name:`#${name}`,
                bindings_name_override:`#${override}`
            }
        ]   
        return this;
    }
    build(){
        return JSON.stringify(this);
    }

}

export class ImageControl{
    constructor(id,texture_path,size,layer){
       this.id = id;
       this.type = "image";
       this.size = size;
       this.layer = layer;
       this.texture_path= texture_path;
    }
    setAlpha(alpha){
        this.alpha = alpha;
        return this;
    }
    setMaxSize(max_size_x,max_size_y){
        this.max_size = [max_size_x,max_size_y];
        return this;
    }
    setTiled(tiled){
        this.tiled = tiled;
        return this;
    }
    setFill(fill){
        this.fill = fill;
        return this;
    }
    setNinesliceSize(size){
        this.nineslice_size = size;
        return this;
    }
    setUvSize(size_x,size_y){
        this.uv_size =[size_x,size_y];
        return this;
    }
    setUv(uv){
        this.uv = uv;
        return uv;
    }

    setBinding(name,override){
        this.bindings = [
            {
                bindings_name:`#${name}`,
                bindings_name_override:`#${override}`
            }
        ]   
        return this;
    }
    build(){
        return JSON.stringify(this);
    }

}

export class AnimControl{
    constructor(type){
        this.anim_type = type;
    }
    setInitialUV(){
        this.initial_uv =initial_uv;
        return this;
    }
    setFps(fps){
        this.fps = fps;
        return this;
    }
    setEasing(easing){
        this.easing = easing;
        return this;
    }
    setRreversible(reversible){
        this.reversible = reversible;
        return this;
    }
}

export class PanelControl{
    constructor(id){
        this.id = id;
        this.type = "panel";
        this.controls = [];
    }
    setControls(controls){
        this.controls = controls;
    }
    setSize(size_x,size_y){
        this.size =[size_x,size_y];
        return this;
    }
    addControl(name,control){
        this.controls.push({
            [name]:control
        });
        return this;
    }
}

export class StackPanelControl extends PanelControl{
    constructor(orientation){
        super();
        this.type = "stack_panel";
        this.orientation = orientation;
    }
}

export class InputPanelControl extends PanelControl{
    constructor(orientation){
        super();
        this.type = "input_panel";
        this.orientation = orientation;
    }
    setModal(modal){
        this.modal = modal;
        return this;
    }
    setInlineModal(inline_modal){
        this.inline_modal = inline_modal;
        return this;
    }
    setPreventTouchInput(prevent_touch_input){
        this.prevent_touch_input =prevent_touch_input;
        return this;
    }
}

export class ButtonControl{
    constructor(id,text,size,layer){
       this.id = id;
       this.type = "label";
       this.text = text;
       this.size = size;
       this.layer = layer;
    }
    setMaxSize(max_size_x,max_size_y){
        this.max_size = [max_size_x,max_size_y];
        return this;
    }
    setColor(r,g,b){
        this.color = [r/255,g/255,b/255];
        return this;
    }
    setShadow(shadow){
        this.shadow = shadow;
        return this;
    }
    setFontType(font_type){
        //smooth,OldSmoothFront:MinecraftTen
        this.font_type = font_type;
        return this;
    }
    setBackupFontType(back_font_type){
        this.back_font_type = back_font_type;
        return this;
    }
    setTextAlignment(text_aligment){
        //center,left,right
        this.text_aligment = text_aligment;
        return this;
    }
    setFontScale(font_size){
        this.font_scale_factor = font_size;
        return this;
    }
    setBinding(name,override){
        this.bindings = [
            {
                bindings_name:`#${name}`,
                bindings_name_override:`#${override}`
            }
        ]   
        return this;
    }
    build(){
        return JSON.stringify(this);
    }

}

export class CommonButtonControl{
    constructor(id,text,size,layer){
        this.id = `${id}@common.button`;
        this.controls = [];
    }
    setControls(controls){
        this.controls = controls;
        return this;
    }
    setSize(size){
        this.size = size;
        return size;
    }
    setPressedButtonName(pressed_button_name){
        this["$pressed_button_name"] = pressed_button_name;
        return this;
    }
    setDefaultControl(default_control){
        const control = {[`default@${default_control.id}`]: default_control};
        this.controls.push(control);
        return this;
    }
    setHoverControl(hover_control){
        const control = {[`hover@${hover_control.id}`]: hover_control};
        this.controls.push(control);
        return this;
    }
    setPressedControl(pressed_control){
        const control = {[`pressed@${pressed_control.id}`]: pressed_control};
        this.controls.push(control);
        return this;
    }
    build(){
        return JSON.stringify(this);
    }
}

export class HudScreen {
    static hud_screen = {};
    static modifications = [];
    static setRootPanel(root_panel){
        this.hud_screen.root_panel = root_panel;
    }
    static setModifications(){
        const root_panel ={
            modifications:this.modifications
        };
        this.setRootPanel(root_panel);
    }
    static addControlToModi(array_name,operation,value){
        this.modifications.push({
            "array_name": array_name,
            "operation": operation,
            "value": value
        });
        this.setModifications();
    }
    static addControl(name, control){
        this.hud_screen[control.id] = control;
        this.addControlToModi("controls","insert_back",[{[`${name}@hud.${control.id}`]:{}}]);
    }
    static build(){
        return JSON.stringify(this.hud_screen,null,2);
    }
}

/*
const image = new ImageControl("image","textures/items/apple",["100%","100%"],3);
const panel = new PanelControl("panel_test");
      panel.setSize(100,100);
      panel.addControl("test",image);

const button = new CommonButtonControl("button");
      button.setSize([32,32]);
      button.setPressedButtonName("button.menu_achievements");
      button.setDefaultControl(panel);
HudScreen.hud_screen[image.id] = image;
HudScreen.hud_screen[panel.id] = panel;
HudScreen.hud_screen[button.id] = button;
HudScreen.addControlToModi("controls","insert_back",[{[button.id]:{}},{[panel.id]:{}}])
console.log(HudScreen.build())
*/
/*
const text = new TextControl("text","hello World",[32,32],1)
      .setColor(0,100,255)
      .setShadow(true)

HudScreen.addControl("test001",text);

console.log(HudScreen.build())
*/