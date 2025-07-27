import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sweet-brown text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🍬</span>
              </div>
              <span className="text-xl font-bold">Sweet Palace</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Serving the finest traditional Indian sweets since 1985. Made with love, 
              served with pride - bringing sweetness to every celebration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "All Products", href: "/products" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Cart", href: "/cart" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Categories</h3>
            <ul className="space-y-2">
              {[
                "Milk Based",
                "Dry Fruits",
                "Festival Special",
                "Sugar Free",
                "Bengali Sweets",
                "South Indian",
              ].map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${category.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  123 Sweet Street, Gandhi Nagar<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-gray-300 text-sm">hello@sweetpalace.com</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary font-medium">Store Hours</p>
              <p className="text-xs text-gray-300 mt-1">
                Mon - Sat: 9:00 AM - 9:00 PM<br />
                Sunday: 10:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Sweet Palace. All rights reserved. Made with ❤️ for sweet lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;