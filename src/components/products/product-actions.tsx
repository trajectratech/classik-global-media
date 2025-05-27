/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductActionsProps {
  onBuyNow: () => void;
  onMoreInfo: () => void;
  inStock: boolean;
}

const ProductActions = ({
  onBuyNow,
  onMoreInfo,
  inStock
}: ProductActionsProps) => {
  return (
    <div className="flex flex-col space-y-3 mt-8">
      <Button onClick={onBuyNow} className="w-full" disabled={!inStock}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Buy Now
      </Button>

      {/* <Button variant="outline" onClick={onMoreInfo} className="w-full">
				<Eye className="mr-2 h-4 w-4" />
				More Information
			</Button> */}
    </div>
  );
};

export default ProductActions;
