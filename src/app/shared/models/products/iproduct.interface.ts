import { Ibrands } from "../brands/ibrands.interface";
import { Icategory } from "../categories/icategory.interface";
import { Isubcategories } from "../sub-categories/isubcategories.interface";

export interface Iproduct {
    sold: null | number;
    images: string[];
    subcategory: Isubcategories[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: Icategory;
    brand: Ibrands;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
    priceAfterDiscount?: number;
    availableColors?: any[];
    __v?: number;
    reviews?: any[];
}


