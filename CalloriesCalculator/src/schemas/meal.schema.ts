import {IProduct, Product} from './product.schema';
import Realm, {List} from 'realm';

export interface IMeal {
  _id: ObjectId;
  type: string;
  products: Realm.List<Product>;
  callories: number;
  fat: number;
  carbo: number;
  protein: number;
  wheneat: Date;
}

export type MealCreateDTO = {
  type: string;
  products?: IProduct[];
  callories: string;
  fat: string;
  carbo: string;
  protein: string;
  wheneat: Date;
};
const MealSchema: Realm.ObjectSchema = {
  name: 'Meal',
  properties: {
    _id: 'objectId',
    type: 'string',
    callories: 'double',
    fat: 'double',
    carbo: 'double',
    protein: 'double',
    products: {type: 'Product[]', default: []},
    wheneat: 'date',
  },
};
export class Meal implements IMeal {
  public static schema: Realm.ObjectSchema = MealSchema;
  public _id: ObjectId;
  public type: string;
  public products: Realm.List<Product>;
  public callories: number;
  public fat: number;
  public carbo: number;
  public protein: number;
  public wheneat: Date;

  constructor(
    type: string,
    callories: number,
    fat: number,
    carbo: number,
    protein: number,
    products: Realm.List<Product>,
  ) {
    this._id = new Realm.BSON.ObjectID();
    this.type = type;
    this.products = products;
    this.callories = callories;
    this.fat = fat;
    this.carbo = carbo;
    this.protein = protein;
    this.wheneat = new Date(Date.now());
  }
}
