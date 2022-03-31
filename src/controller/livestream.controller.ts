import moment from "moment";
import { getLiveStreamsApi } from "../api/livestream";
import { LiveStreamDTO } from "../dto/LiveStream.dto";
import { fakeModel } from "../utils";


export async function loadLiveStreamWeb(setItems: Function, setItem: Function) {
    const items = await getLiveStreamsApi();
    let data: LiveStreamDTO[] = items.data;

    setItem(data.length > 0 ? data[0] : new LiveStreamDTO());
    setItems(data.length > 0 ? data.slice(1, 4) : []);

}

export async function loadPreviousLiveStreamWeb(setItems: Function) {

    let items = await getLiveStreamsApi();
    let data: LiveStreamDTO[] = items.data;

    setItems(data.length > 0 ? data.slice(1) : []);

}