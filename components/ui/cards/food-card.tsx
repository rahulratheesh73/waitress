import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface FoodCardProps {
  title: string;
  image: StaticImageData;
  delay?: number;
}

const FoodCard = ({ title, image, delay = 0 }: FoodCardProps) => {
  return (
    <Link
      href={`/menu`}
      className={cn(
        "group min-h-20 relative overflow-hidden rounded-md bg-card shadow-card",
        "animate-fade-in-up",
        "transition-shadow duration-300 hover:shadow-card-hover",
        "cursor-pointer",
        `delay-[${delay}ms]`
      )}
    >
      <div className=" overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          width={100}
          height={100}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/20 to-transparent" />
      <div className="absolute bottom-0 top-[75%] left-0 right-0 bg-linear-to-t from-orange-700 via-orange-700 to-orange-300 blur-sm">
       
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-transparent">
        <h3 className="font-heading text-lg font-semibold text-center md:text-2xl text-card">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default FoodCard;
