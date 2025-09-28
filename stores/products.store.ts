import { batch, observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncedFetch } from "@legendapp/state/sync-plugins/fetch";
import { ENDPOINTS, ProductApiResponse, ProductsApiResponse } from "../api";

export interface Product {
  id: string;
  image: string;
  productName: string;
  description: string;
  price: number;
}

interface ProductsStoreState {
  rawData: ProductsApiResponse;
  products: Product[];
  isLoading: boolean;
  error: string | undefined;
}

const productsStore$ = observable<ProductsStoreState>({
  rawData: {
    products: [],
    total: 0,
    skip: 0,
    limit: 30,
  },
  products: [],
  isLoading: false,
  error: undefined,
});

const productsData$ = observable(
  syncedFetch({
    get: ENDPOINTS.PRODUCTS,
    persist: {
      plugin: ObservablePersistMMKV,
      name: "products",
      retrySync: true,
    },
    initial: {
      products: [],
      total: 0,
      skip: 0,
      limit: 30,
    } as ProductsApiResponse,
  })
);

productsData$.onChange(() => {
  const data = productsData$.peek();

  batch(() => {
    productsStore$.rawData.set(data);
    productsStore$.isLoading.set(false);
    productsStore$.error.set(undefined);

    if (!data || !data.products || !Array.isArray(data.products)) {
      productsStore$.products.set([]);
      return;
    }

    const transformedProducts = data.products.map(
      (apiProduct: ProductApiResponse) => ({
        id: `product-${apiProduct.id}`,
        productName: apiProduct.title,
        description: apiProduct.description,
        price: apiProduct.price,
        image:
          Array.isArray(apiProduct.images) && apiProduct.images.length > 0
            ? apiProduct.images[0]
            : "",
      })
    ) as Product[];

    productsStore$.products.set(transformedProducts);
  });
});

export const productsStore = {
  state: productsStore$,
  isLoaded: observable(() => !productsStore$.isLoading.get()),

  sync: () => {
    batch(() => {
      productsStore$.isLoading.set(true);
      productsStore$.error.set(undefined);
    });
    return productsData$;
  },

  refresh: () => {
    batch(() => {
      productsStore$.isLoading.set(true);
      productsStore$.error.set(undefined);
      productsData$.set(productsData$.peek());
    });
  },

  getProducts: (): Product[] => productsStore$.products.peek() ?? [],
  getIsLoading: (): boolean => productsStore$.isLoading.peek() ?? false,
  getError: (): string | undefined => productsStore$.error.peek(),
  getRawData: (): ProductsApiResponse => productsStore$.rawData.peek(),
};
