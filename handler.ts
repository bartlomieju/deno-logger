import { getLevelByName } from "./levels";

export abstract class BaseHandler {
    level: number;
    levelName: string;

    constructor(levelName) {
        this.level = getLevelByName(levelName);
        this.levelName = levelName;
    }

    handle(level, ...args) {
        if (this.level > level) return;
        return this._log(level, ...args);
    }

    abstract _log(level, ...args);
}

