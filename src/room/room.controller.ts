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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROOM_NOT_FOUND } from './room.constants';
import { BookingService } from 'src/booking/booking.service';

@Controller('room')
export class RoomController {
	constructor(
		private readonly roomService: RoomService,
		private readonly bookingService: BookingService,
	) {}

	@Post('create')
	async create(@Body() dto: CreateRoomDto) {
		return this.roomService.create(dto);
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		const room = this.roomService.getById(id);
		if (!room) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return room;
	}

	@Patch(':id')
	async update(@Body() dto: UpdateRoomDto) {
		return this.roomService.update(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedRoom = await this.roomService.delete(id);
		if (!deletedRoom) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		this.bookingService.deleteByRoomId(id);
	}
}
