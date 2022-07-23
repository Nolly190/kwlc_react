import { MouseEvent, useEffect, useRef, useState } from "react";
import { BlogController } from "../../../../controller/admin/blog.controller";
import { BlogItemDTO, CategoryItem, tagItem } from "../../../../dto/Blog.dto";
import AdminLayout from "../admin.layout";
import Select, { ActionMeta } from "react-select";
import styled from "styled-components";
import {
  CreateEventPayload,
  EventImageType,
  EventTypeResponse,
} from "../../../../types/appTypes";
import { EventsController } from "../../../../controller/admin/events.controller";
import { getEventTypesApi } from "../../../../api/event.api";
import { statusEnum } from "../../../../enums/util.enum";
import { toast } from "react-toastify";
import DualRing from "../../../../components/loader";

export default function AddEvent() {
  const [image, setImage] = useState<EventImageType>({
    imageUrl: "",
  });
  const [eventTypes, setEventTypes] = useState<EventTypeResponse[]>([]);
  const [eventData, setEventData] = useState<CreateEventPayload>({
    event_Images: [],
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchEventTypes() {
      const response = await getEventTypesApi();
      if (response.code >= statusEnum.ok) {
        setEventTypes(response.data);
      } else {
        toast.error("Error getting event types");
      }
    }
    fetchEventTypes();
  }, []);

  let controller: EventsController = new EventsController();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    controller.create(eventData, setIsSaving);
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

  const handleAddImage = (e: any) => {
    e.preventDefault();
    setEventData({
      ...eventData,
      event_Images: [...eventData.event_Images, image],
    });
    setImage({ imageUrl: "" });
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Add Event"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Create New Event</h4>
            </div>
            <div className="card-body">
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
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        element-data="phone"
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Select Type</label>
                      <Select
                        options={dropDownOptions()}
                        onChange={onTypeChange}
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
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        element-data="description"
                        cols={5}
                        rows={5}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">Event Images</label>
                      <form>
                        <div className="row pt-3">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              value={image.imageUrl}
                              onChange={(e) => {
                                setImage({ imageUrl: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-primary pull-right"
                              onClick={(e) => handleAddImage(e)}
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
                            <span onClick={() => handleDelete(index)}>x</span>
                          </ImageItem>
                        ))}
                      </ImageWrapper>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="row mt-5">
                  <div className="col-md-12">
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
                        "Create Event"
                      )}
                    </button>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export const ImageWrapper = styled.div`
  display: -webkit-box;
  max-width: 100%;
  gap: 8px;
  padding-bottom: 10px;
  margin-top: 20px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #073375;
  }
`;

export const ImageItem = styled.div`
  position: relative;
  width: 180px;
  height: 170px;

  & > img {
    width: 100%;
    height: 100%;
  }

  & > span {
    position: absolute;
    top: 7px;
    right: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    padding-bottom: 7px;
    width: 20px;
    height: 20px;
    font-size: 20px;
    border-radius: 50%;
    background: #ffffff;
    color: #073375;
    cursor: pointer;
  }
`;
