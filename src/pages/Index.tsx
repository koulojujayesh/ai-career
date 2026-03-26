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

                <div className="mx-auto flex w-full max-w-[1500px] items-center px-5 sm:px-8 lg:px-10">
                    <div className="grid w-full items-center gap-10 md:grid-cols-2">
                        <div>
                            <Badge
                                className="hero-stagger mb-6 rounded-full border border-[rgba(107,154,184,0.4)] bg-[rgba(107,154,184,0.15)] px-4 py-2 text-[var(--primary-light)] backdrop-blur-md"
                                style={{ ["--delay" as string]: "0s" }}
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                AI-Powered Career Intelligence
                            </Badge>

                            <h1
                                className="hero-stagger font-display mb-4 text-[clamp(3rem,7vw,6rem)] font-extrabold leading-tight"
                                style={{
                                    ["--delay" as string]: "0.15s",
                                    background: "linear-gradient(135deg, #F2E4D4 0%, #6B9AB8 60%, #A8CEDC 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                CareerPath AI
                            </h1>

                            <p className="hero-stagger mb-4 text-xl text-[var(--text-secondary)] md:text-2xl" style={{ ["--delay" as string]: "0.3s" }}>
                                Personalized Roadmaps. Future-Proof Careers.
                            </p>

                            <p className="hero-stagger mb-8 max-w-xl text-lg text-[var(--text-muted)]" style={{ ["--delay" as string]: "0.45s" }}>
                                Transform your career journey with intelligent skill development, predictive market insights,
                                and personalized learning paths powered by advanced AI.
                            </p>

                            <div className="hero-stagger mb-10 flex flex-col gap-4 sm:flex-row" style={{ ["--delay" as string]: "0.6s" }}>
                                <Button size="lg" onClick={() => navigate("/register")} className="text-lg px-8 py-6">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button size="lg" variant="outline" onClick={() => navigate("/career-consultation")} className="text-lg px-8 py-6">
                                    Free Consultation
                                </Button>
                            </div>

                            <div className="hero-stagger grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2" style={{ ["--delay" as string]: "0.75s" }}>
                                {stats.map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className={`flex items-center gap-3 text-[var(--text-secondary)] ${index > 0 ? "sm:border-l sm:border-[var(--border-color)] sm:pl-4" : ""}`}
                                    >
                                        <stat.icon className="h-4 w-4 text-[var(--primary)]" />
                                        <span className="text-base">
                                            {stat.value} {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden reveal md:flex md:items-center md:justify-center">
                            <div className="flex min-h-[360px] w-full items-center justify-center rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] md:min-h-[430px]">
                                <svg viewBox="0 0 360 360" className="h-[300px] w-[300px] md:h-[330px] md:w-[330px]" role="img" aria-label="Animated career intelligence rings">
                                    <circle cx="180" cy="180" r="128" className="orbit-dashed" fill="none" stroke="rgba(107,154,184,0.55)" strokeDasharray="6 8" strokeWidth="2" />
                                    <circle cx="180" cy="180" r="112" className="orb-ring" fill="none" stroke="#6B9AB8" strokeWidth="14" />
                                    <circle cx="180" cy="180" r="78" className="orb-ring delay-1" fill="none" stroke="#4a7a9b" strokeWidth="14" />
                                    <circle cx="180" cy="180" r="44" className="orb-ring delay-2" fill="none" stroke="#2d5f80" strokeWidth="14" />
                                </svg>
                            </div>
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
