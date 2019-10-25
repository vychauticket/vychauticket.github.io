var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function (msg) {
        console.info(msg);
    };
    Logger.prototype.warn = function (msg) {
        console.warn(msg);
    };
    Logger.prototype.error = function (msg) {
        console.error(msg);
    };
    return Logger;
}());
export { Logger };
//# sourceMappingURL=log.js.map