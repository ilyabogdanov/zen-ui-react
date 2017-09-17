import Logger from "./Logger";
import { UTILS_MESSAGES } from "./Messages";

const REGEXP = {
    padding: /^(0|[1-9]\d*px)$|^((0|[1-9]\d*px)\s(0|[1-9]\d*px))$|^(((0|[1-9]\d*px)\s){3}(0|[1-9]\d*px))$/i,
    pixelValue: /^([1-9](\d*))(px)$/i,
    remValue: /^((0|[1-9](\d*)))(\.[0-9]+)?(rem)$/i,
    percentValue: /^((0|[1-9](\d*)))(\.[0-9]+)?(%)$/i,
    ratioValue: /^([1-9](\d*))$/i,
}
const SAFE_STYLE = [
    "opacity",
    "background",
    "whiteSpace"
];
const Utils = {
    id: 0,
    idPrefix: "zen-ui-id-",
    generateId: function (e) {
        return this.idPrefix+(++this.id);
    },
    isArray: function (e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    },
    isDefined: function (e) {
        return typeof e !== "undefined";
    },
    isUndefined: function (e) {
        return typeof e === "undefined";
    },
    isValidPadding: function (e) {
        return REGEXP.padding.test(e);
    },
    isPercentValue: function (e) {
        return REGEXP.percentValue.test(e);
    },
    isRemValue: function (e) {
        return REGEXP.remValue.test(e);
    },
    isPixelValue: function (e) {
        return REGEXP.pixelValue.test(e);
    },
    isRatioValue: function (e) {
        return REGEXP.ratioValue.test(e);
    },
    isZero: function (e) {
        return e===0||e==="0";
    },
    getPercentValue: function (e) {
        let result = REGEXP.percentValue.exec(e);
        if (!result) {
            return null;
        }
        if (typeof result[4]==="undefined") {
            return parseInt(result[1]+result[5]);
        } else {
            return parseFloat(result[1]+result[4]+result[5]);
        }
    },
    isSafeStyle: function (e) {
        return typeof e === "string" && SAFE_STYLE.indexOf(e) !== -1;
    },
    setSafeStyle: function (src, dest) {
        if (!src || src === {} || typeof src !== "object") {
            // silence
        } else if (!dest || typeof dest !== "object") {
            Logger.error(UTILS_MESSAGES.NO_STYLE_DEST);
        } else {
            for (var e in src) {
                if (this.isSafeStyle(e)) {
                    dest[e] = src[e];
                }
            }
        }
    }
};
export default Utils;
