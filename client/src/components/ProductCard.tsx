import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description?: string;
  inStock: boolean;
  isFavorite?: boolean;
  onAddToCart?: (id: string, quantity: number) => void;
  onToggleFavorite?: (id: string) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  reviews,
  description,
  inStock,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    onAddToCart?.(id, quantity);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleFavoriteToggle = () => {
    onToggleFavorite?.(id);
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-card border-2 border-border/50 hover:border-primary/30 overflow-hidden">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-sweet-cream">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground font-bold">
              {discount}% OFF
            </Badge>
          )}
          {!inStock && (
            <Badge variant="secondary" className="bg-gray-500 text-white">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
          onClick={handleFavoriteToggle}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="gradient"
            onClick={handleAddToCart}
            disabled={!inStock || isLoading}
            className="shadow-lg"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs text-muted-foreground">
              {rating} ({reviews})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2 group-hover:text-primary">
            {name}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Selector & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= 10}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={handleAddToCart}
            disabled={!inStock || isLoading}
            className="flex-1 ml-3"
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;