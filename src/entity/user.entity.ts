import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ProfileModel } from "./profile.entity";
import { PostModel } from "./post.entity";

enum Role {
	USER = "user",
	ADMIN = "admin",
	EDITOR = "editor",
}

@Entity()
export class UserModel {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	title: string;
	
	@Column(
		{
			type: "enum",
			enum: Role,
			default: Role.USER,
		}
	)
	role: Role;
	
	@CreateDateColumn()
	createdAt: Date;
	
	@UpdateDateColumn()
	updatedAt: Date;
	
	@VersionColumn()
	version: number;
	
	@Column()
	@Generated("uuid")
	additionalId: string;
	
	@OneToOne(() => ProfileModel, (profile) => profile.user, {
		eager: false, // true로 설정하면 UserModel을 조회할 때 ProfileModel도 함께 조회된다.
		cascade: false, // true로 설정하면 UserModel을 저장할 때 ProfileModel도 함께 저장된다.
		nullable: true, // true로 설정하면 ProfileModel이 null일 수 있다.
		onDelete: "CASCADE", // ProfileModel을 삭제할 때 UserModel 함께 삭제 
	})
	@JoinColumn()
	profile: ProfileModel;
	
	@OneToMany(() => PostModel, (post) => post.author)
	posts: PostModel[];
	
	@Column(
		{
			default: 0,
		}
	)
	count: number;
}