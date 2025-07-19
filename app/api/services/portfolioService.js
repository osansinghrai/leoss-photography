const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPortfolio = async () => {
    const res = await fetch(`${BASE_URL}/api/portfolio`);
    if (!res.ok) {
        throw new Error("Failed to fetch portfolio data");
    }
    return res.json();
}