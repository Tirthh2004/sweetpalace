import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, ShoppingCart, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import gulabJamunImage from "@/assets/gulab-jamun.jpg";
import heroImage from "@/assets/hero-sweet-shop.jpg";
import kajuKatliImage from "@/assets/kaju-katli.jpg";
import ladduImage from "@/assets/laddu.jpg";
import rasgullaImage from "@/assets/rasgulla.jpg";

const Home = () => {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: "1",
      name: "Gulab Jamun",
      price: 250,
      originalPrice: 300,
      image: gulabJamunImage,
      category: "Milk Based",
      rating: 4.8,
      reviews: 124,
      description: "Soft, spongy balls soaked in aromatic sugar syrup",
      inStock: true,
    },
    {
      id: "2",
      name: "Motichoor Laddu",
      price: 320,
      image: ladduImage,
      category: "Festival Special",
      rating: 4.7,
      reviews: 89,
      description: "Traditional round sweets made with fine gram flour pearls",
      inStock: true,
    },
    {
      id: "3",
      name: "Kaju Katli",
      price: 800,
      originalPrice: 900,
      image: kajuKatliImage,
      category: "Dry Fruits",
      rating: 4.9,
      reviews: 156,
      description: "Premium cashew diamond-shaped sweets with silver leaf",
      inStock: true,
    },
    {
      id: "4",
      name: "Rasgulla",
      price: 180,
      image: rasgullaImage,
      category: "Bengali",
      rating: 4.6,
      reviews: 78,
      description: "Soft cottage cheese balls in light sugar syrup",
      inStock: true,
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "The best sweets in town! Fresh, delicious and authentic taste.",
      location: "Mumbai",
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Ordered for Diwali celebration. Everyone loved the variety and quality.",
      location: "Delhi",
    },
    {
      name: "Meera Patel",
      rating: 5,
      comment: "Amazing packaging and fast delivery. Highly recommend!",
      location: "Pune",
    },
  ];

  const stats = [
    { icon: Users, label: "Happy Customers", value: "50,000+" },
    { icon: Award, label: "Years of Excellence", value: "35+" },
    { icon: Star, label: "Average Rating", value: "4.8" },
    { icon: ShoppingCart, label: "Orders Delivered", value: "2,00,000+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Sweet Palace Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary">
            Since 1985 - Traditional Excellence
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Sweet Palace
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Discover the finest collection of traditional Indian sweets, 
            crafted with love and served with pride for over three decades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-black hover:bg-white hover:text-black">
              View Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-sweet-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Best Sellers</Badge>
            <h2 className="text-4xl font-bold mb-4">Featured Sweets</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selection of our most loved traditional sweets, 
              made with the finest ingredients and time-honored recipes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={(id, quantity) => {
                  console.log(`Added ${quantity} of product ${id} to cart`);
                }}
                onToggleFavorite={(id) => {
                  console.log(`Toggled favorite for product ${id}`);
                }}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Customer Love</Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers 
              who have made us part of their celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sweet-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Sweeten Your Day?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the magic of our 
            traditional sweets delivered fresh to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="gradient" size="lg">
                Shop Now
                <ShoppingCart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;