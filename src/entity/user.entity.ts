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
	
	@OneToOne(() => ProfileModel, (profile) => profile.user)
	@JoinColumn()
	profile: ProfileModel;
	
	@OneToMany(() => PostModel, (post) => post.author)
	posts: PostModel[];
}