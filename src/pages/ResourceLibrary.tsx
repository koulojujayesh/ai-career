import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Star, Clock, DollarSign, Filter, BookOpen, Video, FileText } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  provider: string;
  type: "course" | "tutorial" | "article" | "book";
  price: "free" | "paid";
  rating: number;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  description: string;
  url: string;
  certification: boolean;
}

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const resources: Resource[] = [
    {
      id: 1,
      title: "Machine Learning Specialization",
      provider: "Coursera",
      type: "course",
      price: "paid",
      rating: 4.9,
      duration: "3 months",
      level: "beginner",
      tags: ["Python", "ML", "Statistics"],
      description: "Comprehensive introduction to machine learning with hands-on projects",
      url: "https://coursera.org/ml",
      certification: true
    },
    {
      id: 2,
      title: "Python for Data Science",
      provider: "Udemy",
      type: "course",
      price: "paid",
      rating: 4.7,
      duration: "25 hours",
      level: "beginner",
      tags: ["Python", "Data Science", "Pandas"],
      description: "Learn Python programming with focus on data analysis and visualization",
      url: "https://udemy.com/python-ds",
      certification: true
    },
    {
      id: 3,
      title: "Deep Learning with PyTorch",
      provider: "YouTube",
      type: "tutorial",
      price: "free",
      rating: 4.5,
      duration: "8 hours",
      level: "intermediate",
      tags: ["PyTorch", "Deep Learning", "Neural Networks"],
      description: "Free comprehensive tutorial series on deep learning fundamentals",
      url: "https://youtube.com/pytorch",
      certification: false
    },
    {
      id: 4,
      title: "Hands-On Machine Learning",
      provider: "O'Reilly",
      type: "book",
      price: "paid",
      rating: 4.8,
      duration: "~40 hours",
      level: "intermediate",
      tags: ["ML", "Scikit-learn", "TensorFlow"],
      description: "Practical guide to machine learning with real-world examples",
      url: "https://oreilly.com/ml-book",
      certification: false
    },
    {
      id: 5,
      title: "Introduction to Statistical Learning",
      provider: "Stanford",
      type: "article",
      price: "free",
      rating: 4.6,
      duration: "2 hours",
      level: "beginner",
      tags: ["Statistics", "R", "Theory"],
      description: "Free comprehensive textbook on statistical learning methods",
      url: "https://stanford.edu/isl",
      certification: false
    },
    {
      id: 6,
      title: "TensorFlow Developer Certificate",
      provider: "TensorFlow",
      type: "course",
      price: "paid",
      rating: 4.7,
      duration: "4 months",
      level: "advanced",
      tags: ["TensorFlow", "Certification", "Deep Learning"],
      description: "Official TensorFlow certification program with real-world projects",
      url: "https://tensorflow.org/certificate",
      certification: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesPrice = selectedPrice === "all" || resource.price === selectedPrice;
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "course": return <Video className="h-4 w-4" />;
      case "tutorial": return <Video className="h-4 w-4" />;
      case "article": return <FileText className="h-4 w-4" />;
      case "book": return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: Resource["level"]) => {
    switch (level) {
      case "beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-glass backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Resource Library
              </h1>
              <p className="text-muted-foreground mt-2">Curated learning materials for your career path</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {filteredResources.length} Resources
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 bg-gradient-glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="course">Courses</SelectItem>
                  <SelectItem value="tutorial">Tutorials</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="book">Books</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger>
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedPrice("all");
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="bg-gradient-glass border-border/50 hover:shadow-medium transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {resource.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">by {resource.provider}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{resource.duration}</span>
                  </div>
                  <Badge className={getLevelColor(resource.level)}>
                    {resource.level}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className={`text-sm font-medium ${
                      resource.price === "free" ? "text-green-400" : "text-muted-foreground"
                    }`}>
                      {resource.price === "free" ? "Free" : "Paid"}
                    </span>
                    {resource.certification && (
                      <Badge variant="outline" className="text-xs">
                        Certificate
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card className="bg-gradient-glass border-border/50 text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;