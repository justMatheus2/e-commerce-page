import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: number) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
        <span className="product-tag">{product.tag}</span>
      </div>

      <div className="product-copy">
        <p className="product-category">{product.category}</p>
        <h3>{product.title}</h3>
        <div className="product-footer">
          <strong>${product.price}</strong>
          <button type="button" onClick={() => onAddToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
