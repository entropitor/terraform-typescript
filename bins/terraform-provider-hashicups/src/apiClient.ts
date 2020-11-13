import fetch from 'node-fetch';

export type HashicupsApiClient = {
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

export const createApiClient = async (
  config: CreateApiClientArgs,
): Promise<HashicupsApiClient> => {
  const url = 'http://localhost:19090';

  const tokenResponse = await fetch(`${url}/signin`, {
    body: JSON.stringify({
      password: config.password,
      username: config.username,
    }),
    method: 'POST',
  });
  const { token } = await tokenResponse.json();

  const get = async (path: string) => {
    const result = await fetch(`${url}${path}`);
    const json = await result.json();
    return json;
  };

  const getAuthorized = async (path: string) => {
    const result = await fetch(`${url}${path}`, {
      headers: {
        Authorization: token,
      },
    });
    const json = await result.json();
    return json;
  };

  return {
    async getOrder(orderId: number) {
      return getAuthorized(`/orders/${orderId}`);
    },
    async listCoffees() {
      return get('/coffees');
    },
  };
};
