
const LEVEL = {
    OFF     : 0,
    WARN    : 1,
    INFO    : 2,
    DEBUG   : 3,
    TRACE   : 4
};
const Logger = {
    level: LEVEL.TRACE,
    error (e) {
        throw new Error(e);
    },
    warn () {
        if (this.level >= LEVEL.WARN) {
            try {
                console.warn.apply(this, ...arguments)
            } catch (e) {
                console.warn.apply(this, arguments)
            }
        }
    },
    info () {
        if (this.level >= LEVEL.INFO) {
            try {
                console.warn.apply(this, ...arguments)
            } catch (e) {
                console.warn.apply(this, arguments)
            }
        }
    },
    debug () {
        if (this.level >= LEVEL.DEBUG) {
            try {
                console.log.apply(this, ...arguments)
            } catch (e) {
                console.log.apply(this, arguments)
            }
        }
    },
    trace () {
        if (this.level >= LEVEL.TRACE) {
            try {
                console.log.apply(this, ...arguments);
            } catch (e) {
                console.log.apply(this, arguments)
            }
        }
    }
};
export default Logger;
export { LEVEL };
