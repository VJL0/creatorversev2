import { useState } from "react";
import { useNavigate } from "react-router";
import { addCreator } from "../client";
import CreatorForm from "@/components/CreatorForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, PencilLine } from "lucide-react";
import type { Creator } from "@/types";

export default function AddCreator() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(creator: Creator) {
    try {
      setSaving(true);
      await addCreator(creator);
      navigate("/");
    } catch (e: any) {
      setError(e?.message ?? "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }
  if (error) {
    return (
      <section className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader>
            <CardTitle>Unable to add</CardTitle>
            <CardDescription className="text-red-600 dark:text-red-400">
              {error}
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
            <PencilLine className="h-5 w-5" /> Add Creator
          </CardTitle>
          <CardDescription>
            Add the channel name, URL, description.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatorForm onSubmit={handleSubmit} />
        </CardContent>
        <CardFooter>
          <Button form="creator-form" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Add Creator"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
