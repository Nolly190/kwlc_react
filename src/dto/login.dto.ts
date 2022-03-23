export class LoginDTO {
    public constructor(init?: Partial<LoginDTO>) {
        Object.assign(this, init);
    }
    status: string;
    data: LoginAccessDTO;
    responseMessage: string;
    errors: any;
}

export class LoginAccessDTO {
    public constructor(init?: Partial<LoginAccessDTO>) {
        Object.assign(this, init);
    }
    data: { token: string };
    expiryDate: string;
    roles: string[];
    permissions: string[];
}

export class LoginModelDTO {
    public constructor(init?: Partial<LoginModelDTO>) {
        Object.assign(this, init);
    }

    username: string;
    password: string;
}