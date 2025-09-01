import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, Eye, PencilLine } from "lucide-react";
import type { Creator } from "@/types";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}

const CreatorCard = ({ creator }: { creator: Creator }) => {
  const hasImage = !!creator.imageURL && creator.imageURL.trim().length > 0;
  const fallbackImg = `https://avatar.vercel.sh/?size=200?text=${encodeURIComponent(
    getInitials(creator.name)
  )}`;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      {/* Media / Banner */}
      <div className="relative h-40 w-full bg-muted">
        {hasImage ? (
          <img
            src={creator.imageURL!}
            alt={creator.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Avatar className="h-16 w-16 shadow-sm">
              <AvatarImage src={fallbackImg} alt={creator.name} />
              <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
            </Avatar>
          </div>
        )}
        {/* Subtle top gradient for readability when image exists */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/10" />
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-1 text-lg">
          <Link
            to={`/creators/${creator.id}`}
            className="transition-colors hover:text-primary"
          >
            {creator.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {creator.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          <a
            href={creator.url}
            target="_blank"
            rel="noreferrer noopener"
            className="truncate underline-offset-2 hover:underline"
            aria-label={`Open ${creator.name} channel`}
          >
            {creator.url}
          </a>
        </div>
      </CardContent>

      <Separator className="my-2" />

      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="secondary">
            <Link
              to={`/creators/${creator.id}`}
              aria-label={`View ${creator.name}`}
            >
              <Eye className="mr-2 h-4 w-4" /> View
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link
              to={`/creators/${creator.id}/edit`}
              aria-label={`Edit ${creator.name}`}
            >
              <PencilLine className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
        <Avatar className="h-8 w-8 md:hidden">
          <AvatarImage
            src={hasImage ? creator.imageURL! : fallbackImg}
            alt={creator.name}
          />
          <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
        </Avatar>
      </CardFooter>
    </Card>
  );
};
export default CreatorCard;
