import * as mongoose from 'mongoose';
import { IGroup } from './Interfaces/group.interface';

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
});

export default GroupSchema