import { useEffect, useRef, useState } from "react";
import { useWishing } from "../contexts/WishingProvider";

interface WishesProps {
    texts: string[];
    speed?: number;
    className?: string;
}

function Wishes({ texts, speed = 1, className = "" }: WishesProps) {
    const { isWishing, setIsWishing } = useWishing();
    const [position, setPosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight
    });
    const textsRef = useRef<HTMLDivElement>(null);
    const animateRef = useRef<number | null>(null);

    useEffect(() => {
        if (isWishing) {
            const animate = () => {
                setPosition((prev) => {
                    if (!textsRef.current) {
                        return prev;
                    }

                    const rect = textsRef.current.getBoundingClientRect();

                    const newY = prev.y - speed;

                    if (newY <= -rect.height) {
                        setIsWishing(false);
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
    }, [speed, isWishing]);

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

    return isWishing ? (
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

export default Wishes;
