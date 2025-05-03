import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostModel } from "./post.entity";

export class TagModel {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	name: string;
	
	@ManyToMany(() => PostModel, (post) => post.tags)
	posts: PostModel[];
}