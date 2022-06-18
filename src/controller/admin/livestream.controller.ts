import moment from "moment";
import { toast } from "react-toastify";
import {
  createStreamApi,
  editStreamApi,
  getLiveStreamApi,
  getLiveStreamsApi,
  stopLivestreamApi,
} from "../../api/livestream";
import { DonationImageDTO } from "../../dto/Donate.dto";
import { LiveStreamDTO } from "../../dto/LiveStream.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { ISetLivestream } from "../../ui/dashboard/admin/livestream/edit";
import { log, youtubeParser } from "../../utils";

export class LiveStreamController implements CRUDBL {
  async create(data: LiveStreamDTO, setIsLoading: Function) {
    try {
      if (!data.title || !data.description) {
        toast.error("Please fill all fields.");
        return;
      }

      let _url = youtubeParser(data.liveStreamUrl);
      if (_url == "") {
        toast.error("Youtube video link expected.");
      } else {  
        setIsLoading(true);
        const response = await createStreamApi(data);
        if (response.code >= statusEnum.ok) {
          toast.success("Stream Creation was successful");
        } else {
          toast.error("Stream Creation failed");
        }
        setIsLoading(false);
      }
    } catch (e) {
      log("earlydev", e);
    }
  }
  async read(set: ISetLivestream, id: number) {
    set.setIsLoading && set.setIsLoading(true);
    const response = await getLiveStreamApi(id);
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    const data: LiveStreamDTO = response?.data?.data;

    set.setDescription(data.description);
    set.setUrl(data.liveStreamUrl);
    set.setTitle(data.title);
    set.setStreamDate(moment(data.dateOfStream).format("yyyy-MM-DD"));
    set.setIsLoading && set.setIsLoading(false);
  }
  async update(data: LiveStreamDTO, id: number, setIsLoading: Function) {
    let _url = youtubeParser(data.liveStreamUrl);
    if (_url == "") {
      toast.error("Please enter a valid Youtube video url.");
    } else {
      setIsLoading(true);
      const response = await editStreamApi(data, id);
      if (response.code >= statusEnum.ok) {
        toast.success("Stream update was successful");
      } else {
        toast.error("Stream update failed");
      }
      setIsLoading(false);
      // toast.success("Stream update request Sent");
    }
  }

  async delete(id: number, setItems: Function, items: LiveStreamDTO[]) {
    stopLivestreamApi(id).then((response) => {
      if (response.code >= statusEnum.ok) {
        toast.success("Livestream stopped successfully");
        setItems(items.filter((x) => x.id != id));
      } else {
        toast.error(response.message.toString());
      }
    });
  }

  async bulk() {}
  async list(setItems: Function, setIsLoading?: Function) {
    setIsLoading && setIsLoading(true);
    const response = await getLiveStreamsApi();
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    const data: LiveStreamDTO[] = response?.data?.data;
    setItems(data);
    setIsLoading && setIsLoading(false);
  }

  addDonationImage(
    setImages: Function,
    images: DonationImageDTO[],
    image: string,
    isMainImage: boolean
  ) {
    setImages(
      images.concat([
        {
          imageUrl: image,
          isMainImage: isMainImage,
          id: parseInt(moment(new Date()).format("yyyyMMDDHHmmss")),
        },
      ])
    );
  }
  makeMainImage(setImages: Function, images: DonationImageDTO[], id: number) {
    images.forEach((x) => {
      if (x.id == id) {
        x.isMainImage = true;
      } else {
        x.isMainImage = false;
      }
    });
    setImages(Array.from(images));
  }
}
