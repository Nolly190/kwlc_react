import { getAllUsersApi, getUserApi, registerUser } from "../../api/user.api";
import UserDTO from "../../dto/User.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { UserData } from "../../testModel";
import { ISetUser } from "../../ui/dashboard/admin/user/editUser";
import { fakeModel, showAdminMessage, log } from "../../utils";
import { toast } from "react-toastify";
export class UserController implements CRUDBL {
    async create(data: UserDTO) {
        if (!data.email || !data.firstName || !data.lastName || !data.username) {
            toast.error("Please fill all fields");
            return;
        }

        if (fakeModel) {
            // console.log(UserData);
            // setItems(UserData);
            toast.success("User Created");
        }
        else {
            registerUser(data).then((response) => {
                log("earlydev", response);
                if (response.code >= statusEnum.ok) {
                    toast.success("User Creation was successful");

                }
                else {
                    toast.error("User Creation failed");
                }
            });
            // toast.success("User Creation request Sent");
        }
    }
    async read(set: ISetUser, id: number) {
        if (fakeModel) {
            const data = UserData[id];
            set.setUsername(data.username);
            set.setEmail(data.email);
            set.setFirstName(data.firstName);
            set.setLastName(data.lastName);
        }
        else {
            const response = await getUserApi(id);
            if (response.code < statusEnum.ok) {
                toast.error(response.message);
            }

            const data: UserDTO = response?.data;

            set.setUsername(data?.username);
            set.setEmail(data?.email);
            set.setFirstName(data?.firstName);
            set.setLastName(data?.lastName);
        }
    }
    async update(data: UserDTO, id: number) {

    }
    async delete() {

    }
    async bulk() {

    }
    async list(setItems: Function) {
        if (fakeModel) {
            console.log(UserData);
            setItems(UserData);
        }
        else {
            const response = await getAllUsersApi();
            console.log("users", response)
            if (response.code < statusEnum.ok) {
                toast.error(response.message)
            }

            const data: UserDTO[] = response?.data?.data;
            log("earlydev", data);
            setItems(data);
        }
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