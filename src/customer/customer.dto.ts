import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CustomerQueryDto {
	@IsUUID()
	id: string;
}

export class CustomerBodyDto {
	@IsNumber()
	document: number;

	@IsString()
	name: string;
}
