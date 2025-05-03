import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { ILike, Repository } from 'typeorm';
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
			// {
				// id: Not(1), // id가 1이 아닌 것
				// id: LessThan(10), // id가 10보다 작은 것
				// id: LessThanOrEqual(10), // id가 10보다 작거나 같은 것
				// id: MoreThan(10), // id가 10보다 큰 것
				// id: MoreThanOrEqual(10), // id가 10보다 크거나 같은 것
				// id: Equal(1), // id가 1인 것
				// id: Like('%test%'), // id가 test인 것
				// id: ILike('%test%'), // id가 test인 것 (대소문자 구분 없음)
				// id: IsNull(), // id가 null인 것
				// id: Between(1, 10), // id가 1과 10 사이인 것
				// id: In([1, 2, 3]), // id가 1, 2, 3인 것
			// },
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
  
  @Post('sample')
  async postSample() {
	// 모델에 해당하는 객체 생성 - 저장은 하지 않음
	const user1 = this.userRepository.create({
		title: 'sample1',
		profile: this.profileRepository.create({
			profileImg: 'sample1.png',
		}),
	});
	
	console.log(user1);
	
	// 실제 저장
	const user2 = await this.userRepository.save({
		title: 'sample2',
		profile: this.profileRepository.create({
			profileImg: 'sample2.png',
		}),
	})
	
	console.log(user2);
	
	// preload
	// 입력된 값을 기반으로 DB에 있는 데이터를 불러오고
	// 추가 입력된 값으로 DB에서 가져온 값들을 대체함
	// DB에 저장하지는 않음
	const user3 = await this.userRepository.preload({
		id: 1,
		title: 'sample3',
		profile: this.profileRepository.create({
			profileImg: 'sample3.png',
		}),
	});
	// user3는 DB에 있는 id가 1인 데이터를 불러오고
	// title을 sample3으로 변경하고
	// profileImg를 sample3.png로 변경함
	console.log(user3);
	
	await this.userRepository.increment({id: 1},'count', 1); // id가 1인 데이터의 count를 1 증가시킴
	
	await this.userRepository.decrement({id: 1},'count', 1); // id가 1인 데이터의 count를 1 감소시킴
	
	await this.userRepository.count(
		{
			where: {
				id: 1, // id가 1인 데이터의 개수를 세어줌
			}
		}
	)
	
	await this.userRepository.sum('count', {
		title: ILike('%test%'),
	});
	
	await this.userRepository.average('count', {
		title: ILike('%test%'),
	});
	
	await this.userRepository.minimum('count', {
		title: ILike('%test%'),
	});
	
	await this.userRepository.maximum('count', {
		title: ILike('%test%'),
	});
	
	return true; // user1은 저장되지 않음
  }
}
