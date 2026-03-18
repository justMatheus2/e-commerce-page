import { useEffect, useMemo, useState } from 'react';
import { Filter } from 'lucide-react';
import { CartModal } from './components/CartModal';
import { FilterPanel } from './components/FilterPanel';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { products } from './data/products';
import type { Category } from './types';

const categories: Category[] = ['All', 'Headphones', 'Speakers', 'Wearables', 'Accessories'];
const maxPrice = 350;
const shippingThreshold = 300;
const shippingFee = 30;

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedPrice, setSelectedPrice] = useState<number>(maxPrice);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price <= selectedPrice;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedPrice]);

  const cartLines = useMemo(() => {
    const quantityMap = new Map<number, number>();

    cartItems.forEach((productId) => {
      quantityMap.set(productId, (quantityMap.get(productId) ?? 0) + 1);
    });

    return Array.from(quantityMap.entries()).map(([productId, quantity]) => {
      const product = products.find((item) => item.id === productId);

      if (!product) {
        throw new Error(`Product with id ${productId} was not found.`);
      }

      return { product, quantity };
    });
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartLines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartLines]);

  const hasFreeShipping = subtotal > shippingThreshold;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileFiltersOpen(false);
        setCartOpen(false);
      }
    };

    if (!mobileFiltersOpen && !cartOpen) {
      return undefined;
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [cartOpen, mobileFiltersOpen]);

  return (
    <div className="app-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <Header
        cartCount={cartItems.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={() => setCartOpen(true)}
      />

      <CartModal
        isOpen={cartOpen}
        items={cartLines}
        subtotal={subtotal}
        shippingFee={shippingFee}
        hasFreeShipping={hasFreeShipping}
        onClose={() => setCartOpen(false)}
      />

      <main className="layout">
        <FilterPanel
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setMobileFiltersOpen(false);
          }}
          maxPrice={maxPrice}
          selectedPrice={selectedPrice}
          onPriceChange={setSelectedPrice}
          mobileOpen={mobileFiltersOpen}
          onMobileToggle={() => setMobileFiltersOpen((current) => !current)}
        />

        <section className="content">
          <div className="content-header">
            <div>
              <p className="eyebrow">Featured collection</p>
              <h2>Gear curated for immersive listening</h2>
            </div>

            <div className="results-summary">
              <span className="results-pill">
                <Filter size={16} />
                {selectedCategory}
              </span>
              <span>{filteredProducts.length} products</span>
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(productId) => setCartItems((current) => [...current, productId])}
              />
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products match your filters</h3>
              <p>Try another category, raise the price range, or clear the search.</p>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
