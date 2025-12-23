/**
 * Development-only logger utility
 * In production, only errors are logged to avoid exposing internal logic
 */

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

export const logger = {
    /**
     * Log general information (development only)
     */
    log: (...args: any[]) => {
        if (isDev) {
            console.log(...args);
        }
    },

    /**
     * Log errors (always logged, even in production)
     */
    error: (...args: any[]) => {
        console.error(...args);
    },

    /**
     * Log warnings (development only)
     */
    warn: (...args: any[]) => {
        if (isDev) {
            console.warn(...args);
        }
    },

    /**
     * Log info messages (development only)
     */
    info: (...args: any[]) => {
        if (isDev) {
            console.info(...args);
        }
    },

    /**
     * Log debug messages (development only)
     */
    debug: (...args: any[]) => {
        if (isDev) {
            console.debug(...args);
        }
    },

    /**
     * Group logs (development only)
     */
    group: (label: string) => {
        if (isDev) {
            console.group(label);
        }
    },

    /**
     * End log group (development only)
     */
    groupEnd: () => {
        if (isDev) {
            console.groupEnd();
        }
    },

    /**
     * Log table (development only)
     */
    table: (data: any) => {
        if (isDev) {
            console.table(data);
        }
    },
};

/**
 * Performance logger for measuring execution time
 */
export const perfLogger = {
    start: (label: string) => {
        if (isDev) {
            console.time(label);
        }
    },

    end: (label: string) => {
        if (isDev) {
            console.timeEnd(label);
        }
    },
};

export default logger;
