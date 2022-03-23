export default class UserDTO {
    public constructor(init?: Partial<UserDTO>) {
        Object.assign(this, init);
    }

    id: number;
    firstName: string;
    lastName: string;
    username: string;
    emailAddress: string;
    address: string;
    email: string;
}