import Axios, { AxiosResponse } from "axios";

export async function isProcessExist(value) {
    if (!value) {
        return false;
    }

    var result = await processExistAxios(value);

    return result;
}

async function processExistAxios(value) {
    return await Axios.get("/ClientAlerting/Alert/ProcessExist", { params: { processname: value } })
        .then((response: AxiosResponse) => {
            if (response.data.result) {
                if (response.data.result === "Exist")
                    return true;
                if (response.data.result === "NExist")
                    return false;
            }
        }).catch(function (reason) {
            return false;
        });
}