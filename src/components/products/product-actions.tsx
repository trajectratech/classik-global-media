import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/product";
import { getWhatsAppLink } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface ProductActionsProps {
  inStock: boolean;
  whatsapp: string;
  product: IProduct;
}

const ProductActions = ({
  inStock,
  whatsapp,
  product
}: ProductActionsProps) => {
  return (
    <div className="flex flex-col space-y-3 mt-8">
      <Link
        href={getWhatsAppLink(product, whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        prefetch
      >
        <Button className="w-full" disabled={!inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </Button>
      </Link>
    </div>
  );
};

export default ProductActions;
