export class StaticCommonFunc {
    private constructor() { }

    public static equalObject(obj_1: any | string, obj_2: any | string): boolean {
        var json_1 = typeof obj_1 === "string" ? obj_1 : JSON.stringify(obj_1);
        var json_2 = typeof obj_2 === "string" ? obj_2 : JSON.stringify(obj_2);

        if (json_1.length !== json_2.length) {
            return false;
        } else if (json_1.indexOf(json_2) < 0) {
            return false;
        } else {
            return true;
        }
    }

    public static convertFromJsonDateToJsDate(strDate: string) {
        if (strDate != undefined && strDate.indexOf("/Date(") > -1) {
            return new Date(parseInt(String(strDate).replace("/Date(", "")));
        }
        return new Date(strDate);
    }

    public static getNowDate(): Date {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
}
