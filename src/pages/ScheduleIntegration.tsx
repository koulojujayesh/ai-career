import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNavbar from "@/components/layout/SiteNavbar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Calendar, Clock, Zap, BookOpen, CheckCircle, Plus } from "lucide-react";

interface ScheduleEvent {
  id: number;
  title: string;
  time: string;
  duration: string;
  type: "study" | "practice" | "review" | "break";
  completed?: boolean;
}

const ScheduleIntegration = () => {
  useScrollReveal();
  const [selectedPlan, setSelectedPlan] = useState<"intensive" | "extended">("intensive");

  const scheduleData = {
    intensive: {
      title: "2-Week Intensive",
      description: "Fast-track your learning with focused daily sessions",
      dailyHours: "6-8 hours/day",
      schedule: [
        { id: 1, title: "Python Fundamentals", time: "9:00 AM", duration: "2h", type: "study" as const },
        { id: 2, title: "Practice Exercises", time: "11:30 AM", duration: "1h", type: "practice" as const },
        { id: 3, title: "Break", time: "12:30 PM", duration: "1h", type: "break" as const },
        { id: 4, title: "Statistics Deep Dive", time: "1:30 PM", duration: "2h", type: "study" as const },
        { id: 5, title: "Project Work", time: "4:00 PM", duration: "2h", type: "practice" as const, completed: true },
        { id: 6, title: "Daily Review", time: "6:30 PM", duration: "30m", type: "review" as const }
      ]
    },
    extended: {
      title: "3-6 Month Extended",
      description: "Balanced approach with flexible scheduling",
      dailyHours: "2-3 hours/day",
      schedule: [
        { id: 1, title: "Morning Study Session", time: "7:00 AM", duration: "1.5h", type: "study" as const },
        { id: 2, title: "Evening Practice", time: "7:00 PM", duration: "1h", type: "practice" as const },
        { id: 3, title: "Weekend Project", time: "10:00 AM", duration: "3h", type: "practice" as const },
        { id: 4, title: "Weekly Review", time: "8:00 PM", duration: "30m", type: "review" as const, completed: true }
      ]
    }
  };

  const currentSchedule = scheduleData[selectedPlan];
  const completedSessions = currentSchedule.schedule.filter(s => s.completed).length;

  const getTypeColor = (type: ScheduleEvent["type"]) => {
    switch (type) {
      case "study": return "bg-primary/20 text-primary border-primary/30";
      case "practice": return "bg-secondary/20 text-secondary border-secondary/30";
      case "review": return "bg-accent/20 text-accent border-accent/30";
      case "break": return "bg-muted/20 text-muted-foreground border-muted/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getTypeIcon = (type: ScheduleEvent["type"]) => {
    switch (type) {
      case "study": return <BookOpen className="h-4 w-4" />;
      case "practice": return <Zap className="h-4 w-4" />;
      case "review": return <CheckCircle className="h-4 w-4" />;
      case "break": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Header */}
      <div className="section-white border-b border-border/50 bg-glass backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-[var(--primary)]">
                Schedule Integration
              </h1>
              <p className="text-muted-foreground mt-2">Optimize your learning schedule</p>
            </div>
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary-light)]">
              <Plus className="mr-2 h-4 w-4" />
              Sync Calendar
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Plan Selection */}
        <Tabs value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as "intensive" | "extended")} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-muted/30">
            <TabsTrigger value="intensive" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Intensive Track
            </TabsTrigger>
            <TabsTrigger value="extended" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Extended Track
            </TabsTrigger>
          </TabsList>

          <TabsContent value="intensive" className="mt-6">
            <Card className="bg-gradient-glass border-border/50 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{scheduleData.intensive.title}</span>
                  <Badge className="bg-[var(--primary)] text-white">
                    {scheduleData.intensive.dailyHours}
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">{scheduleData.intensive.description}</p>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="extended" className="mt-6">
            <Card className="bg-gradient-glass border-border/50 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{scheduleData.extended.title}</span>
                  <Badge className="bg-[var(--primary-light)] text-[var(--text-dark)]">
                    {scheduleData.extended.dailyHours}
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">{scheduleData.extended.description}</p>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-glass border-border/50">
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                {completedSessions} of {currentSchedule.schedule.length} sessions completed
              </span>
              <span className="text-lg font-semibold">
                {Math.round((completedSessions / currentSchedule.schedule.length) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Timeline */}
        <Card className="bg-gradient-glass border-border/50 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {selectedPlan === "intensive" ? "Today's Schedule" : "This Week's Schedule"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentSchedule.schedule.map((session, index) => (
                <div key={session.id} className="relative">
                  {/* Timeline connector */}
                  {index < currentSchedule.schedule.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-border/30" />
                  )}

                  <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-soft ${session.completed ? 'bg-primary/5 border-primary/20' : 'bg-card/50 border-border/50'
                    }`}>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${session.completed ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'
                      }`}>
                      {session.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        getTypeIcon(session.type)
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${session.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {session.title}
                        </h3>
                        <Badge className={getTypeColor(session.type)}>
                          {session.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.time}
                        </span>
                        <span>{session.duration}</span>
                      </div>
                    </div>

                    {!session.completed && (
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integration Options */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-glass border-border/50 hover:shadow-medium transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Google Calendar</h3>
              <p className="text-sm text-muted-foreground">Sync with your existing calendar</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-glass border-border/50 hover:shadow-medium transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Reminders</h3>
              <p className="text-sm text-muted-foreground">Never miss a study session</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-glass border-border/50 hover:shadow-medium transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Adaptive Scheduling</h3>
              <p className="text-sm text-muted-foreground">AI adjusts based on your progress</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default ScheduleIntegration;