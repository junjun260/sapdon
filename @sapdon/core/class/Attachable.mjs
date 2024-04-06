import { AttachableBuilder } from "../builders/EntityResourceBuilder.mjs";
 
export class Attachable extends AttachableBuilder{
  constructor(identifier, texture, geometry){
    super(identifier,"1.8.0");
    this.setMaterials('default','entity_alphatest');
    this.setTextures('default',texture);
    this.setGeometry('default',geometry);
  }
}