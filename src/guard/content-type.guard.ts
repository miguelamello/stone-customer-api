import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ContentTypeMissingException } from '../exception/exception.content.type.missing';

// This Guard is used to check if the Content-Type header is present and valid
@Injectable()
export class ContentTypeGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const contenttype = request.headers['content-type'];

		if (!contenttype || contenttype !== 'application/json') {
			throw new ContentTypeMissingException(); // Content-type missing or incorrect format
		}

		return true;
	}
}
