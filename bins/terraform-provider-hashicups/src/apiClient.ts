import fetch from "node-fetch";

export type HashicupsApiClient = {
  listCoffees: () => any;
};

export type CreateApiClientArgs = {
  username: string;
  password: string;
};

export const createApiClient = (
  _config: CreateApiClientArgs
): HashicupsApiClient => {
  const url = "http://localhost:19090";

  const get = async (path: string) => {
    const result = await fetch(`${url}${path}`);
    return await result.json();
  };

  return {
    async listCoffees() {
      return get("/coffees");
    },
  };
};
