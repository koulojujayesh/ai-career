import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNavbar from "@/components/layout/SiteNavbar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Send, Bot, User, ArrowRight, TrendingUp, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const CareerConsultation = () => {
  useScrollReveal();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Career Counselor. I'm here to help you discover the perfect career path based on your goals, skills, and market trends. What career field are you most interested in exploring?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();

  const aiResponses = [
    "Based on current market trends, AI & Machine Learning is experiencing 35% year-over-year growth. The average salary ranges from $95,000 to $180,000 depending on experience level.",
    "For Web Development, I'd recommend focusing on React, TypeScript, and cloud technologies. The job market shows strong demand with over 50,000 open positions globally.",
    "Cybersecurity is a rapidly growing field with a 13% projected growth rate. Entry-level positions start around $70,000, with senior roles reaching $150,000+.",
    "Data Science combines statistics, programming, and business acumen. Python and SQL are essential skills, with R being valuable for statistical analysis.",
    "The skills gap analysis shows you'll need approximately 6-8 months of focused learning to become job-ready in your chosen field."
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Header */}
      <div className="section-white border-b border-border/50 bg-glass backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-[var(--primary)]">
                AI Career Consultation
              </h1>
              <p className="text-muted-foreground">Discover your ideal career path with AI guidance</p>
            </div>
            <Button
              onClick={() => navigate("/roadmap")}
              className="bg-[var(--primary)] hover:bg-[var(--primary-light)]"
            >
              Generate Roadmap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Market Growth</p>
                  <p className="text-lg font-semibold">35% YoY</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Job Openings</p>
                  <p className="text-lg font-semibold">50K+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Bot className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">AI Accuracy</p>
                  <p className="text-lg font-semibold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="bg-gradient-glass border-border/50 shadow-medium backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Career Counselor AI
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={message.sender === "ai" ? "bg-primary text-white" : "bg-secondary text-[var(--text-dark)]"}>
                        {message.sender === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted"
                        }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border/50 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about career paths, skills, or market trends..."
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-light)]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SiteFooter />
    </div>
  );
};

export default CareerConsultation;