import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import Select, { ActionMeta, InputActionMeta } from 'react-select'
import styled from "styled-components";
import { chakra, Box, Checkbox, CheckboxGroup, Flex, Stack, Text, useCheckbox, useCheckboxGroup } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { AdminModules } from "../../../../../strings";
import { CreateRolePayload } from "../../../../../types/appTypes";
import { createRoleApi } from "../../../../../api/user.api";
import { statusEnum } from "../../../../../enums/util.enum";

interface props {
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
}

const CreateRoles: React.FC<props> = ({ setCurrentPage, currentPage }) => {
    const [roleName, setRoleName] = useState("")

    function CustomCheckbox(props) {
        const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
            useCheckbox(props)

        return (
            <Label
                display='flex'
                flexDirection='row'
                alignItems='center'
                gridColumnGap={2}
                px={3}
                py={1}
                mr={4}
                mb={3}
                cursor='pointer'
                {...htmlProps}
            >
                <input {...getInputProps()} hidden />
                <StyledFlex
                    alignItems='center'
                    justifyContent='center'
                    border='2px solid'
                    borderColor='green.500'
                    w={6}
                    h={6}
                    {...getCheckboxProps()}
                >
                    {state.isChecked && <StyledBox w={3} h={3} />}
                </StyledFlex>
                <StyledText {...getLabelProps()}>{props.value}</StyledText>
            </Label>
        )
    }

    const { value, getCheckboxProps } = useCheckboxGroup({
        // value: selectedModules,
    })

    const handleSubmit = async () => {
        const permissionsArray = value.map((x) => ({ name: x.toString() }))
        if (roleName === "" || permissionsArray.length === 0) {
            toast.error("Please fill all the fields")
            return
        }
        const objToSend: CreateRolePayload = {
            name: roleName,
            permissions: permissionsArray
        }
        const response = await createRoleApi(objToSend);
        if (response.code >= statusEnum.ok) {
            toast.success("Role created successfully");
            setCurrentPage(3)
        } else {
            toast.error(response.message);
        }
    }

    return (
        <RoleWrapper>
            <div className="col-md-6">
                <div className="form-group">
                    <label className="bmd-label-floating">Role Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        element-data="firstName"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                    />
                </div>
            </div>
            <CheckBoxWrapper>
                <CheckboxGroup>
                    <Flex wrap={"wrap"}>
                        {AdminModules.map((x, i) => (
                            <CustomCheckbox {...getCheckboxProps({ value: x.name })} key={i} />
                        ))}
                    </Flex>
                </CheckboxGroup>
                <ButtonWrapper>
                    <button
                        id="submitBtn"
                        className="btn btn-primary pull-right"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                    <div className="clearfix"></div>
                </ButtonWrapper>
            </CheckBoxWrapper>
        </RoleWrapper>
    )
}

export default CreateRoles

const RoleWrapper = styled.div`
    width: 100%;
`;

const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
    width: 100%;
`;

const Label = styled(chakra.label)`
    background: #fff !important;
    width: 160px !important;
`;

const StyledFlex = styled(Flex)`
    border: 1px solid #0b0146 !important;
`;

const StyledBox = styled(Box)`
    background: #0b0146 !important;
`;

const StyledText = styled(Text)`
    font-size: 18px !important;
    color: #999999 !important;
`;