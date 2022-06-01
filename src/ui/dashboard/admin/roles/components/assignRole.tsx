import { useEffect, useState } from 'react';
import Select, { ActionMeta } from 'react-select'
import { toast } from 'react-toastify';
import { addUserToRoleApi, getAllRolesApi } from '../../../../../api/user.api';
import { UserController } from '../../../../../controller/admin/users.controller';
import UserDTO from '../../../../../dto/User.dto';
import { statusEnum } from '../../../../../enums/util.enum';
import { UserRolesResponse } from '../../../../../types/appTypes';

const AssignRole = () => {
    const _userTmp: UserDTO[] = [];
    let userController: UserController = new UserController();
    const [users, setUsers] = useState(_userTmp);
    const [roles, setRoles] = useState<UserRolesResponse[]>([]);
    const [roleId, setRoleId] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const init = async () => {
        const response = await getAllRolesApi();
        if (response.code >= statusEnum.ok) {
            setRoles(response?.data?.data);
        } else {
            toast.error("Error fetching roles");
        }
        userController.list(setUsers);
    };

    const rolesDropDownOptions = () => {
        const arr = [];
        roles?.map((x, i) => {
            arr.push({ value: x?.id, label: x?.name });
        })

        return arr
    }

    const onUserChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        setUserId(newValue.value);
    }

    const onRoleChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        setRoleId(newValue.value);
    }

    const dropDownOptions = () => {
        const arr = [];
        users.map((x, i) => {
            arr.push({ value: x?.id, label: `${x?.firstName} ${x?.lastName} (${x?.username})` });
        })

        return arr
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!userId || !roleId) {
            toast.error("Please select user and role");
            return;
        }
        const response = await addUserToRoleApi({ userId, roleId });
        if (response.code >= statusEnum.ok) {
            toast.success("User assigned successfully");
        } else {
            toast.error(response.message);
        }
    }

    return (
        <form id="form">
            <input type="hidden" element-data="key" value="category" />
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="bmd-label-floating">Select Role</label>
                        <Select options={rolesDropDownOptions()} onChange={onRoleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="bmd-label-floating">Select User</label>
                        <Select options={dropDownOptions()} onChange={onUserChange} />
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="row mt-2">
                <div className="col-md-12">
                    <button
                        type="submit"
                        id="submitBtn"
                        className="btn btn-primary pull-right"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Assign
                    </button>
                    <div className="clearfix"></div>
                </div>
            </div>
        </form>
    )
}

export default AssignRole