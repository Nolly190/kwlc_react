export class BlogDTO {
    public constructor(init?: Partial<BlogDTO>) {
        Object.assign(this, init);
    }

    title: string;
    message: string;
    by: string;
    description: string;
    itemType: string;
    id: number;
    date: Date;
    image: string;
    href: string = "";
    tags: tagItem[];
    authorName: string;
    aboutAuthor: string;
    blogCategory: string;
    blogImages: BlogItemImageDTO[];
}

export class BlogAudioDTO extends BlogDTO {
    public constructor(init?: Partial<BlogAudioDTO>) {
        super(init);
        Object.assign(this, init);
    }

    timerStart: string;
    timerEnd: string;
    timerCurrent: string;
}

export interface tagItem {
    name: string;
}

export class BlogItemDTO {
    public constructor(init?: Partial<BlogItemDTO>) {
        Object.assign(this, init);
    }

    id: number;
    title: string;
    message: string;
    categoryId: string;
    authorName: string;
    aboutAuthor: string;
    dateCreated: string;
    blogImages: BlogItemImageDTO[];
    tags: tagItem[];
}



export class BlogItemImageDTO {
    public constructor(init?: Partial<BlogItemImageDTO>) {
        Object.assign(this, init);
    }

    imageUrl: string;
}

export interface CategoryItem {
    name: string,
    id: number
}

export interface CreateCategoryItem {
    name: string,
}