export type Dataplane = {
  mesh: string;
  name: string;
  networking: Networking;
  type?: string;
};

type Networking = {
  address: string;
  gateway: NetworkingGateway;
  inbound: NetworkingInbound[];
  outbound: NetworkingOutbound[];
};

type NetworkingGateway = {
  tags: Record<string, string>;
};

type NetworkingInbound = {
  port: number;
  servicePort: number;
  tags: Record<string, string>;
};

type NetworkingOutbound = {
  port: number;
  service: string;
};

export type Mesh = {
  name: string;
  type?: string;
};

type CreateKumaClientArgs = {
  apiToken: string;
  host: string;
};

export const createKumaClient = (config: CreateKumaClientArgs) => {
  const getMesh = async (name: string): Promise<Mesh> => {
    const response = await fetch(`${config.host}/meshes/${name}`);
    const json = await response.json();
    return json;
  };

  const upsertMesh = async (mesh: Mesh): Promise<Mesh> => {
    const updatedMesh: Mesh = {
      ...mesh,
      type: 'Mesh',
    };
    await fetch(`${config.host}/meshes/${mesh.name}`, {
      body: JSON.stringify(updatedMesh),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });

    return updatedMesh;
  };

  const deleteMeshByName = async (name: string): Promise<void> => {
    await fetch(`${config.host}/meshes/${name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
  };

  const getDataplane = async (
    meshName: string,
    dpName: string,
  ): Promise<Dataplane> => {
    const response = await fetch(
      `${config.host}/meshes/${meshName}/dataplanes/${dpName}`,
    );
    const json = await response.json();
    return json;
  };

  const upsertDataplane = async (dataplane: Dataplane): Promise<Dataplane> => {
    const updatedDataplane = {
      ...dataplane,
      type: 'Dataplane',
    };
    await fetch(
      `${config.host}/meshes/${dataplane.mesh}/dataplanes/${dataplane.name}`,
      {
        body: JSON.stringify(updatedDataplane),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    );
    return updatedDataplane;
  };

  const deleteDataplaneByName = async (
    meshName: string,
    dpName: string,
  ): Promise<void> => {
    await fetch(`${config.host}/meshes/${meshName}/dataplanes/${dpName}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
  };

  return {
    deleteDataplane: (dataplane: Dataplane) =>
      deleteDataplaneByName(dataplane.mesh, dataplane.name),
    deleteDataplaneByName,
    deleteMesh: (mesh: Mesh) => deleteMeshByName(mesh.name),
    deleteMeshByName,
    getDataplane,
    getMesh,
    upsertDataplane,
    upsertMesh,
  };
};

export type KumaClient = ReturnType<typeof createKumaClient>;
