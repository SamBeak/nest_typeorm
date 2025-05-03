import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from './entity/person.entity';
import { AirplaneModel, BookModel, CarModel, ComputerModel, SingleBaseModel } from './entity/inheritance.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Module({
  imports: [
	TypeOrmModule.forRoot({
		type: 'postgres',
		host: '127.0.0.1',
		port: 5432,
		username: 'postgres',
		password: 'postgres',
		database: 'postgres',
		entities: [
			UserModel,
			StudentModel,
			TeacherModel,
			BookModel,
			CarModel,
			SingleBaseModel,
			ComputerModel,
			AirplaneModel,
			ProfileModel,
			PostModel,
			TagModel,
		],
		synchronize: true,
	}),
	TypeOrmModule.forFeature([
		UserModel,
	])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
