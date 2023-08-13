import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { NotAuthorizedException } from '../exception/exception.not.authorized';

// This Guard is used to check if the Bearer Token is present and valid
@Injectable()
export class AuthBearerGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly authService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const bearer = request.headers['authorization']; // Bearer Token

		if (!bearer || !bearer.startsWith('Bearer ')) {
			throw new NotAuthorizedException(); // No token or incorrect format
		}

		const token = bearer.match(/Bearer\s+(.+)/);

		if (!token || token.length === 1) {
			throw new NotAuthorizedException(); // No token or incorrect format
		}

		try {
			const hashedToken = await this.authService.getHashedToken(token[1]);
			if (token[1] != hashedToken) {
				throw new NotAuthorizedException(); // Tokens don't match
			}
			return true; // Access autorized
		} catch (error) {
			throw new NotAuthorizedException(); // Token expired
		}
	}
}
