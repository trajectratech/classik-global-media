import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductSpecificationsProps } from "@/interface/product";

const ProductSpecifications = ({
  description,
  specifications
}: ProductSpecificationsProps) => {
  console.log({ specifications });
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full grid grid-cols-2 mb-6">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-0">
        <div className="text-foreground/90 leading-relaxed">
          <p>{description}</p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-0">
        <dl className="space-y-4">
          {specifications?.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 py-2 border-b border-border"
            >
              <dt className="text-muted-foreground font-medium">
                {spec.label}
              </dt>
              <dd>{spec.value}</dd>
              {spec.unit && <dd>{spec.unit}</dd>}
            </div>
          ))}
        </dl>
      </TabsContent>
    </Tabs>
  );
};

export default ProductSpecifications;
