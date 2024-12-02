import { useState, useEffect } from "react";

const useFetch = (url, fetchInfo = false) => {
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
              price
            };
          })
        );

        // If fetchInfo is enabled, get prices for each game

        if (fetchInfo) {
         results = await Promise.all(
          results.map(async (game) => {
            const price = await fetchGamePrice(game.slug); // Fetch price for the game
             const descResponse = await fetch(
               `https://api.rawg.io/api/games/${game.slug}?key=14366b3fb284408cbbb8c14edf86549e`
              );
               const descData = await descResponse.json();
            return {
              ...game,
              price ,description: descData.description_raw ,
            };
          })
        );
        }

        setData(results);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, fetchInfo]);

  return { data, loading, error };
};

// Mock function for fetching game prices (replace with actual API or scraping logic)
const fetchGamePrice = async (gameSlug) => {
  return Math.floor(Math.random() * 50) + 10; // Mock price for demonstration
};

export default useFetch;
