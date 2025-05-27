import { Badge } from "@/components/ui/badge";

interface ProductHeaderProps {
  name: string;
  price: string;
  category: string;
  inStock: boolean;
}

const ProductHeader = ({
  name,
  price,
  category,
  inStock
}: ProductHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-2">
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>
        {inStock ? (
          <Badge
            variant="outline"
            className="text-xs bg-green-50 text-green-700 border-green-200"
          >
            In Stock
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-xs bg-red-50 text-red-700 border-red-200"
          >
            Out of Stock
          </Badge>
        )}
      </div>

      <h1 className="text-3xl font-bold tracking-tight">{name}</h1>

      <div className="mt-4 flex items-baseline">
        <span className="text-2xl font-semibold text-foreground">
          ₦ {price}
        </span>
      </div>
    </div>
  );
};

export default ProductHeader;
