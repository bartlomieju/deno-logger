import { ConsoleHandler } from './handlers/console.ts';
import { Logger } from './logger.ts';
import { LogLevel } from './levels.ts';

const DEFAULT_NAME = '__default';
const DEFAULT_CONFIG = {
    handlers: {
        [DEFAULT_NAME]: {
            level: LogLevel.DEBUG,
            class: ConsoleHandler,
        }
    },

    loggers: {
        [DEFAULT_NAME]: {
            handlers: [DEFAULT_NAME],
            level: LogLevel.DEBUG,
        }
    }
};

const state = {
    LOGGERS: new Map(),
    HANDLERS: new Map(),
    config: DEFAULT_CONFIG,
}

function createNewHandler(name) {
    let handlerConfig = state.config.handlers[name];
    
    if (!handlerConfig) {
        handlerConfig = state.config.handlers[DEFAULT_NAME];
    }

    const constructor = handlerConfig.class;
    const handler = new constructor(handlerConfig.level); 
    state.HANDLERS.set(name, handler);
    return handler;
}

function getHandler(name) {
    if (!state.HANDLERS.has(name)) {
        return createNewHandler(name);
    }

    return state.HANDLERS.get(name);
}

function createNewLogger(name) {
    let loggerConfig = state.config.loggers[name];

    if (!loggerConfig) {
        loggerConfig = state.config.loggers[DEFAULT_NAME];
    }

    const handlers = loggerConfig.handlers.map(handlerName => {
        return getHandler(handlerName);
    });

    return new Logger(loggerConfig.level, handlers);
}

export function getLogger(name) {
    if (!name) {
        name = DEFAULT_NAME;
    }

    if (!state.LOGGERS.has(name)) {
        return createNewLogger(name);
    }

    return state.LOGGERS.get(name);
}

