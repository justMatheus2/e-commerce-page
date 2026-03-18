import { X } from 'lucide-react';
import type { Product } from '../types';

type CartLine = {
  product: Product;
  quantity: number;
};

type CartModalProps = {
  isOpen: boolean;
  items: CartLine[];
  subtotal: number;
  shippingFee: number;
  hasFreeShipping: boolean;
  onClose: () => void;
};

export function CartModal({
  isOpen,
  items,
  subtotal,
  shippingFee,
  hasFreeShipping,
  onClose,
}: CartModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="cart-backdrop" onClick={onClose} />
      <section className="cart-modal" aria-label="Shopping cart details" role="dialog" aria-modal="true">
        <div className="cart-modal-header">
          <div>
            <p className="eyebrow">Cart Summary</p>
            <h2>Your items</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">empty cart.</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article key={product.id} className="cart-item">
                  <img src={product.image} alt={product.title} className="cart-item-image" />
                  <div className="cart-item-copy">
                    <h3>{product.title}</h3>
                    <p>Qty: {quantity}</p>
                  </div>
                  <strong>${product.price * quantity}</strong>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Total</span>
                <strong>${subtotal}</strong>
              </div>
              <p className={`shipping-note ${hasFreeShipping ? 'free' : ''}`}>
                {hasFreeShipping ? 'Free shipping' : '$30 shipping fee'}
              </p>
              {!hasFreeShipping ? (
                <div className="cart-summary-row shipping-row">
                  <span>Shipping</span>
                  <strong>${shippingFee}</strong>
                </div>
              ) : null}
              <button className="buy-now-button" type="button">
                Buy Now
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
