import { useEffect, useRef, useState } from "react";
import AdminLayout from "../admin.layout";
import { Editor } from "@tinymce/tinymce-react";
import Select, { ActionMeta } from "react-select";
import styled from "styled-components";
import { getParam } from "../../../../utils";
import { useRouter } from "next/router";
import {
  EventImageType,
  EventsResponse,
  EventTypeResponse,
} from "../../../../types/appTypes";
import {
  endEventApi,
  getEventTypesApi,
  getSingleEventApi,
} from "../../../../api/event.api";
import { EventsController } from "../../../../controller/admin/events.controller";
import { ImageItem, ImageWrapper } from "./add";
import { statusEnum } from "../../../../enums/util.enum";
import { toast } from "react-toastify";
import { ButtonWrapper, ErrorButton } from "../publishers/edit";
import { useDisclosure } from "@chakra-ui/react";
import ConfirmationModal from "../../../../components/confirmationModal";
import { LoaderWrapper } from "./getAll";
import DualRing from "../../../../components/loader";

export default function EditEvent() {
  const [image, setImage] = useState<EventImageType>({ imageUrl: "" });
  const [eventTypes, setEventTypes] = useState<EventTypeResponse[]>([]);
  const [eventData, setEventData] = useState<EventsResponse>({
    event_Images: [],
  });
  const [fieldsBlocked, setFieldsBlocked] = useState(false);
  const router = useRouter();
  const idParam = parseInt(getParam("id"));
  const [date, setDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!idParam) {
        router.push("/admin/");
      } else {
        setIsLoading(true);
        const event = await getSingleEventApi(idParam);
        const response = await getEventTypesApi();
        setEventTypes(response.data);
        if (event.code >= statusEnum.ok) {
          setEventData(event?.data?.data);
        } else {
          toast.error("Error fetching event data");
          setTimeout(() => {
            router.push("/admin/events");
          }, 2000);
        }
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let controller: EventsController = new EventsController();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    controller.update(eventData, idParam, setIsSaving);
  };

  const handleOpen = (e: any) => {
    e.preventDefault();
    onOpen();
  };

  const handleChange = (name: string, value: string) => {
    if (name === "imageUrl") {
      const newArray = { [name]: value };
      setEventData({
        ...eventData,
        event_Images: [...eventData.event_Images, newArray],
      });
      return;
    }

    setEventData({ ...eventData, [name]: value });
  };

  useEffect(() => {
    eventData?.date &&
      setDate(new Date(eventData?.date)?.toISOString().substring(0, 10));
  }, [eventData]);

  const dropDownOptions = () => {
    const arr = [];
    eventTypes.map((x, i) => {
      arr.push({ value: x?.id, label: x?.type });
    });

    return arr;
  };

  const onTypeChange = (newValue: any, actionMeta: ActionMeta<any>) => {
    setEventData({ ...eventData, eventType: newValue.value });
  };

  const handleDelete = (index: number) => {
    const newArray = [...eventData.event_Images];
    newArray.splice(index, 1);
    setEventData({ ...eventData, event_Images: newArray });
  };

  const handleEndEvent = async () => {
    const response = await endEventApi(idParam);
    if (response.code >= statusEnum.ok) {
      setFieldsBlocked(true);
      toast.success("Event ended successfully");
    } else {
      toast.error(response.message.toString());
    }
  };

  const handleAddImage = (e: any) => {
    e.preventDefault();
    setEventData({
      ...eventData,
      event_Images: [...eventData.event_Images, image],
    });
    setImage({ imageUrl: "" });
  };

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Edit Event"}
        withFooter={false}
        withSideBar={true}
      >
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title">Update Event</h4>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <LoaderWrapper>
                    <DualRing width="40px" height="40px" color="#0b0146" />
                  </LoaderWrapper>
                ) : (
                  <form id="form">
                    <input type="hidden" element-data="key" value="category" />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            element-data="name"
                            disabled={fieldsBlocked}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            value={eventData.name}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            element-data="phone"
                            disabled={fieldsBlocked}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            value={eventData.phone}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Select Type
                          </label>
                          <Select
                            options={dropDownOptions()}
                            onChange={onTypeChange}
                            isDisabled={fieldsBlocked}
                            value={dropDownOptions().find(
                              (x) => x.value === eventData.eventType
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Date</label>
                          <input
                            type="date"
                            className="form-control mt-1"
                            id="date"
                            name="date"
                            element-data="date"
                            disabled={fieldsBlocked}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            value={date}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            element-data="address"
                            disabled={fieldsBlocked}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            value={eventData.address}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            element-data="location"
                            disabled={fieldsBlocked}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            value={eventData.location}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            element-data="description"
                            cols={5}
                            rows={5}
                            disabled={fieldsBlocked}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            value={eventData.description}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Event Images
                          </label>
                          <form>
                            <div className="row pt-3">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={image.imageUrl}
                                  disabled={fieldsBlocked}
                                  onChange={(e) => {
                                    setImage({ imageUrl: e.target.value });
                                  }}
                                />
                              </div>
                              <div className="col-md-4">
                                <button
                                  className="btn btn-primary pull-right"
                                  onClick={(e) => handleAddImage(e)}
                                  disabled={fieldsBlocked}
                                >
                                  Add Image
                                </button>
                              </div>
                            </div>
                          </form>
                          <ImageWrapper>
                            {eventData?.event_Images?.map((image, index) => (
                              <ImageItem key={index}>
                                <img src={image.imageUrl} />
                                <span onClick={() => handleDelete(index)}>
                                  x
                                </span>
                              </ImageItem>
                            ))}
                          </ImageWrapper>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <ButtonWrapper className="row mt-5">
                      <ErrorButton
                        id="submitBtn"
                        className="btn pull-right"
                        onClick={(e) => handleOpen(e)}
                      >
                        End Event
                      </ErrorButton>
                      <button
                        type="submit"
                        id="submitBtn"
                        className="btn btn-primary pull-right"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <DualRing width="15px" height="15px" color="#fff" />
                        ) : (
                          "Update Event"
                        )}
                      </button>
                    </ButtonWrapper>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <ConfirmationModal
        title={"End Event"}
        description="Are you sure you want to end this event?"
        action={handleEndEvent}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
