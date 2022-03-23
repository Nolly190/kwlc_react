import { toast } from "react-toastify";
import { loginApi } from "../../api/auth.api";
import { ResponseDTO } from "../../dto/response.dto";
import { statusEnum } from "../../enums/util.enum";
import { fakeModel, log, showAdminMessage, showMessage, writeToLocalStorage } from "../../utils";

export async function loginUser(username: string, password: string) {
    const response = new ResponseDTO();
    try {
        if (!username || !password) {
            toast.error("Please provide username and password");
            return;
        }

        if (fakeModel) {
            toast.success("login ok");
            setTimeout(() => {
                window.location.href = "/admin/";
            }, 1500);
        }
        else {
            const result = await loginApi({ username, password });
            if (result.status) {
                writeToLocalStorage("userData", (JSON.stringify(result.data)));
            }
            return result

            // if (result.code < statusEnum.ok) {
            //     response.code = result.code;
            //     response.extra_data = result.extra_data;
            // }
            // else {
            //     response.code = statusEnum.successful;
            //     writeToLocalStorage("userData", (JSON.stringify(result.data)));
            //     return result
            // }
        }
    }
    catch (e) {
        console.log(e);
        response.extra_data = e.toString();
    }
}