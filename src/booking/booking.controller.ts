import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-bookign.dto';
import { BookingService } from './booking.service';
import { BOOKING_NOT_FOUND } from './booking.constants';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
	constructor(private readonly bookingService: BookingService) {}

	@Post('create')
	async create(@Body() dto: CreateBookingDto) {
		return this.bookingService.create(dto);
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		const booking = this.bookingService.getById(id);
		if (!booking) {
			throw new HttpException(BOOKING_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return booking;
	}

	@Patch(':id')
	async update(@Body() dto: UpdateBookingDto) {
		return this.bookingService.update(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedBooking = await this.bookingService.delete(id);
		if (!deletedBooking) {
			throw new HttpException(BOOKING_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byRoom/:roomId')
	async getByRoomId(@Param('roomId') roomId: string) {
		return this.bookingService.findByRoomId(roomId);
	}
}
