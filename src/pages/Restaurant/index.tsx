import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import HeaderRestaurant from '../../components/HeaderRestaurant';
import { RestaurantType, Produto } from '../../types';

// Importa os novos componentes de estilo, incluindo o HeroBanner
import { ProductListContainer, List, HeroBanner } from './styles';

// ... (seu hook useRestaurant permanece o mesmo)
function useRestaurant(id: string | undefined) {
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`);
        if (!res.ok) throw new Error('Restaurante não encontrado');
        const json = await res.json();
        setRestaurant(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return { restaurant, loading, error };
}

type Props = {
  onOpenCart: () => void;
  onOpenProduct: (product: Produto) => void;
}

export default function Restaurant({ onOpenCart, onOpenProduct }: Props) {
  const { id } = useParams<{ id: string }>();
  const { restaurant, loading, error } = useRestaurant(id);

  if (loading) return <p className="container py-8">Carregando...</p>;
  if (error || !restaurant) return <p className="container py-8">Restaurante não encontrado.</p>;

  return (
    <>
      <HeaderRestaurant onOpenCart={onOpenCart} />
      <div>
        {/* Substituído a section por nosso novo componente HeroBanner */}
        <HeroBanner>
          <img src={restaurant.capa} alt={restaurant.titulo} />
          <div className="container">
            <p>{restaurant.tipo}</p>
            <h2>{restaurant.titulo}</h2>
          </div>
        </HeroBanner>
        
        <ProductListContainer className="container">
          <List>
            {restaurant.cardapio.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                onDetails={() => onOpenProduct(p)}
                onAdd={() => onOpenProduct(p)}
              />
            ))}
          </List>
        </ProductListContainer>
      </div>
    </>
  );
}

