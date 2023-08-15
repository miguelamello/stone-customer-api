import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('reference')
export class ReferenceController {
	private readonly md: any;

	constructor() {
		this.md = require('markdown-it')().use(require('markdown-it-named-headings'));
	}

	@Get()
	getReference(@Res() res: Response): void {
		const stylePath = join(__dirname, '..', 'reference', 'style.html');
		const refPath = join(__dirname, '..', 'reference', 'reference.md');
		const styleContent = fs.readFileSync(stylePath, 'utf-8');
		const markdownContent = fs.readFileSync(refPath, 'utf-8');
		const htmlContent = this.md.render(markdownContent);
		res.set('Content-Type', 'text/html');
		res.send(styleContent + htmlContent);
	}
}
