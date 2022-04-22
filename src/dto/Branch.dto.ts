import { PastorsDetailsType, SliderType } from "../types/appTypes";

export class BranchItemDTO {
    public constructor(init?: Partial<BranchItemDTO>) {
        Object.assign(this, init);
    }
    description: string;
    timers: BranchServiceDTO[] = [];
    title: string;
    id: number;
    image: BranchMediaDTO;
    images: BranchMediaDTO[];
    leadPastor: string;
    favVerse: string;
    location: string;
    phoneNo: string[];
    raised: number;
    target: number;
}

export class BranchMediaDTO {
    public constructor(init?: Partial<BranchMediaDTO>) {
        Object.assign(this, init);
    }
    id: number;
    title: string;
    url: string;
    description: string;
    platform: string;
    dateCreated: string;
    createdBy: string;
}

export class BranchServiceDTO {
    public constructor(init?: Partial<BranchServiceDTO>) {
        Object.assign(this, init);
    }
    id: number;
    day: string;
    time: string;
}

export class BranchDTO {
    public constructor(init?: Partial<BranchDTO>) {
        Object.assign(this, init);
    }
    id: number;
    name: string;
    address: string;
    contactNumber: string;
    dateCreated: string;
    location: string;
    state: string;
    isBranchHq: boolean;
    eventVm: string[];
    donationVm: string[];
    liveStreamVm: string[];
    mediaVm: BranchMediaDTO[];
    messageVm: PastorsDetailsType;
    sliderVm: SliderType[];
    services: BranchServiceDTO[];
}

export class BranchAssignAdminDTO {
    public constructor(init?: Partial<BranchAssignAdminDTO>) {
        Object.assign(this, init);
    }
    id: number;
    userId: number;
    branchId: number;
    userType: string;
    isResidential: boolean;
}