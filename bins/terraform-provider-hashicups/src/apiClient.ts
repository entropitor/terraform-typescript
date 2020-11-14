import fetch from 'node-fetch';

export type ApiOrder = {
  id: number;
  items: Array<{
    coffee: {
      description: string;
      id: number;
      image: string;
      ingredients: null;
      name: string;
      price: number;
      teaser: string;
    };
    quantity: number;
  }>;
};
export type HashicupsApiClient = {
  createOrder: (
    order: Array<{
      coffee: {
        id: number;
      };
      quantity: number;
    }>,
  ) => Promise<ApiOrder>;
  getOrder: (orderId: number) => Promise<ApiOrder>;
  listCoffees: () => Promise<
    Array<{
      description: string;
      id: number;
      image: string;
      ingredients: Array<{
        ingredient_id: number;
      }>;
      name: string;
      price: number;
      teaser: string;
    }>
  >;
};

export type CreateApiClientArgs = {
  password: string;
  username: string;
};

type FetchOptions = Parameters<typeof fetch>[1];

export const createApiClient = async (
  config: CreateApiClientArgs,
): Promise<HashicupsApiClient> => {
  const url = 'http://localhost:19090';

  const get = async (path: string, extraOpts: FetchOptions = {}) => {
    const result = await fetch(`${url}${path}`, extraOpts);
    const json = await result.json();
    return json;
  };

  const post = async (
    path: string,
    body: any,
    extraOpts: FetchOptions = {},
  ) => {
    const result = await fetch(`${url}${path}`, {
      body: JSON.stringify(body),
      method: 'POST',
      ...extraOpts,
    });
    const json = await result.json();
    return json;
  };

  const { token } = await post(`/signin`, {
    password: config.password,
    username: config.username,
  });

  const getAuthorized = (path: string) =>
    get(path, {
      headers: {
        Authorization: token,
      },
    });

  const postAuthorized = (path: string, body: any) =>
    post(path, body, {
      headers: {
        Authorization: token,
      },
    });

  return {
    async createOrder(order) {
      return postAuthorized(`/orders`, order);
    },
    async getOrder(orderId: number) {
      return getAuthorized(`/orders/${orderId}`);
    },
    async listCoffees() {
      return get('/coffees');
    },
  };
};
