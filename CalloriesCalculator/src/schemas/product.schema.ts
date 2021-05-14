import Realm from 'realm';
export interface IProduct {
  _id: ObjectId;
  name: string;
  fatnumber: number;
  carbonumber: number;
  proteinnumber: number;
  calories: number;
  entity: string;
}

export type ProductDTO = {
  name: string;
  fatnumber: string;
  carbonumber: string;
  proteinnumber: string;
  calories: number;
  entity: string;
};
export const EmtryProductDTO: ProductDTO = {
  name: '',
  fatnumber: '0.0',
  carbonumber: '0.0',
  proteinnumber: '0.0',
  calories: 0.0,
  entity: 'gram',
};
const ProductSchema: Realm.ObjectSchema = {
  name: 'Product',
  properties: {
    _id: 'objectId',
    name: 'string',
    fatnumber: 'double',
    carbonumber: 'double',
    proteinnumber: 'double',
    calories: 'double',
    entity: {
      type: 'string',
      default: 'gram',
    },
  },
};
export class Product implements IProduct {
  public static schema: Realm.ObjectSchema = ProductSchema;
  public _id: ObjectId;
  public name: string;
  public fatnumber: number;
  public carbonumber: number;
  public proteinnumber: number;
  public calories: number;
  public entity: string;
  constructor(
    name: string,
    calories: number,
    fatnumber: number = 0,
    carbonumber: number = 0,
    proteinnumber: number = 0,
    entity: string = 'gram',
  ) {
    this.name = name;
    this.fatnumber = fatnumber;
    this.carbonumber = carbonumber;
    this.proteinnumber = proteinnumber;
    this.calories = calories;
    this._id = new Realm.BSON.ObjectID();
    this.entity = entity;
  }
}

export const ProductRealm = new Realm({schema: [Product.schema]});
