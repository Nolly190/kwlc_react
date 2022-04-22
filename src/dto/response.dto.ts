import { statusEnum } from "../enums/util.enum";

export class ResponseDTO {
    status: boolean = false;
    data: any = [];
    message: string = "";
    responseMessage: string = "";
    code: number = statusEnum.failed;


    getResponse = () => {
        this.status = this.code > statusEnum.failed;
        if (this.code == statusEnum.error) {
            this.message = "An error occured";
        }
        return this;
    }
}