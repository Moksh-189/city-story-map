import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileImage, MapPin, AlignLeft, Tag } from "lucide-react";

const ReportIssue = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    images: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✅ Issue Reported",
      description: "Thank you for contributing to a better city! 🚀",
    });
    setFormData({ title: "", description: "", location: "", category: "", images: null });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="glass-card w-full max-w-2xl rounded-3xl shadow-2xl p-10 animate-fade-in">
        {/* Heading */}
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent">
          Report an Issue
        </h1>
        <p className="text-center text-base text-primary-foreground/70 mb-8 font-sans">
          Help improve your community by reporting problems in your area.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary-foreground/80 mb-2 flex items-center gap-2">
              <AlignLeft size={16} /> Issue Title
            </label>
            <Input
              name="title"
              placeholder="e.g. Pothole on MG Road"
              value={formData.title}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-foreground/80 mb-2 flex items-center gap-2">
              <AlignLeft size={16} /> Description
            </label>
            <Textarea
              name="description"
              placeholder="Describe the issue clearly..."
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-[120px] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-foreground/80 mb-2 flex items-center gap-2">
              <MapPin size={16} /> Location
            </label>
            <Input
              name="location"
              placeholder="e.g. Near City Mall, Pune"
              value={formData.location}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-foreground/80 mb-2 flex items-center gap-2">
              <Tag size={16} /> Category
            </label>
            <Input
              name="category"
              placeholder="e.g. Roads, Lighting, Waste"
              value={formData.category}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-foreground/80 mb-2 flex items-center gap-2">
              <FileImage size={16} /> Upload Image
            </label>
            <Input
              name="images"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="rounded-xl cursor-pointer"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full btn-hero rounded-xl text-lg font-semibold"
          >
            Submit Report
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ReportIssue;
