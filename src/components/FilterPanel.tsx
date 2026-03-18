import { Filter, X } from 'lucide-react';
import type { Category } from '../types';

type FilterPanelProps = {
  categories: Category[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  maxPrice: number;
  selectedPrice: number;
  onPriceChange: (price: number) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
};

export function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  selectedPrice,
  onPriceChange,
  mobileOpen,
  onMobileToggle,
}: FilterPanelProps) {
  return (
    <>
      <button className="mobile-filter-button" type="button" onClick={onMobileToggle}>
        <Filter size={18} />
        <span>Filters</span>
      </button>

      <div className={`drawer-backdrop ${mobileOpen ? 'visible' : ''}`} onClick={onMobileToggle} />

      <aside className={`filter-panel ${mobileOpen ? 'open' : ''}`}>
        <div className="filter-panel-header">
          <div>
            <p className="eyebrow">Quick Filters</p>
            <h2>Browse</h2>
          </div>
          <button className="icon-button close-drawer" type="button" onClick={onMobileToggle}>
            <X size={18} />
          </button>
        </div>

        <section className="filter-section">
          <h3>Category</h3>
          <div className="chip-list">
            {categories.map((category) => {
              const active = category === selectedCategory;
              return (
                <button
                  key={category}
                  className={`chip ${active ? 'active' : ''}`}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section className="filter-section">
          <div className="price-header">
            <h3>Price</h3>
            <span>Up to ${selectedPrice}</span>
          </div>
          <input
            type="range"
            min={50}
            max={maxPrice}
            step={10}
            value={selectedPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
          />
          <div className="price-range">
            <span>$50</span>
            <span>${maxPrice}</span>
          </div>
        </section>
      </aside>
    </>
  );
}
