
export const LogLevel = {
    DEBUG: 10,
    INFO: 20,
    WARNING: 30,
    ERROR: 40,
    CRITICAL: 50
};

const byName = {
    'DEBUG': LogLevel.DEBUG,
    'INFO': LogLevel.INFO,
    'WARNING': LogLevel.WARNING,
    'ERROR': LogLevel.ERROR,
    'CRITICAL': LogLevel.DEBUG,
};
