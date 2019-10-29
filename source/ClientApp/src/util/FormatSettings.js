var FormatSettings = /** @class */ (function () {
    function FormatSettings() {
    }
    FormatSettings.toCamelCase = function (o) {
        var newO;
        if (o instanceof Array) {
            return o.map(function (value) {
                if (typeof value === "object") {
                    value = FormatSettings.toCamelCase(value);
                }
                return value;
            });
        }
        else {
            newO = new Object();
            var newKey = void 0;
            var value = void 0;
            for (var origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                    value = o[origKey];
                    if (value instanceof Array || (value !== null && value.constructor === Object)) {
                        value = FormatSettings.toCamelCase(value);
                    }
                    newO[newKey] = value;
                }
            }
        }
        return newO;
    };
    return FormatSettings;
}());
export { FormatSettings };
//# sourceMappingURL=FormatSettings.js.map