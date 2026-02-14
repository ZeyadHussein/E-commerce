export interface IWishlist {
    status: string;
    message: string;
    data: string[];
}

export interface IWishlistDetails {
    status: string;
    count: number;
    data: WishlistItem[];
}

export interface WishlistItem {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    ratingsAverage: number;
    category: {
        name: string;
    };
}