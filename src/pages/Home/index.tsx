import { useEffect, useState } from "react";
import HeaderHome from "../../components/HeaderHome";
import RestaurantCard from "../../components/RestaurantCard";
import dataMock from "../../data/restaurantes.json";
import { RestaurantType } from "../../types";

// Importa os novos componentes de estilo
import { RestaurantListContainer, List } from "./styles";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ebac-fake-api.vercel.app/api/efood/restaurantes";

function useRestaurants() {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ... seu código de busca de dados continua igual ...
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        const normalized = Array.isArray(json) ? json : json.restaurantes || [];
        if (!cancelled) setRestaurants(normalized);
      } catch (err) {
        console.warn("Falha ao buscar API, usando mock local:", (err as Error).message);
        if (!cancelled) setRestaurants(dataMock.restaurantes);
        if (!cancelled) setError("Não foi possível carregar a API remota, usando dados locais.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);


  return { restaurants, loading, error };
}

type Props = {
  onOpenCart: () => void;
}

export default function Home({ onOpenCart }: Props) {
  const { restaurants, loading, error } = useRestaurants();
  return (
    <>
      <HeaderHome onOpenCart={onOpenCart} />
      <RestaurantListContainer className="container">
        {error && (
          <div className="mb-4 rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-yellow-800">
            {error}
          </div>
        )}

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <List>
            {restaurants.map((r) => (
                <RestaurantCard r={r} />

            ))}
          </List>
        )}
      </RestaurantListContainer>
    </>
  );
}

