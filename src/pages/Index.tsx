import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, BookOpen, Calendar, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const valueProps = [
    {
      id: 1,
      title: "Predictive Career Intelligence",
      description: "AI-powered analysis of market trends, skill demand, and career trajectory optimization based on real-time industry data.",
      icon: Brain,
      color: "text-primary",
      bgColor: "bg-primary/10",
      stats: "94% accuracy"
    },
    {
      id: 2,
      title: "Comprehensive Learning Ecosystem",
      description: "Curated resources from top platforms, personalized study paths, and adaptive learning schedules tailored to your goals.",
      icon: BookOpen,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      stats: "10K+ resources"
    },
    {
      id: 3,
      title: "Intelligent Schedule Integration",
      description: "Smart calendar management with adaptive scheduling that adjusts based on your progress and learning velocity.",
      icon: Calendar,
      color: "text-accent",
      bgColor: "bg-accent/10",
      stats: "3x faster learning"
    }
  ];

  const stats = [
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Active Learners", value: "50K+", icon: Users },
    { label: "Career Paths", value: "200+", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-glass/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CareerPath AI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate("/resources")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Resources
              </button>
              <button 
                onClick={() => navigate("/roadmap")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Roadmaps
              </button>
              <button 
                onClick={() => navigate("/ai-tutor")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                AI Tutor
              </button>
            </div>
            <Button 
              onClick={() => navigate("/register")}
              className="bg-gradient-primary hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-6 bg-gradient-secondary text-white border-none px-4 py-2 animate-fade-in">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Career Development
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
              CareerPath AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-slide-up">
              Personalized Roadmaps. Future-Proof Careers.
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Unlock your potential with AI-driven career intelligence, personalized learning paths, 
              and adaptive scheduling designed for the future of work.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")}
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/career-consultation")}
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              <Zap className="mr-2 h-5 w-5" />
              Try AI Consultation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Value Proposition */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Core Value Proposition
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary AI technology meets personalized career development to create 
              the most effective learning experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <Card 
                key={prop.id} 
                className="bg-gradient-glass border-border/50 hover:shadow-medium transition-all duration-500 animate-slide-up group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${prop.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <prop.icon className={`h-8 w-8 ${prop.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-2">{prop.title}</CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {prop.stats}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {prop.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-glass border-border/50 shadow-strong">
            <CardContent className="text-center py-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are already using AI to accelerate their career growth 
                and stay ahead of industry trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/register")}
                  className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 animate-glow-pulse"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/career-consultation")}
                  className="text-lg px-8 py-6"
                >
                  Explore AI Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">
                CareerPath AI
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy</button>
              <button className="hover:text-foreground transition-colors">Terms</button>
              <button className="hover:text-foreground transition-colors">Support</button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground">
            © 2024 CareerPath AI. Empowering careers through intelligent technology.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
