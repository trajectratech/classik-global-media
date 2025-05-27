import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MainButtonProps extends React.ComponentProps<typeof Button> {
  title?: string;
}

export const MainButton: React.FC<MainButtonProps> = ({
  title = "Buy Now",
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "flex-1 bg-golden/80 hover:bg-golden/50 text-white py-2 rounded-xl font-medium transition",
        className
      )}
      {...props}
    >
      {title}
    </Button>
  );
};
