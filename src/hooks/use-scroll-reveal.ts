import { useEffect } from "react";

export const useScrollReveal = () => {
    useEffect(() => {
        const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .hidden"));

        if (!revealElements.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed", "is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "0px 0px -80px 0px",
            },
        );

        revealElements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
        };
    }, []);
};
