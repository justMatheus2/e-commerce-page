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
  orderTotal: number;
  hasFreeShipping: boolean;
  onAddItem: (productId: number) => void;
  onDecreaseItem: (productId: number) => void;
  onRemoveItem: (productId: number) => void;
  onClose: () => void;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function CartModal({
  isOpen,
  items,
  subtotal,
  shippingFee,
  orderTotal,
  hasFreeShipping,
  onAddItem,
  onDecreaseItem,
  onRemoveItem,
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
                    <small>{currencyFormatter.format(product.price)} each</small>
                  </div>
                  <strong>{currencyFormatter.format(product.price * quantity)}</strong>

                  <div className="cart-item-actions">
                    <button className="cart-item-action" type="button" onClick={() => onDecreaseItem(product.id)}>
                      -
                    </button>
                    <button className="cart-item-action" type="button" onClick={() => onAddItem(product.id)}>
                      +
                    </button>
                    <button className="cart-item-action cart-item-remove" type="button" onClick={() => onRemoveItem(product.id)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-receipt">
                <div className="cart-summary-row">
                  <span>Items subtotal</span>
                  <strong>{currencyFormatter.format(subtotal)}</strong>
                </div>
                <div className="cart-summary-row shipping-row">
                  <span>Shipping</span>
                  <strong>{currencyFormatter.format(shippingFee)}</strong>
                </div>
                <div className="cart-summary-row cart-total-row">
                  <span>Total</span>
                  <strong>{currencyFormatter.format(orderTotal)}</strong>
                </div>
              </div>

              <p className={`shipping-note ${hasFreeShipping ? 'free' : ''}`}>
                {hasFreeShipping ? 'Shipping applied as a free item in the receipt.' : 'Shipping is being calculated together with your order total.'}
              </p>

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
