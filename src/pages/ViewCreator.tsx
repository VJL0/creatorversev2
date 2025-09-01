import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { ExternalLink, PencilLine, ArrowLeft } from "lucide-react";
import type { Creator } from "@/types";
import { deleteCreator, getCreator } from "@/client";
import DeleteCreatorButton from "@/components/DeleteCreatorButton";

function FallbackAvatar({
  name,
  src,
  size = 64,
}: {
  name: string;
  src?: string | null;
  size?: number;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  const fallbackImg = `https://avatar.vercel.sh/${encodeURIComponent(
    name
  )}?size=${size}`;
  const finalSrc = src && src.trim().length > 0 ? src : fallbackImg;
  return (
    <Avatar className="h-20 w-20 md:h-24 md:w-24 shadow-sm">
      <AvatarImage src={finalSrc} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchCreator() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCreator(id!);
        setCreator(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load creator");
      } finally {
        setLoading(false);
      }
    }
    fetchCreator();
  }, []);

  async function handleDelete() {
    if (!id) return;
    try {
      setDeleting(true);
      await deleteCreator(String(id));
      navigate("/", { replace: true });
    } catch (e: any) {
      setError(e?.message ?? "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <Button variant="ghost" disabled className="-ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="w-full">
              <Skeleton className="mb-2 h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
          </CardFooter>
        </Card>
      </section>
    );
  }

  if (error || !creator) {
    return (
      <section className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription className="text-red-600 dark:text-red-400">
              {error ?? "Creator not found"}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Go home
            </Button>
          </CardFooter>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="overflow-hidden">
        <div className="relative h-28 w-full bg-muted/50"/>

        <CardHeader className="-mt-10 flex flex-row items-end gap-4">
          <FallbackAvatar
            name={creator.name}
            src={creator.imageURL ?? undefined}
          />
          <div className="flex-1">
            <CardTitle className="text-2xl">{creator.name}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2 text-sm">
              <ExternalLink className="h-4 w-4" aria-hidden />
              <a
                href={creator.url}
                target="_blank"
                rel="noreferrer noopener"
                className="truncate underline-offset-2 hover:underline"
                aria-label={`Open ${creator.name} channel`}
              >
                {creator.url}
              </a>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Separator />
          <div>
            <h2 className="mb-2 text-base font-semibold">About</h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {creator.description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button asChild>
              <Link to={`/creators/${creator.id}/edit`}>
                <PencilLine className="mr-2 h-4 w-4" /> Edit
              </Link>
            </Button>

            <DeleteCreatorButton deleting={deleting} onDelete={handleDelete} />
          </div>

          <Button asChild variant="secondary">
            <a href={creator.url} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="mr-2 h-4 w-4" /> Visit Channel
            </a>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
