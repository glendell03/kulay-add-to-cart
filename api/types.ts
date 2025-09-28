// DummyJSON API Response Types
export interface ProductApiResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export interface ProductsApiResponse {
  products: ProductApiResponse[];
  total: number;
  skip: number;
  limit: number;
}
