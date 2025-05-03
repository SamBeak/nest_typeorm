import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
	@InjectRepository(UserModel)
	private readonly userRepository: Repository<UserModel>,
	private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Get('users')
  getUsers() {
	return this.userRepository.find({
		relations: {
			profile: true, // profile도 같이 가져옴
		}
	});
  }
  
  @Post('users')
  postUser() {
	return this.userRepository.save({
		title: 'test',
	});
  }
}
