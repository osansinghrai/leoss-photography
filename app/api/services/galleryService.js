const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchGallery = async () => {
    const res = await fetch(`${BASE_URL}/api/gallery`);
    if (!res.ok) {
        throw new Error("Failed to fetch gallery data");
    }
    return res.json();
}