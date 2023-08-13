const cluster = require('cluster');
const os = require('os');
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

@Injectable()
export class ClusterService {
	static clusterize(callback: any): void {
		if (cluster.isMaster) {
			for (let i = 0; i < numCPUs; i++) {
				cluster.fork();
			}
		} else {
			callback();
		}
	}
}
