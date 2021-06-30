import {Product} from './product.schema';
import {Meal} from './meal.schema';
import Realm from 'realm';
export const GeneralRealm = new Realm({schema: [Meal.schema, Product.schema]});
