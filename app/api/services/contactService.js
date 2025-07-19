const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchContact = async () => {
    const res = await fetch(`${BASE_URL}/api/contact`);
    if (!res.ok) {
        throw new Error("Failed to fetch contact data");
    }
    return res.json();
}