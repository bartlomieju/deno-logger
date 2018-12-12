import { LogLevel } from './levels.ts';

export class Logger {
    level: number;
    handlers: any[];

    constructor(level, handlers) {
        this.level = level;
        this.handlers = handlers;
    }

    _log(level, ...args) {
        this.handlers.forEach(handler => {
            console.log('handle', handler, level, ...args);
            handler.handle(level, ...args);
        });
    }

    log(level, ...args) {
        if (this.level > level) return;
        return this._log(level, ...args);
    }
    
    debug(...args) {
        return this.log(LogLevel.DEBUG, ...args);
    }

    info(...args) {
        return this.log(LogLevel.INFO, ...args);
    }

    warning(...args) {
        return this.log(LogLevel.WARNING, ...args);
    }

    error(...args) {
        return this.log(LogLevel.ERROR, ...args);
    }

    critical(...args) {
        return this.log(LogLevel.CRITICAL, ...args);
    }
}

