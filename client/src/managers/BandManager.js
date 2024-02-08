export const getHeadliningBands = () => {
  return fetch("/api/band/headliners").then((response) => response.json());
};

export const getSupportingBands = () => {
  return fetch("/api/band/supporting").then((response) => response.json());
};

export const getAllBandsWithMembers = () => {
  return fetch("/api/band").then((response) => response.json());
};

export const getBandById = (id) => {
  return fetch(`/api/band/${id}`).then((response) => response.json());
};

export const postNewBand = (bandObj) => {
  return fetch("/api/band", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bandObj),
  });
};

export const deleteBand = (id) => {
  return fetch(`/api/band/${id}`, {
    method: "DELETE",
  });
};
