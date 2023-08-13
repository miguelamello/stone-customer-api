import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get(':email')
	getAuth(@Param() authDto: AuthDto): any {
		return this.authService.getAuth(authDto.email);
	}

	@Post()
	setAuth(@Body() authDto: AuthDto): any {
		return this.authService.setAuth(authDto.email);
	}
}
