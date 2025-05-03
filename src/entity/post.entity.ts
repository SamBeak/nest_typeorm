import { Column, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";
import { TagModel } from "./tag.entity";

export class PostModel {
	@PrimaryGeneratedColumn()
	id : number;
	
	@ManyToOne(() => UserModel, (user) => user.posts)
	author : UserModel;
	
	@ManyToMany(() => TagModel, (tag) => tag.posts)
	@JoinColumn()
	tags : TagModel[];
	
	@Column()
	title : string;
}