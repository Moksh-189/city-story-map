import { useState } from "react";

const ReportIssueForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Issue submitted successfully!");
    // TODO: connect with backend / Supabase / Firebase
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Report an Issue
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Issue Title */}
          <div>
            <label className="block text-sm text-white">Issue Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none"
              placeholder="E.g., Broken Streetlight"
              required
            />
          </div>

          {/* Issue Description */}
          <div>
            <label className="block text-sm text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none"
              rows={4}
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-white">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white focus:border-blue-400 focus:outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="road">Road</option>
              <option value="streetlight">Streetlight</option>
              <option value="sanitation">Sanitation</option>
              <option value="water">Water Supply</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-white">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none"
              placeholder="Enter location or landmark"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm text-white">Upload Image (optional)</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 w-full text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueForm;

