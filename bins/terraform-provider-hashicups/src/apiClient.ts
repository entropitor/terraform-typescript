import fetch from 'node-fetch';

export type HashicupsApiClient = {
  listCoffees: () => Promise<
    Array<{
      id: number;
      name: string;
      teaser: string;
      description: string;
      price: number;
      image: string;
      ingredients: Array<{
        ingredient_id: number;
      }>;
    }>
  >;
  getOrder: (
    orderId: number,
  ) => Promise<{
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
  }>;
};

export type CreateApiClientArgs = {
  username: string;
  password: string;
};

export const createApiClient = async (
  config: CreateApiClientArgs,
): Promise<HashicupsApiClient> => {
  const url = 'http://localhost:19090';

  const tokenResponse = await fetch(`${url}/signin`, {
    method: 'POST',
    body: JSON.stringify({
      username: config.username,
      password: config.password,
    }),
  });
  const { token } = await tokenResponse.json();

  const get = async (path: string) => {
    const result = await fetch(`${url}${path}`);
    return await result.json();
  };

  const getAuthorized = async (path: string) => {
    const result = await fetch(`${url}${path}`, {
      headers: {
        Authorization: token,
      },
    });
    return await result.json();
  };

  return {
    async listCoffees() {
      return get('/coffees');
    },
    async getOrder(orderId: number) {
      return getAuthorized(`/orders/${orderId}`);
    },
  };
};
