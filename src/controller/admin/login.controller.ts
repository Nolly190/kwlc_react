import { loginApi } from "../../api/auth.api";
import { ResponseDTO } from "../../dto/response.dto";
import { writeToLocalStorage } from "../../utils";

export async function loginUser(username: string, password: string) {
    const response = new ResponseDTO();
    try {
        if (!username || !password) {
            response.responseMessage = "Please enter username and password";
            return response;
        }
        const result = await loginApi({ username, password });
        if (result.status) {
            writeToLocalStorage("userData", (JSON.stringify(result.data?.data)));
        }
        return result
    }
    catch (e) {
        console.log(e);
        response.responseMessage = e.toString();
    }
}