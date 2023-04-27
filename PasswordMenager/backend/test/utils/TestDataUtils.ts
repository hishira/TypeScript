import { Types } from 'mongoose';

class MongoObjectId {
  private id: Types.ObjectId;

  constructor(length = 32) {
    this.id = new Types.ObjectId(length);
  }

  toString() {
    return this.id.toString();
  }
}
export class TestDataUtils {
  static getRandomObjectId(length = 32): MongoObjectId {
    return new MongoObjectId(length);
  }

  static getRandomObjectIdAsString(length = 32): string {
    return new MongoObjectId(length).toString();
  }
}
