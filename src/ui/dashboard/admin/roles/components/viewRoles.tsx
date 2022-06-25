import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import { createRoleApi, editPermissionApi, getAllRolesApi, getRolePermissionApi } from '../../../../../api/user.api';
import { CreateRolePayload, EditRolePayload, UserRolesResponse } from '../../../../../types/appTypes';
import styled from "styled-components";
import { chakra, Box, CheckboxGroup, Flex, Text, useCheckbox, useCheckboxGroup } from "@chakra-ui/react";
import { AdminModules } from '../../../../../strings';
import { statusEnum } from '../../../../../enums/util.enum';
import { toast } from 'react-toastify';
import { ButtonWrapper } from './createRoles';

interface props {
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

const ViewRoles: React.FC<props> = ({ setCurrentPage }) => {
    const [selectedModules, setSelectedModules] = useState<string[]>([])
    const [roles, setRoles] = useState<UserRolesResponse[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    const [roleId, setRoleId] = useState(0)


    useEffect(() => {
        async function getRoles() {
            const response = await getAllRolesApi();
            if (response.code >= statusEnum.ok) {
                setRoles(response?.data?.data);
            } else {
                toast.error("Error fetching roles");
            }
        }
        getRoles();
    }, []);

    const onChange = async (newValue: any, actionMeta: ActionMeta<any>) => {
        setRoleId(newValue.value);
        const response = await getRolePermissionApi(newValue.value);
        if (response.code >= statusEnum.ok) {
            setSelectedModules(response?.data?.data?.permissions);
        } else {
            toast.error("Error fetching role permissions");
        }
    }

    const dropDownOptions = () => {
        const arr = [];
        roles?.map((x, i) => {
            arr.push({ value: x?.id, label: x?.name });
        })

        return arr
    }

    const handleChange = (value: string[]) => {
        if (roleId === 0) {
            toast.error("Please select a role")
            return
        }

        setSelectedModules([...value])
    }

    const handleSubmit = async () => {
        if (!isEditable) {
            setIsEditable(true);
            return;
        }
        const permissionsArray = value.map((x) => (x.toString()))
        if (roleId === 0 || permissionsArray.length === 0) {
            toast.error("Please fill all the fields")
            return
        }
        const objToSend: EditRolePayload = {
            roleId: roleId,
            permissions: permissionsArray
        }
        const response = await editPermissionApi(objToSend);
        if (response.code >= statusEnum.ok) {
            toast.success("Role updated successfully");
            setCurrentPage(3)
        } else {
            toast.error(response.message);
        }
    }

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
                <input {...getInputProps()} hidden disabled={!isEditable} />
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
        value: selectedModules,
        onChange: handleChange
    })

    return (
        <Container>
            <Select options={dropDownOptions()} onChange={onChange} />
            <CheckboxGroup>
                <Flex wrap={"wrap"} marginTop={"20px"}>
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
                    {isEditable ? "Update" : "Edit"}
                </button>
                <div className="clearfix"></div>
            </ButtonWrapper>
        </Container>
    )
}

export default ViewRoles

const Container = styled.div`
    margin-top: 20px;
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