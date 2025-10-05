
export type Product = {
    id: string;
    publicName: string;
    category: string;
    brand: string;
    isWholesaleProduct: boolean;
    visibleTo: string[];
    createdAt: string;
    priceCents: number;
    tags: string[];
}[];

export type Role = 'doctor' | 'admin' | 'select';