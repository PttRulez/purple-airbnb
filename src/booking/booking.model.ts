import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Room } from 'src/room/room.model';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ id: true, timestamps: true })
export class Booking {
	@Prop()
	date: Date;

	@Prop({ type: MSchema.Types.ObjectId, ref: Room.name })
	roomId: Room;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
