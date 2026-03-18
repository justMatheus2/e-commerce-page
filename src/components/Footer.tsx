import { FaTiktok } from "react-icons/fa";
import{ Instagram, Facebook, Linkedin, Twitter } from'lucide-react';

export function Footer() {
  return (
    <footer className="store-footer">
      <div className="footer-brand">
        <p className="eyebrow">Nova Electronics</p>
        <h2>Visit us or reach out anytime.</h2>
      </div>

      <div className="footer-grid">
        <section>
          <h3>Address</h3>
          <p>123 Green Road, Suite 405</p>
          <p>Dublin, X01 8AA</p>
        </section>

        <section>
          <h3>Contact</h3>
          <p>support@novaelectronics.com</p>
          <p>+353 12 345 6789</p>
        </section>

        <section>
          <h3>Social</h3>
          <div className="social-links">
            <a href="#" target="_blank" rel="noreferrer"><Instagram size={18}/></a>
            <a href="#" target="_blank" rel="noreferrer"><FaTiktok size={20} /></a>
            <a href="#" target="_blank" rel="noreferrer"><Facebook size={18}/></a>
            <a href="#" target="_blank" rel="noreferrer"><Linkedin size={18}/></a>
            <a href="#" target="_blank" rel="noreferrer"> <Twitter size={18} /></a>
            
          </div>
        </section>
      </div>
    </footer>
  );
}
