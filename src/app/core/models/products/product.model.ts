
export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  internalReference: string;
  shellId: number;
  inventoryStatus: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProductPage {
  content: Product[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}