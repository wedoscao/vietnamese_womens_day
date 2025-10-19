import { useEffect, useRef, useState } from "react";
import { useClosing } from "../contexts/ClosingProvider";

interface ClosingProps {
    texts: string[];
    speed?: number;
    className?: string;
}

function Closing({ texts, speed = 1, className = "" }: ClosingProps) {
    const { isClosing, setIsClosing } = useClosing();
    const [position, setPosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight
    });
    const textsRef = useRef<HTMLDivElement>(null);
    const animateRef = useRef<number | null>(null);

    useEffect(() => {
        if (isClosing) {
            const animate = () => {
                setPosition((prev) => {
                    if (!textsRef.current) {
                        return prev;
                    }

                    const rect = textsRef.current.getBoundingClientRect();

                    const newY = prev.y - speed;

                    if (newY <= -rect.height) {
                        setIsClosing(false);
                    }

                    return {
                        x: prev.x,
                        y: newY
                    };
                });

                animateRef.current = requestAnimationFrame(animate);
            };

            animateRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animateRef.current) {
                cancelAnimationFrame(animateRef.current);
            }
        };
    }, [speed, isClosing]);

    useEffect(() => {
        const handleResize = () => {
            setPosition((prev) => {
                return {
                    x: window.innerWidth / 2,
                    y: prev.y
                };
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isClosing ? (
        <>
            <div
                className="fixed"
                ref={textsRef}
                style={{
                    top: position.y,
                    left: position.x,
                    transform: "translateX(-50%)"
                }}
            >
                {texts.map((text, index) => (
                    <div
                        key={index}
                        className={`select-none cursor-default text-center pb-4 ${className}`}
                    >
                        {text}
                    </div>
                ))}
            </div>
        </>
    ) : (
        <></>
    );
}

export default Closing;
