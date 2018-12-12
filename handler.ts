export class BaseHandler {
    level: number;

    constructor(level) {
        this.level = level;
    }

    _log(level, ...args) {
        // this method should be implemented by actual handler class
        throw Error("Not implemented");
    }

    handle(level, ...args) {
        if (this.level > level) return;
        return this._log(level, ...args);
    }
}

