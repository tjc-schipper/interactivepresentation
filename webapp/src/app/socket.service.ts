import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'localhost:3000';

@Injectable()
export class SocketService {

	private socket;

	constructor() {
		this.initSocket();
	}

	public getSocket() {
		return this.socket;
	}

	public initSocket() {
		this.socket = socketIo(SERVER_URL);
	}

	public send(message: string, data: any) {
		this.socket.emit(message, data);
	}

	public on(message: string, callback) {
		this.socket.on(message, callback);
	}

	public removeOn(message: string, callback) {
		this.socket.removeListener(message, callback);
	}

	public hasConnection() {
		return this.socket != null && this.socket.connected;
	}

}
