import { Controller, Body, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContentTypeGuard } from '../guard/content-type.guard';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get(':email')
	getAuth(@Param() authDto: AuthDto): any {
		return this.authService.getAuth(authDto.email);
	}

	@Post()
	@UseGuards(ContentTypeGuard)
	setAuth(@Body() authDto: AuthDto): any {
		return this.authService.setAuth(authDto.email);
	}
}
