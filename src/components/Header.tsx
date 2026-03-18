import { Search, ShoppingCart } from 'lucide-react';

type HeaderProps = {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCartClick: () => void;
};

export function Header({ cartCount, searchTerm, onSearchChange, onCartClick }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Nova Electronics</p>
        <h1>Storefront</h1>
      </div>

      <div className="header-actions">
        <label className="searchbar" aria-label="Search products">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <button className="cart-button" type="button" aria-label="Shopping cart" onClick={onCartClick}>
          <ShoppingCart size={20} />
          <span>Cart</span>
          <strong>{cartCount}</strong>
        </button>
      </div>
    </header>
  );
}
