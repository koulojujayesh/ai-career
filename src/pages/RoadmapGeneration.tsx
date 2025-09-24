import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, Star, ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Milestone {
  id: number;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  completed: boolean;
  progress: number;
}

const RoadmapGeneration = () => {
  const navigate = useNavigate();
  const [selectedPath] = useState("ai-ml");

  const roadmaps = {
    "ai-ml": {
      title: "AI & Machine Learning Engineer",
      totalDuration: "8-10 months",
      milestones: [
        {
          id: 1,
          title: "Foundation Phase",
          description: "Master programming fundamentals and mathematical concepts",
          duration: "2 months",
          skills: ["Python", "Statistics", "Linear Algebra", "Git"],
          completed: true,
          progress: 100
        },
        {
          id: 2,
          title: "Intermediate Phase",
          description: "Dive into machine learning algorithms and data manipulation",
          duration: "3 months",
          skills: ["Pandas", "NumPy", "Scikit-learn", "Data Visualization"],
          completed: false,
          progress: 65
        },
        {
          id: 3,
          title: "Advanced Phase",
          description: "Deep learning, neural networks, and advanced techniques",
          duration: "2-3 months",
          skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision"],
          completed: false,
          progress: 20
        },
        {
          id: 4,
          title: "Specialization & Certification",
          description: "Choose specialization and complete certification projects",
          duration: "1-2 months",
          skills: ["MLOps", "Cloud Deployment", "Portfolio Projects", "Certification"],
          completed: false,
          progress: 0
        }
      ]
    }
  };

  const currentRoadmap = roadmaps[selectedPath as keyof typeof roadmaps];
  const overallProgress = currentRoadmap.milestones.reduce((acc, milestone) => acc + milestone.progress, 0) / currentRoadmap.milestones.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-glass backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Your Learning Roadmap
              </h1>
              <p className="text-muted-foreground mt-2">{currentRoadmap.title}</p>
            </div>
            <Button 
              onClick={() => navigate("/schedule")}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Learning
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-glass border-border/50 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Progress</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {Math.round(overallProgress)}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-3 mb-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Estimated Duration: {currentRoadmap.totalDuration}</span>
              <span>{currentRoadmap.milestones.filter(m => m.completed).length} of {currentRoadmap.milestones.length} phases completed</span>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Timeline */}
        <div className="space-y-6">
          {currentRoadmap.milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Timeline connector */}
              {index < currentRoadmap.milestones.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-border/50" />
              )}
              
              <Card className={`bg-gradient-glass border-border/50 transition-all duration-300 hover:shadow-medium ${
                milestone.completed ? 'ring-2 ring-primary/20' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 ${milestone.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                      {milestone.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl">{milestone.title}</CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {milestone.duration}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress bar for current milestone */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>

                    {/* Skills to learn */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-accent" />
                        Key Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {milestone.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="secondary"
                            className="bg-muted/50 hover:bg-muted/70 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    {!milestone.completed && milestone.progress > 0 && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => navigate("/resources")}
                      >
                        Continue Learning
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {!milestone.completed && milestone.progress === 0 && (
                      <Button 
                        className="w-full mt-4 bg-gradient-primary hover:opacity-90"
                        onClick={() => navigate("/resources")}
                      >
                        Start Phase
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate("/ai-tutor")}
            className="h-16"
          >
            <div className="text-center">
              <div className="font-semibold">Need Help?</div>
              <div className="text-sm text-muted-foreground">Chat with AI Tutor</div>
            </div>
          </Button>
          <Button 
            size="lg" 
            onClick={() => navigate("/resources")}
            className="h-16 bg-gradient-primary hover:opacity-90"
          >
            <div className="text-center">
              <div className="font-semibold">Browse Resources</div>
              <div className="text-sm opacity-90">Curated learning materials</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGeneration;