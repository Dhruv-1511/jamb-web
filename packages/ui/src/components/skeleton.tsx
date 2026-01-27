import { cn } from "@workspace/ui/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-md bg-shimmer", className)}
      {...props}
    />
  );
}

export { Skeleton };
