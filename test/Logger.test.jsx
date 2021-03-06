import React from "react";
import Logger, { LEVEL } from "../src/Logger";

describe("Logger", () => {

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");
    // noinspection JSCheckFunctionSignatures
    const warnSpy = jest.spyOn(console, "warn");

    test("should output only messages with the level equal to or more important than the current one", () => {

        Logger.level = LEVEL.TRACE;
        Logger.trace("log 1");
        Logger.debug("log 2");
        Logger.info("warn 1");
        Logger.warn("warn 2");
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(warnSpy).toHaveBeenCalledTimes(2);
        logSpy.mockReset();
        warnSpy.mockReset();

        Logger.level = LEVEL.DEBUG;
        Logger.trace("log 0");
        Logger.debug("log 1");
        Logger.info("warn 1");
        Logger.warn("warn 2");
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledTimes(2);
        logSpy.mockReset();
        warnSpy.mockReset();

        Logger.level = LEVEL.INFO;
        Logger.trace("log 0");
        Logger.debug("log 0");
        Logger.info("warn 1");
        Logger.warn("warn 2");
        expect(logSpy).toHaveBeenCalledTimes(0);
        expect(warnSpy).toHaveBeenCalledTimes(2);
        logSpy.mockReset();
        warnSpy.mockReset();

        Logger.level = LEVEL.WARN;
        Logger.trace("log 0");
        Logger.debug("log 0");
        Logger.info("warn 0");
        Logger.warn("warn 1");
        expect(logSpy).toHaveBeenCalledTimes(0);
        expect(warnSpy).toHaveBeenCalledTimes(1);
        logSpy.mockReset();
        warnSpy.mockReset();

        Logger.level = LEVEL.OFF;
        Logger.trace("log 0");
        Logger.debug("log 0");
        Logger.info("warn 0");
        Logger.warn("warn 0");
        expect(logSpy).toHaveBeenCalledTimes(0);
        expect(warnSpy).toHaveBeenCalledTimes(0);
        logSpy.mockReset();
        warnSpy.mockReset();
    });
    test("with any level should throw error", () => {
        Logger.level = LEVEL.OFF;
        expect(() => {
            Logger.error("123");
        }).toThrowError(/123/);
    });
});