const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchExperience = async () => {
    const res = await fetch(`${BASE_URL}/api/experience`);
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    return res.json();
}