import { useState, useMemo } from "react";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import images
import gulabJamunImage from "@/assets/gulab-jamun.jpg";
import ladduImage from "@/assets/laddu.jpg";
import kajuKatliImage from "@/assets/kaju-katli.jpg";
import rasgullaImage from "@/assets/rasgulla.jpg";
import mixedSweetsImage from "@/assets/mixed-sweets.jpg";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data
  const allProducts = [
    {
      id: "1",
      name: "Gulab Jamun",
      price: 250,
      originalPrice: 300,
      image: gulabJamunImage,
      category: "Milk Based",
      rating: 4.8,
      reviews: 124,
      description: "Soft, spongy balls soaked in aromatic sugar syrup. Made with fresh khoya and pure ghee.",
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
      description: "Traditional round sweets made with fine gram flour pearls and pure ghee.",
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
      description: "Premium cashew diamond-shaped sweets with edible silver leaf.",
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
      description: "Soft cottage cheese balls in light sugar syrup, authentic Bengali recipe.",
      inStock: true,
    },
    {
      id: "5",
      name: "Besan Laddu",
      price: 280,
      originalPrice: 320,
      image: ladduImage,
      category: "Traditional",
      rating: 4.5,
      reviews: 95,
      description: "Traditional gram flour laddus with almonds and cardamom.",
      inStock: true,
    },
    {
      id: "6",
      name: "Kaju Roll",
      price: 650,
      image: kajuKatliImage,
      category: "Dry Fruits",
      rating: 4.7,
      reviews: 67,
      description: "Cashew rolls filled with dates and dry fruits.",
      inStock: false,
    },
    {
      id: "7",
      name: "Ras Malai",
      price: 300,
      image: gulabJamunImage,
      category: "Bengali",
      rating: 4.8,
      reviews: 112,
      description: "Soft cottage cheese dumplings in sweetened milk with pistachios.",
      inStock: true,
    },
    {
      id: "8",
      name: "Mixed Sweets Box",
      price: 550,
      originalPrice: 650,
      image: mixedSweetsImage,
      category: "Gift Box",
      rating: 4.9,
      reviews: 234,
      description: "Assorted traditional sweets perfect for gifting and celebrations.",
      inStock: true,
    },
  ];

  const categories = [
    "all",
    "Milk Based",
    "Dry Fruits",
    "Bengali",
    "Festival Special",
    "Traditional",
    "Gift Box",
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-warm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Sweet Collection</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our wide range of traditional Indian sweets, 
              each crafted with authentic recipes and finest ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
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
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Filters */}
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
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <Card className="p-12 text-center">
              <CardContent>
                <div className="text-6xl mb-4">🍯</div>
                <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;