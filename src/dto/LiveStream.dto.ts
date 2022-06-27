export class LiveStreamDTO {
  public constructor(init?: Partial<LiveStreamDTO>) {
    Object.assign(this, init);
  }

  title: string;
  description: string;
  id: number;
  liveStreamUrl: string;
  isActive: boolean;
  dateOfStream: string;
  preacher: string;
  views: number;
  // views: number;
  // preacher: string;
}
