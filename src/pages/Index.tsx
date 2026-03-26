import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNavbar from "@/components/layout/SiteNavbar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight, Brain, BookOpen, Calendar, Sparkles, TrendingUp, Users } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();
    useScrollReveal();

    const particles = useMemo(
        () =>
            Array.from({ length: 15 }).map((_, index) => ({
                id: index,
                size: 2 + (index % 3),
                left: 6 + (index * 6.2) % 88,
                top: 8 + (index * 5.1) % 78,
                duration: 8 + (index % 7) * 2,
                delay: (index % 5) * 0.6,
            })),
        [],
    );

    const valueProps = [
        {
            id: 1,
            title: "Predictive Career Intelligence",
            description:
                "AI-powered analysis of market trends, skill demand, and career trajectory optimization based on real-time industry data.",
            icon: Brain,
            stats: "94% accuracy",
        },
        {
            id: 2,
            title: "Comprehensive Learning Ecosystem",
            description:
                "Curated resources from top platforms, personalized study paths, and adaptive learning schedules tailored to your goals.",
            icon: BookOpen,
            stats: "10K+ resources",
        },
        {
            id: 3,
            title: "Intelligent Schedule Integration",
            description:
                "Smart calendar management with adaptive scheduling that adjusts based on your progress and learning velocity.",
            icon: Calendar,
            stats: "3x faster learning",
        },
    ];

    const stats = [
        { label: "success rate", value: "94%", icon: TrendingUp },
        { label: "active learners", value: "50K+", icon: Users },
    ];

    return (
        <div className="min-h-screen bg-background text-[var(--text-secondary)]">
            <SiteNavbar />

            <section className="hero-mesh relative overflow-hidden py-12 md:min-h-[calc(100vh-72px)] md:py-0">
                {particles.map((particle) => (
                    <span
                        key={particle.id}
                        className="particle"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            opacity: 0.2 + (particle.id % 5) * 0.05,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}

                <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-5 sm:px-8 lg:px-10">
                    <div className="w-full text-center">
                        <Badge
                            className="hero-stagger mb-6 inline-flex rounded-full border border-[rgba(107,154,184,0.4)] bg-[rgba(107,154,184,0.15)] px-4 py-2 text-[var(--primary-light)] backdrop-blur-md"
                            style={{ ["--delay" as string]: "0s" }}
                        >
                            <Sparkles className="mr-2 h-4 w-4" />
                            AI-Powered Career Intelligence
                        </Badge>

                        <h1
                            className="hero-stagger font-display mb-6 text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-tight"
                            style={{
                                ["--delay" as string]: "0.15s",
                                background: "linear-gradient(135deg, #F2E4D4 0%, #6B9AB8 60%, #A8CEDC 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            CareerPath AI
                        </h1>

                        <p className="hero-stagger mb-4 text-2xl font-semibold text-[var(--text-secondary)]" style={{ ["--delay" as string]: "0.3s" }}>
                            Personalized Roadmaps. Future-Proof Careers.
                        </p>

                        <p className="hero-stagger mx-auto mb-10 max-w-2xl text-lg text-[var(--text-muted)] leading-relaxed" style={{ ["--delay" as string]: "0.45s" }}>
                            Transform your career journey with intelligent skill development, predictive market insights,
                            and personalized learning paths powered by advanced AI.
                        </p>

                        <div className="hero-stagger mb-12 flex flex-col gap-4 justify-center sm:flex-row" style={{ ["--delay" as string]: "0.6s" }}>
                            <Button size="lg" onClick={() => navigate("/register")} className="text-base px-8 py-6 font-semibold">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => navigate("/career-consultation")} className="text-base px-8 py-6 font-semibold">
                                Free Consultation
                            </Button>
                        </div>

                        <div className="hero-stagger flex flex-col gap-6 justify-center sm:flex-row sm:gap-8" style={{ ["--delay" as string]: "0.75s" }}>
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center justify-center gap-3 text-[var(--text-secondary)]"
                                >
                                    <stat.icon className="h-5 w-5 text-[var(--primary)]" />
                                    <span className="text-lg font-medium">
                                        {stat.value} {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-white px-4 py-20">
                <div className="container mx-auto">
                    <div className="reveal mb-16 text-center">
                        <h2 className="font-display mb-4 text-4xl font-bold text-[var(--text-primary)]">Core Value Proposition</h2>
                        <p className="mx-auto max-w-3xl text-xl text-[var(--text-secondary)]">
                            Revolutionary AI technology meets personalized career development to create the most effective
                            learning experience possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {valueProps.map((prop) => (
                            <Card key={prop.id} className="bg-[var(--bg-card)]">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(107,154,184,0.15)]">
                                        <prop.icon className="h-8 w-8 text-[var(--primary)]" />
                                    </div>
                                    <CardTitle className="mb-2 text-xl text-[var(--text-primary)]">{prop.title}</CardTitle>
                                    <Badge variant="outline" className="mx-auto w-fit border-[var(--border-color)] text-[var(--text-secondary)]">
                                        {prop.stats}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-center text-base leading-relaxed text-[var(--text-secondary)]">
                                        {prop.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-accent px-4 py-20">
                <div className="container mx-auto">
                    <Card className="reveal border-[var(--border-color)] bg-[rgba(22,34,48,0.65)] text-[var(--text-primary)] shadow-[0_20px_60px_rgba(107,154,184,0.15)] backdrop-blur-sm">
                        <CardContent className="py-16 text-center">
                            <h2 className="font-display mb-6 text-4xl font-bold text-[var(--text-primary)]">Ready to Transform Your Career?</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl text-[var(--text-secondary)]">
                                Join thousands of professionals already using AI to accelerate their growth and stay ahead.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button size="lg" onClick={() => navigate("/register")}>Get Started Now</Button>
                                <Button size="lg" variant="outline" onClick={() => navigate("/career-consultation")}>
                                    Explore AI Features
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
};

export default Index;
