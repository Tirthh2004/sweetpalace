import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSweets } from "@/lib/api";
import { useCart } from "@/context/CartContext";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadSweets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSweets();
        console.log("Loaded products:", data); // Debug log
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching sweets:", error);
        setError(error.message || "Failed to load sweets");
      } finally {
        setLoading(false);
      }
    };

    loadSweets();
  }, []);

  const categories = [
    "all",
    "Milk Based",
    "Dry Fruits",
    "Bengali",
    "Festival Special",
    "Traditional",
    "Gift Box",
  ];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [allProducts, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (productId, quantity) => {
    console.log("handleAddToCart called with:", { productId, quantity }); // Debug log
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    console.log("Found product:", product); // Debug log
    console.log("Adding to cart..."); // Debug log

    try {
      addToCart({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image_url || product.image,
        quantity: quantity || 1,
        weight: product.weight || "500g",
      });
      
      console.log("Successfully added to cart!"); // Debug log
      
      // Optional: Show a success message
      alert(`${product.name} added to cart!`);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading sweets...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-12">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold mb-2">Error Loading Sweets</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-warm py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Sweet Collection</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of traditional Indian sweets, each crafted with authentic recipes and finest ingredients.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search sweets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className={`flex flex-col lg:flex-row gap-4 w-full lg:w-auto ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {(selectedCategory !== "all" || searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""} Found
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <Card className="p-12 text-center">
              <CardContent>
                <div className="text-6xl mb-4">🍯</div>
                <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice || null}
                  image={product.image_url || product.image || 'https://via.placeholder.com/300x200?text=Sweet'}
                  category={product.category || 'Traditional'}
                  rating={product.rating || 4.5}
                  reviews={product.reviews || 10}
                  description={product.description || ''}
                  inStock={product.inStock !== false} // Default to true if not specified
                  isFavorite={false}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={(id) => {
                    console.log(`Toggled favorite for product ${id}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;