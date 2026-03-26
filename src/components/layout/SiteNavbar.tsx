import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const navItems = [
    { label: "AI Consultation", path: "/career-consultation" },
    { label: "Resources", path: "/resources" },
    { label: "Roadmaps", path: "/roadmap" },
    { label: "AI Tutor", path: "/ai-tutor" },
];

const SiteNavbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 border-b border-[var(--border-color)] bg-[rgba(15,25,35,0.85)] backdrop-blur-[20px] transition-all duration-300 ease-in-out ${scrolled ? "navbar-scrolled" : ""
                }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    <button className="flex items-center gap-2" onClick={() => navigate("/")}>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-white">
                            <Brain className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-[var(--primary)]">CareerPath AI</span>
                    </button>

                    <div className="hidden items-center gap-6 md:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`nav-link text-sm font-medium transition-colors duration-300 ease-in-out ${pathname === item.path ? "text-[var(--primary-light)]" : "text-[var(--taupe)] hover:text-[var(--primary-light)]"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => {
                                window.location.href = "/auth.html";
                            }}
                            variant="outline"
                            className="border-[1.5px] border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--cream)]"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate("/register")}
                            className="bg-[linear-gradient(135deg,#6B9AB8,#4a7a9b)] text-white shadow-[0_0_20px_rgba(107,154,184,0.4)] hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(107,154,184,0.65)]"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SiteNavbar;
