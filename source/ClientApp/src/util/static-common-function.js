var StaticCommonFunc = /** @class */ (function () {
    function StaticCommonFunc() {
    }
    StaticCommonFunc.equalObject = function (obj_1, obj_2) {
        var json_1 = typeof obj_1 === "string" ? obj_1 : JSON.stringify(obj_1);
        var json_2 = typeof obj_2 === "string" ? obj_2 : JSON.stringify(obj_2);
        if (json_1.length !== json_2.length) {
            return false;
        }
        else if (json_1.indexOf(json_2) < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    StaticCommonFunc.convertFromJsonDateToJsDate = function (strDate) {
        if (strDate != undefined && strDate.indexOf("/Date(") > -1) {
            return new Date(parseInt(String(strDate).replace("/Date(", "")));
        }
        return new Date(strDate);
    };
    StaticCommonFunc.getNowDate = function () {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };
    return StaticCommonFunc;
}());
export { StaticCommonFunc };
//# sourceMappingURL=static-common-function.js.map