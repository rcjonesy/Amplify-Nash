export const getAllVenues = () => {
    return fetch("/api/venue").then((response) => response.json())
}

export const deleteVenue = (id) => {
    return fetch(`/api/venue/${id}`, {
        method: "Delete"
    })
}

export const newVenue = (venueObj) => {
    return fetch("/api/venue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venueObj)
    })
}