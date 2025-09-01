import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CreatorCard from "@/components/CreatorCard";
import { getCreators } from "@/client";
import type { Creator } from "@/types";

export default function ShowCreators() {
  const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCreators() {
      try {
        setError(null);
        setLoading(true);
        const data = await getCreators();
        setCreators(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load creators");
      } finally {
        setLoading(false);
      }
    }
    fetchCreators();
  }, []);

  const grid = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {creators.map((c) => (
        <CreatorCard key={c.id} creator={c} />
      ))}
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Creators</h1>
          {!loading && !error && (
            <p className="mt-1 text-sm text-muted-foreground">
              {creators.length} saved
            </p>
          )}
        </div>
        <Button asChild>
          <Link to="/creators/new">Add Creator</Link>
        </Button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-300/50 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950 dark:text-red-300">
          <div className="mb-2 font-semibold">Something went wrong</div>
          <p className="mb-3">{error}</p>
          <Button size="sm" variant="secondary">
            <Link to="/">Try again</Link>
          </Button>
        </div>
      )}

      {!loading && !error && creators.length == 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border p-10 text-center">
          <h2 className="text-lg font-semibold">No creators yet</h2>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Add your first favorite creator to get started. You can include a
            name, their channel URL, a short description, and an optional image.
          </p>
          <Button asChild className="mt-4">
            <Link to="/creators/new">Add Creator</Link>
          </Button>
        </div>
      )}

      {!loading && !error && creators.length > 0 && grid}
    </section>
  );
}
