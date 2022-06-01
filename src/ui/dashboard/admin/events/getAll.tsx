import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BlogController } from "../../../../controller/admin/blog.controller";
import { BlogDTO } from "../../../../dto/Blog.dto";
import AdminLayout from "../admin.layout";
import ConfirmationModal from "../../../../components/confirmationModal";
import { useDisclosure } from "@chakra-ui/react";
import DualRing from "../../../../components/loader";
import styled from "styled-components";
import EventsModal from "./eventsModal";
import { EventsResponse, EventTypeResponse } from "../../../../types/appTypes";
import { EventsController } from "../../../../controller/admin/events.controller";
import Select, { ActionMeta } from 'react-select'
import { getEventsApi, getEventsByTypeApi, getEventTypesApi } from "../../../../api/event.api";
import { statusEnum } from "../../../../enums/util.enum";
import { toast } from "react-toastify";

export default function GetAllEvents() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleteId, setDeleteId] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [selectedType, setSelectedType] = useState<string>()
    const [eventTypes, setEventTypes] = useState<EventTypeResponse[]>([]);
    const [closedEventsModal, setClosedEventModal] = useState(false)
    const [items, setItems] = useState<EventsResponse[]>();
    const [openEventTypeModal, setOpenEventTypeModal] = useState(false)

    useEffect(() => {
        eventsController.list(setItems, setIsLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function filterByType() {
            if (selectedType) {
                setIsLoading(true);
                const response = selectedType === "all"
                    ? await getEventsApi()
                    : await getEventsByTypeApi(selectedType);

                if (response.code < statusEnum.ok) {
                    toast.error(response.message.toString());
                    return
                }

                setItems(response.data?.data);
                setIsLoading(false);
            }
        }
        filterByType();
    }, [selectedType])


    useEffect(() => {
        fetchEventTypes();
    }, [closedEventsModal]);

    async function fetchEventTypes() {
        const response = await getEventTypesApi();
        if (response.code >= statusEnum.ok) {
            setEventTypes(response.data);
        } else {
            toast.error("Error fetching event types");
        }
    }

    const handleOpenModal = (id: number) => {
        setDeleteId(id);
        onOpen();
    }

    const dropDownOptions = () => {
        const arr = [];
        eventTypes.map((x, i) => {
            arr.push({ value: x?.type, label: x?.type });
        })

        return [{ value: 'all', label: 'All' }, ...arr];
    }

    const onTypeChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        setSelectedType(newValue.value);
    }

    const eventsController: EventsController = new EventsController();

    const handleOpenCategoryModal = () => {
        setOpenEventTypeModal(true);
    }

    const handleCloseCategoryModal = () => {
        setOpenEventTypeModal(false);
    }

    return (
        <>
            <AdminLayout
                externalStyles={[]}
                navbar={""}
                title={"Events"}
                withFooter={false}
                withSideBar={true}
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <span className="nav-tabs-title">Events</span>
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <li className="nav-item">
                                                <Link href={"/admin/events/addEvent"}>
                                                    <a className="nav-link active" data-toggle="tab">
                                                        Add New Event
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link active"
                                                    data-toggle="tab"
                                                    onClick={handleOpenCategoryModal}
                                                >
                                                    Manage Types
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
                                <FilterWrapper className="form-group">
                                    <label className="bmd-label-floating">Filter By Type</label>
                                    <Select options={dropDownOptions()} onChange={onTypeChange} />
                                </FilterWrapper>
                                <div className="table-responsive" id="table_div">
                                    {isLoading ?
                                        <LoaderWrapper>
                                            <DualRing width="40px" height="40px" color="#0b0146" />
                                        </LoaderWrapper> :
                                        <table className="table">
                                            <thead className=" text-primary">
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Location</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th></th>
                                                <th></th>
                                            </thead>
                                            <tbody id="tbody">
                                                {
                                                    items?.length > 0
                                                        ? items.map((x, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{x.name}</td>
                                                                    <td>{eventTypes?.find((e) => e.id === x.eventType)?.type || ""}</td>
                                                                    <td>{x.location}</td>
                                                                    <td>{moment(x.date).format("DD/MMM/yyyy")}</td>
                                                                    <td>{x.isActive ? "OnGoing" : "Ended"}</td>
                                                                    <td className="text-primary">
                                                                        <a
                                                                            onClick={() => {
                                                                                router.push(
                                                                                    `/admin/events/edit-event?id=${x.id}`
                                                                                );
                                                                            }}
                                                                            className="btn btn-primary pull-right text-white"
                                                                        >
                                                                            Edit
                                                                        </a>
                                                                    </td>
                                                                    <td className="text-primary">
                                                                        <a
                                                                            onClick={() => handleOpenModal(x.id)}
                                                                            className="btn btn-primary pull-right text-white"
                                                                        >
                                                                            Delete
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                        : <p>No content</p>}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
            <EventsModal isOpen={openEventTypeModal} closeModal={handleCloseCategoryModal} setClosedEventModal={setClosedEventModal} />
            <ConfirmationModal title={"Delete Item"} description="Are you sure you want to delete this item?" action={() => {
                eventsController.delete(
                    deleteId,
                    setItems,
                    items
                )
            }} isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`;

export const FilterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    gap: 15px;
    width: 100%;
    margin-bottom: 7px !important;

    & > label {
        width: fit-content;
        font-size: 18px;
    }

    & > div {
        width: 300px;
    }
`;
