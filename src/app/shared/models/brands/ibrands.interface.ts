export interface Ibrands {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IBrandResponse {
    results: number;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
        nextPage: number;
    };
    data: Ibrands[];
}

export interface ISpecificBrandResponse {
    data: Ibrands;
}