import React, { useEffect, useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import { getAllRolesApi, getRolePermissionApi } from '../../../../../api/user.api';
import { UserRolesResponse } from '../../../../../types/appTypes';
import styled from "styled-components";
import { chakra, Box, CheckboxGroup, Flex, Text, useCheckbox, useCheckboxGroup } from "@chakra-ui/react";
import { AdminModules } from '../../../../../strings';
import { statusEnum } from '../../../../../enums/util.enum';
import { toast } from 'react-toastify';

const ViewRoles = () => {
    const [selectedModules, setSelectedModules] = useState<string[]>([])
    const [roles, setRoles] = useState<UserRolesResponse[]>([]);

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
        const response = await getRolePermissionApi(newValue.value);
        if (response.code >= statusEnum.ok) {
            setSelectedModules(response?.data?.data?.permmissions);
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
                <input {...getInputProps()} hidden disabled={true} />
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