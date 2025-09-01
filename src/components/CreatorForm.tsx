import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Creator } from "@/types";

interface CreatorFormProps {
  initial?: Creator;
  onSubmit: (values: Creator) => Promise<void>;
}

export default function CreatorForm({ initial, onSubmit }: CreatorFormProps) {
  const [values, setValues] = useState<Creator>({
    id: initial?.id ?? "",
    name: initial?.name ?? "",
    url: initial?.url ?? "",
    description: initial?.description ?? "",
    imageURL: initial?.imageURL ?? "",
    created_at: initial?.created_at ?? "",
  });

  function set<K extends keyof Creator>(key: K, v: Creator[K]) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  return (
    <form
      id="creator-form"
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <Input
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Fireship"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Channel URL</label>
        <Input
          value={values.url}
          onChange={(e) => set("url", e.target.value)}
          placeholder="https://youtube.com/@someone"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <Textarea
          rows={5}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="What kind of content do they make?"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Image URL (optional)
        </label>
        <Input
          value={values.imageURL ?? ""}
          onChange={(e) => set("imageURL", e.target.value)}
          placeholder="https://…/avatar.png"
        />
      </div>
    </form>
  );
}
