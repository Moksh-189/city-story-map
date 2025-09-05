import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Filter, MapPin, Calendar, User, 
  AlertCircle, CheckCircle, Clock, Eye, Edit,
  Plus, Download, RefreshCw
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminIssues = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const issues = [
   {
  id: "ISS-2024-001",
  title: "Pothole on MG Road",
  description: "Large pothole causing traffic issues and potential vehicle damage",
  location: "MG Road , Bengaluru",
  category: "Roads",
  status: "new",
  priority: "high",
  reportedAt: "2024-01-15T10:30:00Z",
  reportedBy: "Aarav Mehta",
  assignedTo: null,
  images: 2
},
{
  id: "ISS-2024-002", 
  title: "Broken Street Light",
  description: "Street light flickering and completely dark during night hours",
  location: "Lodhi Road, Delhi",
  category: "Lighting",
  status: "progress",
  priority: "medium",
  reportedAt: "2024-01-14T14:15:00Z",
  reportedBy: "Shruti Agarwal",
  assignedTo: "Rohan Iyer",
  images: 1
},
{
  id: "ISS-2024-003",
  title: "Garbage Collection Missed",
  description: "Scheduled pickup was missed, bins overflowing on multiple streets",
  location: "Shivaji Nagar, Pune",
  category: "Waste",
  status: "resolved",
  priority: "low",
  reportedAt: "2024-01-12T08:45:00Z",
  reportedBy: "Rohan Iyer",
  assignedTo: "Tanvi Verma",
  images: 0
},
{
  id: "ISS-2024-004",
  title: "Water Leak on Anna Salai",
  description: "Underground water pipe leak causing flooding on sidewalk",
  location: "Anna Salai, Chennai",
  category: "Water",
  status: "new",
  priority: "high",
  reportedAt: "2024-01-15T16:20:00Z",
  reportedBy: "Ishita Ghosh",
  assignedTo: null,
  images: 3
},
{
  id: "ISS-2024-005",
  title: "Graffiti on Public Building",
  description: "Vandalism reported on municipal office exterior wall",
  location: "Municipal Office, Connaught Place, Delhi",
  category: "Vandalism",
  status: "progress",
  priority: "medium",
  reportedAt: "2024-01-13T11:00:00Z",
  reportedBy: "Aditya Rao",
  assignedTo: "Meera Chauhan",
  images: 2
}
]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewIssue = (issueId: string) => {
    toast({
      title: "View Issue",
      description: `Opening details for ${issueId}`,
    });
  };

  const handleEditIssue = (issueId: string) => {
    toast({
      title: "Edit Issue", 
      description: `Opening edit form for ${issueId}`,
    });
  };

  // Filter and sort issues
  const filteredIssues = issues
    .filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
        case "oldest":
          return new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime();
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">Issue Management</h1>
            <p className="text-muted-foreground">Monitor and manage community-reported issues</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Issues
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Issue
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold">2,156</p>
                </div>
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">New Issues</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Clock className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">143</p>
                </div>
                <RefreshCw className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">1,924</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="admin-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search issues by ID, title, or location..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues Table */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle>All Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium text-muted-foreground">Issue ID</th>
                    <th className="pb-3 font-medium text-muted-foreground">Title</th>
                    <th className="pb-3 font-medium text-muted-foreground">Location</th>
                    <th className="pb-3 font-medium text-muted-foreground">Category</th>
                    <th className="pb-3 font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 font-medium text-muted-foreground">Priority</th>
                    <th className="pb-3 font-medium text-muted-foreground">Reported</th>
                    <th className="pb-3 font-medium text-muted-foreground">Assigned To</th>
                    <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr key={issue.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 text-sm font-mono">{issue.id}</td>
                      <td className="py-4">
                        <div className="space-y-1">
                          <div className="font-medium">{issue.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {issue.description}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">{issue.location}</td>
                      <td className="py-4">
                        <Badge variant="outline" className="text-xs">
                          {issue.category}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge className={`status-badge ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge className={`status-badge ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        <div>{formatDate(issue.reportedAt)}</div>
                        <div className="text-xs">by {issue.reportedBy}</div>
                      </td>
                      <td className="py-4 text-sm">
                        {issue.assignedTo ? (
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            {issue.assignedTo}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewIssue(issue.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditIssue(issue.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminIssues;
