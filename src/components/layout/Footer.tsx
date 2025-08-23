import { Link } from "react-router-dom";
import { Coffee, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-earth-brown text-off-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-8 w-8 text-sage-green" />
              <span className="text-2xl font-bold font-playfair">Eco Brews Café</span>
            </div>
            <p className="text-soft-beige mb-6 max-w-md">
              Brewing sustainable coffee while nurturing our planet. Every cup makes a difference 
              in supporting fair trade farmers and reducing environmental impact.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-sage-green/20 rounded-full hover:bg-sage-green/30 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-sage-green/20 rounded-full hover:bg-sage-green/30 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-sage-green/20 rounded-full hover:bg-sage-green/30 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sage-green">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/menu" className="text-soft-beige hover:text-sage-green transition-colors">Menu</Link></li>
              <li><Link to="/about" className="text-soft-beige hover:text-sage-green transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="text-soft-beige hover:text-sage-green transition-colors">Our Impact</Link></li>
              <li><Link to="/events" className="text-soft-beige hover:text-sage-green transition-colors">Events</Link></li>
              <li><Link to="/shop" className="text-soft-beige hover:text-sage-green transition-colors">Shop</Link></li>
              <li><Link to="/loyalty" className="text-soft-beige hover:text-sage-green transition-colors">Loyalty Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sage-green">Visit Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-sage-green mt-0.5" />
                <div>
                  <p className="text-soft-beige">Downtown Branch</p>
                  <p className="text-sm text-soft-beige/80">123 Green Street<br />Eco City, EC 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-sage-green" />
                <p className="text-soft-beige">(555) 123-BREW</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-sage-green" />
                <p className="text-soft-beige">hello@ecobrews.com</p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-sage-green mt-0.5" />
                <div>
                  <p className="text-soft-beige">Mon-Fri: 6:00 AM - 8:00 PM</p>
                  <p className="text-soft-beige">Sat-Sun: 7:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-soft-beige/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-soft-beige/80 text-sm">
            © 2024 Eco Brews Café. All rights reserved. Brewing sustainably since 2019.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-soft-beige/80 hover:text-sage-green text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-soft-beige/80 hover:text-sage-green text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;