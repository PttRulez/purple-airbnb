import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { RoomModule } from './room/room.module';

@Module({
	imports: [TimetableModule, RoomModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
