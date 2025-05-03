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
		where: [ // 조건, {}에만 나열하면 AND 조건, 리스트로 제공할 경우 OR로 조회
			{ // and 조건
				id: 1,
				profile: {
					id: 1,
				},
			},
			// or 조건
			{
				id: 1,
			},
			{
				id: 2,
			},
		],
		order: { // 정렬
			id: 'ASC', // 오름차순
			profile: { // profile의 id로 정렬
				id: 'DESC', // 내림차순
			},
		},
		select: { // 가져올 컬럼
			id: true,
			profile: true,
		},
		relations: { // 가져올 관계
			profile: true, // profile도 같이 가져옴
		},
		skip: 0, // 건너뛸 개수
		take: 10, // 가져올 개수
	});
  }
  
  @Post('users')
  postUser() {
	return this.userRepository.save({
		title: 'test',
	});
  }
}
