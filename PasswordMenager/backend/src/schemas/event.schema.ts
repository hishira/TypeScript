import { Schema } from 'mongoose';
import { EntityType, EventType, IEvent } from './Interfaces/event.interface';

const EventSchema = new Schema<IEvent>({
  created: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  eventType: {
    required: true,
    type: String,
    enum: Object.values(EventType),
  },
  entityType: {
    required: true,
    type: String,
    enum: Object.values(EntityType),
  },
  related_entity: {
    type: String,
  },
  payloadObject: {
    required: true,
    type: Schema.Types.Mixed,
    default: {},
  },
});

export default EventSchema;
