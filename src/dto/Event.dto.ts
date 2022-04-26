export class EventDTO {
  public constructor(init?: Partial<EventDTO>) {
    Object.assign(this, init);
  }
  id: number;
  name: string;
  description: string;
  date: string;
  branchId: number;
  isActive: boolean;
  eventType: number;
  eventName: string;
  address: string;
  phone: string;
  location: string;
  branchName: string | null;
  event_Images: { id: number; imageUrl: string }[];
}
