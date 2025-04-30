import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

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
	
	@CreateDateColumn()
	createdAt: Date;
	
	@UpdateDateColumn()
	updatedAt: Date;
	
	@VersionColumn()
	version: number;
	
	@Column()
	@Generated("uuid")
	additionalId: string;
}