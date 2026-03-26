import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNavbar from "@/components/layout/SiteNavbar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Send, Bot, User, Lightbulb, BookOpen, Target, Zap, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "concept" | "motivation" | "resource" | "general";
}

const AITutorChat = () => {
  useScrollReveal();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Learning Tutor. I'm here to help you understand complex concepts, stay motivated, and find the best learning resources. What would you like to explore today?",
      sender: "ai",
      timestamp: new Date(),
      type: "general"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();

  const quickActions = [
    { id: 1, text: "Explain neural networks", icon: Lightbulb, type: "concept" },
    { id: 2, text: "I'm feeling overwhelmed", icon: Target, type: "motivation" },
    { id: 3, text: "Recommend Python resources", icon: BookOpen, type: "resource" },
    { id: 4, text: "How to stay motivated?", icon: Zap, type: "motivation" }
  ];

  const aiResponses = {
    concept: [
      "Neural networks are computational models inspired by biological neural networks. Think of them as interconnected layers of nodes (neurons) that process information. Each connection has a weight that determines how much influence one neuron has on another. During training, these weights are adjusted to minimize prediction errors.",
      "Machine learning algorithms work by finding patterns in data. Imagine you're learning to recognize cats in photos - you'd look for features like whiskers, pointy ears, and fur texture. ML algorithms do something similar but with mathematical representations of these features.",
      "The bias-variance tradeoff is fundamental in ML. High bias means your model is too simple (underfitting), while high variance means it's too complex (overfitting). The goal is finding the sweet spot where your model generalizes well to new data."
    ],
    motivation: [
      "It's completely normal to feel overwhelmed when learning complex topics! Remember why you started this journey. Break down big concepts into smaller chunks, celebrate small wins, and don't be afraid to take breaks. Every expert was once a beginner.",
      "Learning is a marathon, not a sprint. Set realistic daily goals, track your progress, and remember that confusion is often the first step toward understanding. You're building skills that will transform your career!",
      "Feeling stuck is part of the learning process. Try explaining what you've learned to someone else (or even to yourself out loud). This helps identify gaps in understanding and reinforces what you do know."
    ],
    resource: [
      "For Python beginners, I recommend starting with 'Automate the Boring Stuff with Python' (free online). Then move to 'Python Crash Course' for hands-on projects. Practice on platforms like HackerRank and LeetCode.",
      "For machine learning resources, start with Andrew Ng's Coursera course, then dive into 'Hands-On Machine Learning' by Aurélien Géron. Kaggle Learn offers free micro-courses that are excellent for practical skills.",
      "For staying current with AI trends, follow publications like Towards Data Science on Medium, subscribe to newsletters like The Batch by deeplearning.ai, and join communities like r/MachineLearning on Reddit."
    ],
    general: [
      "Great question! Learning effectively requires active engagement. Try the Feynman Technique: explain concepts in simple terms as if teaching a child. This reveals gaps in understanding and strengthens memory.",
      "The key to mastering any technical skill is consistent practice. Set aside dedicated time daily, even if it's just 30 minutes. Small, consistent efforts compound over time into significant expertise."
    ]
  };

  const sendMessage = (text?: string) => {
    const messageText = text || inputMessage;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Determine response type based on keywords
    let responseType: keyof typeof aiResponses = "general";
    if (messageText.toLowerCase().includes("explain") || messageText.toLowerCase().includes("what is") || messageText.toLowerCase().includes("how does")) {
      responseType = "concept";
    } else if (messageText.toLowerCase().includes("overwhelmed") || messageText.toLowerCase().includes("motivation") || messageText.toLowerCase().includes("stuck")) {
      responseType = "motivation";
    } else if (messageText.toLowerCase().includes("recommend") || messageText.toLowerCase().includes("resource") || messageText.toLowerCase().includes("book")) {
      responseType = "resource";
    }

    // Simulate AI response
    setTimeout(() => {
      const responses = aiResponses[responseType];
      const aiResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai",
        timestamp: new Date(),
        type: responseType
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

  const getMessageTypeColor = (type?: Message["type"]) => {
    switch (type) {
      case "concept": return "bg-primary/10 border-l-4 border-l-primary";
      case "motivation": return "bg-[var(--primary-light)]/30 border-l-4 border-l-[var(--primary)]";
      case "resource": return "bg-accent/10 border-l-4 border-l-accent";
      default: return "";
    }
  };

  const getTypeIcon = (type?: Message["type"]) => {
    switch (type) {
      case "concept": return <Lightbulb className="h-4 w-4 text-primary" />;
      case "motivation": return <Zap className="h-4 w-4 text-secondary" />;
      case "resource": return <BookOpen className="h-4 w-4 text-accent" />;
      default: return <Bot className="h-4 w-4" />;
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
                AI Learning Tutor
              </h1>
              <p className="text-muted-foreground">Your personal learning companion</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/schedule")}
              >
                Schedule
                <CalendarDays className="ml-2 h-4 w-4" />
              </Button>
              <Badge variant="outline" className="bg-primary/15 text-primary border-primary/30">
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-glass border-border/50 sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(action.text)}
                    className="w-full justify-start text-left h-auto p-3"
                  >
                    <action.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{action.text}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-glass border-border/50 shadow-medium backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary animate-glow-pulse" />
                  Learning Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px] p-4">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                      >
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback className={message.sender === "ai" ? "bg-primary/20 text-primary" : "bg-[var(--primary-light)]/40 text-[var(--text-dark)]"}>
                            {message.sender === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`max-w-[85%] rounded-lg p-4 ${message.sender === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : `bg-card/80 ${getMessageTypeColor(message.type)}`
                            }`}
                        >
                          {message.sender === "ai" && message.type && (
                            <div className="flex items-center gap-2 mb-2 opacity-70">
                              {getTypeIcon(message.type)}
                              <Badge variant="secondary" className="text-xs">
                                {message.type}
                              </Badge>
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <span className="text-xs opacity-70 mt-2 block">
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
                      placeholder="Ask about concepts, get motivation, or request resources..."
                      className="flex-1"
                    />
                    <Button
                      onClick={() => sendMessage()}
                      disabled={!inputMessage.trim()}
                      className="bg-[var(--primary)] hover:bg-[var(--primary-light)]"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Press Enter to send • Ask anything about your learning journey
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default AITutorChat;