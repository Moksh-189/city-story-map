import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, Camera, AlertCircle, FileImage, 
  ArrowLeft, CheckCircle, Send, Info 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    priority: "",
    images: null as File | null,
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const categories = [
    "Roads & Infrastructure",
    "Street Lighting", 
    "Waste Management",
    "Water & Drainage",
    "Public Safety",
    "Parks & Recreation",
    "Traffic & Transport",
    "Other"
  ];

  const priorities = [
    { value: "low", label: "Low Priority", color: "text-blue-600", desc: "Minor issues that can be addressed in routine maintenance" },
    { value: "medium", label: "Medium Priority", color: "text-yellow-600", desc: "Issues affecting daily life but not immediately dangerous" },
    { value: "high", label: "High Priority", color: "text-red-600", desc: "Issues that pose risk or significantly impact community" },
    { value: "urgent", label: "Urgent", color: "text-red-800", desc: "Immediate attention required - safety hazard or severe disruption" }
  ];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, images: e.target.files![0] }));
    }
  };

  const handleSubmit = () => {
    toast({
      title: "✅ Issue Reported Successfully!",
      description: "Thank you for helping improve your community. We'll keep you updated on progress.",
    });
    
    // Reset form
    setFormData({
      title: "", description: "", location: "", 
      category: "", priority: "", images: null
    });
    setStep(1);
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return formData.title.trim() && formData.description.trim();
      case 2: return formData.location.trim() && formData.category;
      case 3: return formData.priority;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Report an Issue</h1>
                <p className="text-sm text-muted-foreground">Help improve your community</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-8 h-2 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
              <span className="font-medium">Step {step} of {totalSteps}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-card/98 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  {step === 1 && <AlertCircle className="w-6 h-6 text-white" />}
                  {step === 2 && <MapPin className="w-6 h-6 text-white" />}
                  {step === 3 && <CheckCircle className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {step === 1 && "Describe the Issue"}
                    {step === 2 && "Location & Category"}  
                    {step === 3 && "Priority & Evidence"}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {step === 1 && "Tell us what's happening in your community"}
                    {step === 2 && "Help us understand where and what type of issue"}
                    {step === 3 && "Set priority and add supporting evidence"}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Step 1: Issue Details */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      Issue Title *
                    </label>
                    <Input
                      placeholder="e.g., Large pothole on MG Road causing traffic issues"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="h-12 text-base border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      Detailed Description *
                    </label>
                    <Textarea
                      placeholder="Describe the issue in detail. Include when you noticed it, how it affects the community, and any other relevant information..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      className="min-h-[140px] text-base resize-none border-border focus:border-primary"
                    />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>The more details you provide, the faster we can address the issue.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Category */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      Exact Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                      <Input
                        placeholder="e.g., Near City Mall, Brigade Road, Bangalore 560001"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="h-12 pl-12 text-base border-border focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>Include landmarks, street names, and area details for quick identification.</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      Issue Category *
                    </label>
                    <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                      <SelectTrigger className="h-12 text-base border-border">
                        <SelectValue placeholder="Select the category that best describes this issue" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Priority & Evidence */}
              {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-foreground">
                      Priority Level *
                    </label>
                    <div className="space-y-3">
                      {priorities.map((priority) => (
                        <div key={priority.value}>
                          <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-muted/30 ${
                            formData.priority === priority.value 
                              ? 'border-primary bg-primary/5 shadow-sm' 
                              : 'border-border hover:border-primary/50'
                          }`}>
                            <input
                              type="radio"
                              name="priority"
                              value={priority.value}
                              checked={formData.priority === priority.value}
                              onChange={(e) => handleChange('priority', e.target.value)}
                              className="w-4 h-4 text-primary mt-1"
                            />
                            <div className="flex-1">
                              <div className={`font-semibold ${priority.color}`}>
                                {priority.label}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {priority.desc}
                              </p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      Upload Evidence (Optional)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all hover:bg-primary/5">
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <Camera className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-primary font-semibold hover:text-primary/80 text-lg">
                              Click to upload photos
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                              multiple
                            />
                          </label>
                          <p className="text-sm text-muted-foreground mt-2">
                            PNG, JPG up to 10MB each • Multiple files supported
                          </p>
                        </div>
                        {formData.images && (
                          <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg py-2 px-4">
                            <FileImage className="w-4 h-4" />
                            {formData.images.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-border">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} className="h-12 px-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : <div />}
                
                <div className="flex gap-3">
                  {step < totalSteps ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="bg-primary hover:bg-primary/90 h-12 px-8 font-semibold"
                    >
                      Continue
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  ) : (
                    <Button 
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isStepValid()}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold h-12 px-8"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Report
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-8 bg-muted/50 border-0">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Need Help?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For urgent issues requiring immediate attention (like gas leaks, electrical hazards, or medical emergencies), 
                    please contact emergency services directly. This platform is for non-emergency community improvements.
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-3">
                    <span>Emergency: 112</span>
                    <span>Police: 100</span>
                    <span>Fire: 101</span>
                    <span>Ambulance: 108</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
