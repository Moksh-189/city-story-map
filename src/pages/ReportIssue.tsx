import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileImage, MapPin, AlignLeft, Tag, Upload, CheckCircle, ChevronDown } from "lucide-react";

const ReportIssue = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    images: null as File | null,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const issueTypes = [
    { value: "potholes", label: "🕳️ Potholes", color: "from-orange-500 to-red-500" },
    { value: "water-leaks", label: "💧 Water Leaks", color: "from-blue-500 to-cyan-500" },
    { value: "water-logging", label: "🌊 Water Logging", color: "from-blue-600 to-indigo-600" },
    { value: "pipeline-damage", label: "🔧 Pipeline Damage", color: "from-gray-500 to-slate-600" },
    { value: "public-property", label: "🏛️ Public Property Damage", color: "from-purple-500 to-violet-600" },
    { value: "road-blocks", label: "🚧 Road Blocks", color: "from-yellow-500 to-orange-500" },
    { value: "street-lighting", label: "💡 Street Lighting Issues", color: "from-amber-500 to-yellow-500" },
    { value: "waste-management", label: "🗑️ Waste Management", color: "from-green-500 to-emerald-500" },
    { value: "traffic-signals", label: "🚦 Traffic Signal Issues", color: "from-red-500 to-pink-500" },
    { value: "other", label: "📝 Other Issues", color: "from-gray-600 to-slate-700" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategorySelect = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setIsDropdownOpen(false);
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-xl w-full max-w-2xl rounded-3xl shadow-2xl border border-white/20 p-10 hover:bg-white/15 transition-all duration-700 hover:shadow-3xl hover:border-white/30">
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-16 left-20 w-2.5 h-2.5 bg-cyan-400/60 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-1 h-1 bg-pink-400/60 rounded-full animate-bounce delay-500"></div>
        </div>

        {/* Heading with enhanced styling */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full transform scale-150"></div>
          <h1 className="relative font-bold text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
            Report an Issue
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-4 shadow-lg"></div>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            Help improve your community by reporting problems in your area
          </p>
        </div>

        {/* Form with enhanced styling */}
        <div className="space-y-8" onSubmit={handleSubmit}>
          <div className="group">
            <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-3 group-hover:text-blue-300 transition-colors">
              <div className="p-1.5 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <AlignLeft size={16} />
              </div>
              Issue Title
            </label>
            <Input
              name="title"
              placeholder="e.g. Pothole on MG Road"
              value={formData.title}
              onChange={handleChange}
              required
              className="rounded-2xl bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-lg py-6 hover:bg-white/15"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-3 group-hover:text-purple-300 transition-colors">
              <div className="p-1.5 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <AlignLeft size={16} />
              </div>
              Description
            </label>
            <Textarea
              name="description"
              placeholder="Describe the issue clearly..."
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-[140px] rounded-2xl bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-lg hover:bg-white/15 resize-none"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-3 group-hover:text-green-300 transition-colors">
              <div className="p-1.5 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <MapPin size={16} />
              </div>
              Location
            </label>
            <Input
              name="location"
              placeholder="e.g. Near City Mall, Pune"
              value={formData.location}
              onChange={handleChange}
              required
              className="rounded-2xl bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 text-lg py-6 hover:bg-white/15"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-3 group-hover:text-yellow-300 transition-colors">
              <div className="p-1.5 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                <Tag size={16} />
              </div>
              Issue Type
            </label>
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full rounded-2xl bg-white/10 border border-white/30 text-white px-6 py-6 text-lg cursor-pointer hover:bg-white/15 focus:bg-white/15 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 flex items-center justify-between"
              >
                <span className={formData.category ? "text-white" : "text-white/50"}>
                  {formData.category 
                    ? issueTypes.find(type => type.value === formData.category)?.label 
                    : "Select issue type..."
                  }
                </span>
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                  {issueTypes.map((type, index) => (
                    <div
                      key={type.value}
                      onClick={() => handleCategorySelect(type.value)}
                      className={`px-6 py-4 text-white cursor-pointer hover:bg-white/20 transition-all duration-200 flex items-center gap-3 ${
                        index === 0 ? 'rounded-t-2xl' : ''
                      } ${
                        index === issueTypes.length - 1 ? 'rounded-b-2xl' : ''
                      } ${
                        formData.category === type.value ? 'bg-white/25 border-l-4 border-l-yellow-400' : ''
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${type.color}`}></div>
                      <span className="text-lg font-medium">{type.label}</span>
                      {formData.category === type.value && (
                        <CheckCircle size={18} className="ml-auto text-yellow-400" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-3 group-hover:text-pink-300 transition-colors">
              <div className="p-1.5 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                <FileImage size={16} />
              </div>
              Upload Image
            </label>
            <div className="relative">
              <Input
                name="images"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="rounded-2xl bg-white/10 border-white/30 text-white file:bg-pink-500/20 file:text-white file:border-0 file:rounded-xl file:px-4 file:py-2 file:mr-4 focus:bg-white/15 focus:border-pink-400/50 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 py-6 hover:bg-white/15 cursor-pointer"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Upload size={20} className="text-white/50" />
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            type="button"
            size="lg"
            className="w-full py-8 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.02] transition-all duration-300 border-0 hover:border-0 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <CheckCircle size={24} />
              Submit Report
            </div>
          </Button>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ReportIssue;
