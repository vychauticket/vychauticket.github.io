import { subsite } from "../../../config/helpers";

export class Link {
    name: string;
    path: string;
    isRedirect: boolean;

    constructor(name: string, path: string, isSubsite: boolean = true, isRedirect: boolean) {
        this.name = name;
        this.path = isSubsite ? subsite(path) : path;
        this.isRedirect = isRedirect;
    }
}
