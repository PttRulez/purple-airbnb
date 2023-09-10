import { RoomType } from '../room.model';

export class CreateRoomDto {
	number: number;
	type: RoomType;
	numberOfBeds: number;
	hasSeaview: boolean;
}
