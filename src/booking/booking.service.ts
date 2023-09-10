import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './booking.model';
import { CreateBookingDto } from './dto/create-bookign.dto';
import { Model, Types } from 'mongoose';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
	constructor(
		@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
	) {}

	async create(dto: CreateBookingDto): Promise<BookingDocument> {
		const existsAlready = await this.bookingModel.find({ date: dto.date });

		if (existsAlready) {
			throw new Error('На эту дату уже есть бронирование');
		}
		return this.bookingModel.create(dto);
	}

	async getById(id: string): Promise<BookingDocument | null> {
		return this.bookingModel.findById(id);
	}

	async update(dto: UpdateBookingDto): Promise<BookingDocument | null> {
		const existsAlready = await this.bookingModel.find({
			date: dto.date,
			roomId: dto.roomId,
			_id: { $ne: dto._id },
		});

		if (existsAlready) {
			throw new Error('На эту дату уже есть бронирование');
		}
		return this.bookingModel.findByIdAndUpdate(dto._id, dto);
	}

	async delete(id: string): Promise<BookingDocument | null> {
		return this.bookingModel.findByIdAndDelete(id).exec();
	}

	async findByRoomId(roomId: string): Promise<BookingDocument[]> {
		return this.bookingModel
			.find({ roomId: new Types.ObjectId(roomId) })
			.exec();
	}

	async deleteByRoomId(
		roomId: string,
	): Promise<{ acknowledged: boolean; deletedCount: number }> {
		return this.bookingModel
			.deleteMany({ roomId: new Types.ObjectId(roomId) })
			.exec();
	}
}
