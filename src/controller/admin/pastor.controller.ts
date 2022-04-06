import { toast } from "react-toastify";
import { getAllPastorsApi } from "../../api/pastor.api";
import { getAllUsersApi, getUserApi, registerUser } from "../../api/user.api";
import PastorDTO from "../../dto/Pastor.dto";
import UserDTO from "../../dto/User.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { ISetUser } from "../../ui/dashboard/admin/user/editUser";
import { fakeModel, showAdminMessage, log } from "../../utils";

export class PastorController implements CRUDBL {
    async create(data: UserDTO) {

    }
    async read(set: ISetUser, id: number) {
        if (fakeModel) {

        }
        else {
        }
    }
    async update(data: UserDTO, id: number) {

    }
    async delete() {

    }
    async bulk() {

    }
    async list(setItems: Function) {

        const response = await getAllPastorsApi();
        console.log("pastor resp", response)
        if (response.code < statusEnum.ok) {
            toast.error(response.message.toString());
        }

        const data: PastorDTO[] = response?.data?.data;
        setItems(data);

    }
}

// export default async function getAllUsers(setItems:Function) {
//     if (fakeModel) {
//         console.log(UserData);
//         setItems(UserData);
//     }
//     else {
//         const response = await getAllUsersApi();
//         if (response.code < statusEnum.ok) {
//             toast.error(response.message);
//         }

//         const data:UserDTO[] = response?.data?.data;
//         setItems(data);
//     }
// }


// export async function addUser(setItems:Function) {
//     if (fakeModel) {
//         console.log(UserData);
//         setItems(UserData);
//     }
//     else {
//         const response = await getAllUsersApi();
//         if (response.code < statusEnum.ok) {
//             toast.error(response.message);
//         }

//         const data:UserDTO[] = response?.data?.data;
//         setItems(data);
//     }
// }