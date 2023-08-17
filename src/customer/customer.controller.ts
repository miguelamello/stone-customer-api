import {
	Controller,
	Get,
	Post,
	Put,
	Body,
	Param,
	UseGuards,
	UseFilters,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerQueryDto, CustomerBodyDto } from './customer.dto';
import { BearerGuard } from '../guard/bearer.guard';
import { ContentTypeGuard } from '../guard/content-type.guard';
import { BadRequestFilter } from '../exception/exception.invalid.request';

@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	// Salvar um novo cliente
	@Post()
	@UseGuards(ContentTypeGuard)
	@UseGuards(BearerGuard)
	@UseFilters(BadRequestFilter)
	async postCostumer(@Body() customerBodyDto: CustomerBodyDto): Promise<any> {
		return this.customerService.postCostumer(customerBodyDto);
	}

	//Buscar um cliente por ID
	@Get(':id')
	@UseGuards(BearerGuard)
	async getCostumer(@Param() customerQueryDto: CustomerQueryDto): Promise<any> {
		return this.customerService.getCostumer(customerQueryDto.id);
	}

	// Atualizar um cliente
	@Put(':id')
	@UseGuards(ContentTypeGuard)
	@UseGuards(BearerGuard)
	@UseFilters(BadRequestFilter)
	async putCostumer(
		@Param() customerQueryDto: CustomerQueryDto,
		@Body() customerBodyDto: CustomerBodyDto,
	): Promise<any> {
		return this.customerService.putCostumer(customerQueryDto.id, customerBodyDto);
	}
}
