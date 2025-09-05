import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    priority: "medium",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Issue submitted:", formData);
    // 🔗 Later you can connect this to Supabase / API
  };

  return (
    <div className="flex justify-center items-center p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Report an Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Issue Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Describe the issue"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Roads">Roads</option>
              <option value="Lighting">Lighting</option>
              <option value="Water">Water</option>
              <option value="Waste">Waste</option>
              <option value="Vandalism">Vandalism</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Button type="submit" className="w-full">
              Submit Issue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIssue;
