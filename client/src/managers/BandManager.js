export const getHeadliningBands = () => {
    return fetch("/api/band/headliners").then((response) => response.json())
}

export const getSupportingBands = () => {
    return fetch("/api/band/supporting").then((response) => response.json())
}