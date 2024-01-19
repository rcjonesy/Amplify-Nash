export const getAllConcerts = () => {
    return fetch("/api/concert").then((response) => response.json())
}

export const deleteConcert = (id) => {
    return fetch(`/api/concert/${id}`, {
        method: "Delete"
    })
}

export const getConcertById = (id) => {
    return fetch(`/api/concert/${id}`).then((response) => response.json())
}