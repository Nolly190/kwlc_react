import React, { useEffect } from 'react';
import {
    Button, Drawer, DrawerOverlay, DrawerContent, DrawerBody,
    DrawerCloseButton, useDisclosure, DrawerHeader,
    Menu, MenuButton, MenuList, MenuItem, Icon
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AiFillGift } from "react-icons/ai";
import AdminNavItem from '../../../../components/admin-nav-item';
import { AdminNavArray } from '../../../../strings';
import { Logout } from '../../../../utils';
import styled from 'styled-components';

interface Props {
    title: string;
}

const AdminHamburger: React.FC<Props> = ({ title }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    let permissionsArray: string[] = [];

    if (typeof window !== 'undefined') {
        permissionsArray = JSON.parse(localStorage?.getItem("userData"))?.permissions
        // console.log("permisionsArray", permissionsArray);
    }

    return (
        <Container className='hamburgerMenu'>
            <Button ref={btnRef} onClick={onOpen}>
                <HamburgerIcon />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'xs'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {title}
                    </DrawerHeader>

                    <DrawerBody className='sidebar-wrapper'>
                        <SideLinksContainer>
                            <AdminNavItem
                                url="/admin"
                                iconTitle="dashboard"
                                title="Dashboard"
                            />
                            {AdminNavArray.filter((x) =>
                                permissionsArray?.map((x) => x.toLowerCase())
                                    .includes(x.name.toLowerCase())
                            ).sort((a, b) => a.name.localeCompare(b.name)).map((x, index) => (
                                <AdminNavItem
                                    key={index}
                                    url={x.url}
                                    iconTitle={x.iconTitle}
                                    title={x.title}
                                />
                            ))}
                            <AdminNavItem
                                action={() => Logout()}
                                url=""
                                iconTitle="exit_to_app"
                                title="Logout"
                            />
                        </SideLinksContainer>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </Container>
    )
}

export default AdminHamburger;

const Container = styled.div`
    & > button {
        color: #fff !important;
        background: #0b0146 !important;
        outline: none !important;

        &:focus {
            box-shadow: none !important;
        }
    }
`;

const SideLinksContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style-type: none;

    & > li > a {
        display: flex;
        gap: 10px;
        padding-left: 0 !important;
    }
`;