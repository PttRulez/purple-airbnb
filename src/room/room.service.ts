import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './room.model';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
	constructor(
		@InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
	) {}

	async create(dto: CreateRoomDto): Promise<RoomDocument> {
		return this.roomModel.create(dto);
	}

	async getById(id: string): Promise<RoomDocument | null> {
		return this.roomModel.findById(id);
	}

	async update(dto: UpdateRoomDto): Promise<RoomDocument | null> {
		return this.roomModel.findByIdAndUpdate(dto._id, dto);
	}

	async delete(id: string): Promise<RoomDocument | null> {
		return this.roomModel.findByIdAndDelete(id).exec();
	}
}
