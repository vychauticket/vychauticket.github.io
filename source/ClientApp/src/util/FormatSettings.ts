
export abstract class FormatSettings {
    static toCamelCase(o: Object) {
        let newO: Object;
        
        if (o instanceof Array) {
          return o.map(function(value) {
              if (typeof value === "object") {
                value = FormatSettings.toCamelCase(value);
              }
              return value;
          })
        } else {
          newO = new Object();
          let newKey: string;
          let value: any;
    
          for (let origKey in o) {
            if (o.hasOwnProperty(origKey)) {
              newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
              value = o[origKey]
              if (value instanceof Array || (value !== null && value.constructor === Object)) {
                value = FormatSettings.toCamelCase(value);
              }
              newO[newKey] = value;
            }
          }
        }
        return newO;
    }
}
