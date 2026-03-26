import { useNavigate } from "react-router-dom";

const SiteFooter = () => {
    const navigate = useNavigate();

    return (
        <footer className="border-t border-[rgba(107,154,184,0.15)] bg-[#080F16]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--cream)]">CareerPath AI</h3>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--taupe)]">
                            Personalized, AI-driven learning and career guidance built for measurable progress.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[var(--cream)]">Platform</h4>
                        <div className="mt-3 space-y-2 text-sm">
                            <button className="block text-[var(--taupe)] transition-colors duration-300 hover:text-[var(--primary-light)]" onClick={() => navigate("/career-consultation")}>Career Consultation</button>
                            <button className="block text-[var(--taupe)] transition-colors duration-300 hover:text-[var(--primary-light)]" onClick={() => navigate("/roadmap")}>Roadmap Generation</button>
                            <button className="block text-[var(--taupe)] transition-colors duration-300 hover:text-[var(--primary-light)]" onClick={() => navigate("/schedule")}>Smart Scheduling</button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[var(--cream)]">Learning</h4>
                        <div className="mt-3 space-y-2 text-sm">
                            <button className="block text-[var(--taupe)] transition-colors duration-300 hover:text-[var(--primary-light)]" onClick={() => navigate("/resources")}>Resource Library</button>
                            <button className="block text-[var(--taupe)] transition-colors duration-300 hover:text-[var(--primary-light)]" onClick={() => navigate("/ai-tutor")}>AI Tutor</button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[var(--cream)]">Company</h4>
                        <div className="mt-3 space-y-2 text-sm text-[var(--taupe)]">
                            <p>Privacy Policy</p>
                            <p>Terms of Service</p>
                            <p>Support</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-[rgba(107,154,184,0.15)] pt-6 text-sm text-[var(--text-muted)]">
                    © 2026 CareerPath AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
