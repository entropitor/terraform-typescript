import fetch from "node-fetch";

export type HashicupsApiClient = {
  listCoffees: () => any;
};

export type CreateApiClientArgs = {
  username: string;
  password: string;
};

export const createApiClient = async (
  config: CreateApiClientArgs
): Promise<HashicupsApiClient> => {
  const url = "http://localhost:19090";

  const token = await fetch(`${url}/signin`, {
    method: "POST",
    body: JSON.stringify({
      username: config.username,
      password: config.password,
    }),
  });

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
