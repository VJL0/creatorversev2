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
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { PencilLine, ArrowLeft } from "lucide-react";

import CreatorForm from "@/components/CreatorForm";
import { getCreator, updateCreator, deleteCreator } from "@/client";
import type { Creator } from "@/types";
import DeleteCreatorButton from "@/components/DeleteCreatorButton";

export default function EditCreator() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCreator() {
      try {
        setLoading(true);
        const data = await getCreator(id!);
        setCreator(data);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchCreator();
  }, [id]);

  async function handleSubmit(updated: Creator) {
    try {
      setSaving(true);
      await updateCreator(updated);
      navigate(`/creators/${id}`);
    } catch (e: any) {
      setError(e?.message ?? "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!id) return;
    try {
      setDeleting(true);
      await deleteCreator(String(id));
      navigate(`/`);
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PencilLine className="h-5 w-5" /> Edit Creator
            </CardTitle>
            <CardDescription>
              Update the channel name, URL, description, or image.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Skeleton className="h-9 w-24" />
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
            <CardTitle>Unable to edit</CardTitle>
            <CardDescription className="text-red-600 dark:text-red-400">
              Creator not found
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
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PencilLine className="h-5 w-5" /> Edit Creator
          </CardTitle>
          <CardDescription>
            Update the channel name, URL, description, or image.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <CreatorForm initial={creator} onSubmit={handleSubmit} />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button form="creator-form" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
            <Button asChild variant="secondary" disabled={saving}>
              <Link to={`/creators/${creator.id}`}>Cancel</Link>
            </Button>
          </div>

          <DeleteCreatorButton deleting={deleting} onDelete={onDelete} />
        </CardFooter>
      </Card>
    </section>
  );
}
