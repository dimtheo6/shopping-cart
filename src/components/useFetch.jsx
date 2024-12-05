import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Server error");
        }
        const jsonData = await response.json();

        let results = jsonData.results;

        results = await Promise.all(
          results.map(async (game) => {
            const price = await fetchGamePrice(game.slug); // Fetch price for the game

            return {
              ...game,
              price,
            };
          })
        );

        setData(results);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Mock function for fetching game prices (replace with actual API or scraping logic)
const fetchGamePrice = async () => {
  return Math.floor(Math.random() * 50) + 10; // Mock price for demonstration
};

export default useFetch;
