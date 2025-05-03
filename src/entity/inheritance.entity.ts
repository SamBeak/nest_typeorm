import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn, VersionColumn } from "typeorm";

export class BaseModel {
	@PrimaryGeneratedColumn()
	id: number;
	
	@CreateDateColumn()
	createdAt: Date;
	
	@UpdateDateColumn()
	updatedAt: Date;
	
	@VersionColumn()
	version: number;
}

@Entity()
export class BookModel extends BaseModel {
	@Column()
	name: string;
}

@Entity()
export class CarModel extends BaseModel {
	@Column()
	brand: string;
}

@Entity()
@TableInheritance(
	{
		column : {
			name: "type", // 하위의 테이블에 type이라는 컬럼을 추가하여 어떤 타입인지 구분할 수 있도록 한다.
			type: "varchar", // type은 varchar로 설정한다.
			enum: ["computer", "airplane"], // enum으로 설정하여 computer와 airplane만 가능하도록 한다.
		}
	}
)
export class SingleBaseModel {
	@PrimaryGeneratedColumn()
	id: number;
	
	@CreateDateColumn()
	createdAt: Date;
	
	@UpdateDateColumn()
	updatedAt: Date;
	
	@VersionColumn()
	version: number;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
	@Column()
	brand: string;
}

export class AirplaneModel extends SingleBaseModel {
	@Column()
	country: string;
}