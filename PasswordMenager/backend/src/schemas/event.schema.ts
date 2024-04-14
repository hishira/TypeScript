import { Schema } from 'mongoose';
import { EventType, IEvent } from './Interfaces/event.interface';

const EventSchema = new Schema<IEvent>({
  created: {
    type: Date,
    default: Date.now(),
  },
  eventType: {
    type: String,
    enum: Object.values(EventType),
  },
  related_entity: {
    type: String,
  },
});

export default EventSchema;
