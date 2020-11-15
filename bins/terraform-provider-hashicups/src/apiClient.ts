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
type OrderItem = {
  coffee: {
    id: number;
  };
  quantity: number;
};
export type HashicupsApiClient = {
  coffee: {
    list: () => Promise<
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
  order: {
    create: (orderItems: OrderItem[]) => Promise<ApiOrder>;
    get: (orderId: number) => Promise<ApiOrder>;
    update: (
      orderId: number,
      orderItems: OrderItem[],
    ) => Promise<{ id: number }>;
  };
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

  const withBody = (method: string) => async (
    path: string,
    body: any,
    extraOpts: FetchOptions = {},
  ) => {
    const result = await fetch(`${url}${path}`, {
      body: JSON.stringify(body),
      method,
      ...extraOpts,
    });
    const json = await result.json();
    return json;
  };
  const post = withBody('POST');
  const put = withBody('PUT');

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

  const withAuth = (requestFn: any) => (path: string, body?: any) =>
    requestFn(path, body, {
      headers: {
        Authorization: token,
      },
    });
  const postAuthorized = withAuth(post);
  const putAuthorized = withAuth(put);

  return {
    coffee: {
      async list() {
        return get('/coffees');
      },
    },
    order: {
      async create(orderItems) {
        return postAuthorized(`/orders`, orderItems);
      },
      async get(orderId) {
        return getAuthorized(`/orders/${orderId}`);
      },
      async update(orderId, orderItems) {
        return putAuthorized(`/orders/${orderId}`, orderItems);
      },
    },
  };
};
