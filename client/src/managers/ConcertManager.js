export const getAllConcerts = () => {
  return fetch("/api/concert").then((response) => response.json());
};

export const deleteConcert = (id) => {
  return fetch(`/api/concert/${id}`, {
    method: "Delete",
  });
};

export const getConcertById = (id) => {
  return fetch(`/api/concert/${id}`).then((response) => response.json());
};

export const postNewConcert = (concertObj) => {
  console.log(concertObj);
  return fetch("/api/concert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(concertObj),
  });
};

export const updateConcert = (id, concertObj) => {
  console.log(concertObj);
  return fetch(`/api/concert/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(concertObj),
  });
};
