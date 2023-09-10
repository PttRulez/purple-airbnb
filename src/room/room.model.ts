import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

export enum RoomType {
	Standard,
	Deluxe,
	Luxury,
	President,
}

@Schema({ id: true })
export class Room {
	@Prop({ unique: true })
	number: number;

	@Prop({ enum: RoomType })
	type: RoomType;

	@Prop()
	numberOfBeds: number;

	@Prop()
	hasSeaview: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
