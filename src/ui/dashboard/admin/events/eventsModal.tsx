import { ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { createEventTypeApi, getEventTypesApi } from '../../../../api/event.api';
import Modal from '../../../../components/modal';
import { statusEnum } from '../../../../enums/util.enum';
import { CreateEventTypePayload } from '../../../../types/appTypes';
import StyledInput from '../branchDashboard/components/styledInput';
import { StyledButton, NewUserHeader, SlidersBodyWrapper, SlidersModalContainer, SlidersModalHeaderContainer } from '../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
    setClosedEventModal: (value: boolean) => void;
}

const initialState = {
    type: '',
}

const EventsModal: React.FC<props> = ({ isOpen, closeModal, setClosedEventModal }) => {
    const [eventType, setEventType] = useState<CreateEventTypePayload>(initialState)
    const [eventTypes, setEventTypes] = useState<CreateEventTypePayload[]>([])

    useEffect(() => {
        getEventTypes()
    }, [])

    async function getEventTypes() {
        const response = await getEventTypesApi()
        if (response.code >= statusEnum.ok) {
            setEventTypes(response.data)
        } else {
            toast.error("Error getting event types");
        }
    }

    const handleClose = () => {
        closeModal();
        setClosedEventModal(true);
    };

    const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventType({ ...eventType, [e.target.name]: e.target.value })
    }

    const addEventType = async () => {
        const response = await createEventTypeApi(eventType);
        if (response.code >= statusEnum.ok) {
            toast.success("Event Type Created successfully");
            getEventTypes()
        } else {
            toast.error(response.message);
        }
        setEventType(initialState)
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="35vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>Manage Event Types</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => handleClose()}>x</span>
                </SlidersModalHeaderContainer>
                <SlidersBodyWrapper>
                    <AddWrapper>
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="form-control"
                                value={eventType.type}
                                onChange={handleAddInputChange}
                                name="type"
                            />
                        </div>
                        <AddButton onClick={addEventType}>Add</AddButton>
                    </AddWrapper>
                    <EntryContainer>
                        {eventTypes?.length > 0 && eventTypes.map((event, index) => (
                            <TypeItem key={index}>
                                {event.type}
                            </TypeItem>
                        ))}
                    </EntryContainer>
                </SlidersBodyWrapper>
            </SlidersModalContainer>
        </Modal>
    )
}

export default EventsModal

const AddWrapper = styled.div`
    display: flex;
    gap: 40px;
    align-items: center;
    margin-bottom: 40px;

    & input {
       font-size: 18px;
    }
`;

const AddButton = styled(StyledButton)`
    color: white;
    width: 120px;
    margin-top: 0;
    margin-bottom: 2px;
    height: 40px;
    opacity: 0.9;
    transition: all 0.3s ease-in-out;

    &:hover {
        opacity: 1;
    }
`;

const TypeItem = styled(StyledButton)`
    width: fit-content;
    height: 34px;
    color: #ffffff;
    padding: 5px 18px;
    font-size: 16px;
    margin-top: 0;
    border-radius: 7px;
    cursor: none;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.03);
    }
`;

const EntryContainer = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    padding: 0 10px;
    max-height: 200px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background: #000000;
    }
`;