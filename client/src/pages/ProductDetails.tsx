import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import images
import gulabJamunImage from "@/assets/gulab-jamun.jpg";
import ladduImage from "@/assets/laddu.jpg";
import kajuKatliImage from "@/assets/kaju-katli.jpg";
import rasgullaImage from "@/assets/rasgulla.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, fetch by ID
  const product = {
    id: "1",
    name: "Premium Gulab Jamun",
    price: 250,
    originalPrice: 300,
    images: [gulabJamunImage, gulabJamunImage, gulabJamunImage],
    category: "Milk Based",
    rating: 4.8,
    reviews: 124,
    description: "Indulge in our signature Gulab Jamun, made with the finest khoya (milk solids) and pure cow ghee. These soft, spongy spheres are gently fried to golden perfection and soaked in aromatic sugar syrup infused with cardamom and rose water. Each bite melts in your mouth, delivering the authentic taste that has been loved for generations.",
    ingredients: ["Fresh Khoya (Milk Solids)", "Pure Cow Ghee", "All-purpose Flour", "Sugar", "Cardamom", "Rose Water", "Pistachios"],
    nutritionalInfo: {
      calories: "280 per piece",
      protein: "4g",
      carbs: "45g",
      fat: "8g"
    },
    inStock: true,
    stockCount: 15,
    features: [
      "Made with 100% pure ingredients",
      "No artificial colors or preservatives", 
      "Freshly prepared daily",
      "Traditional recipe since 1985"
    ],
    shelfLife: "3 days at room temperature, 7 days refrigerated",
    weight: "500g (approx 8-10 pieces)"
  };

  const relatedProducts = [
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

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-sweet-cream">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {discount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {discount}% OFF
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                variant="gradient"
                size="lg"
                className="flex-1"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? 'text-red-500 border-red-500' : ''}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Free Delivery</h4>
                  <p className="text-xs text-muted-foreground">On orders above ₹500</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Quality Assured</h4>
                  <p className="text-xs text-muted-foreground">Fresh & authentic</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Easy Returns</h4>
                  <p className="text-xs text-muted-foreground">7-day return policy</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Nutritional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Nutritional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Weight:</strong> {product.weight}</p>
                    <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;