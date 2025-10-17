import { useEffect, useRef, useState } from "react";
import { useWishing } from "../contexts/WishingProvider";

interface WishesProps {
    wishes: string[],
    speed?: number,
    className?: string
}

function Wishes({ wishes, speed = 1, className = "" }: WishesProps) {
    const { isWishing, setIsWishing } = useWishing();
    const [position, setPosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight
    });
    const wishesRef = useRef<HTMLDivElement>(null);
    const animateRef = useRef<number | null>(null);

    useEffect(() => {
        if (isWishing) {
            const animate = () => {
                setPosition(prev => {
                    if (!wishesRef.current) {
                        return prev;
                    }

                    const rect = wishesRef.current.getBoundingClientRect();

                    const newY = prev.y - speed;

                    if (newY <= -rect.height) {
                        setIsWishing(false);
                    }

                    return {
                        x: prev.x,
                        y: newY
                    }
                })

                animateRef.current = requestAnimationFrame(animate)
            }

            animateRef.current = requestAnimationFrame(animate)
        }

        return () => {
            if (animateRef.current) {
                cancelAnimationFrame(animateRef.current)
            }
        }
    }, [speed, isWishing])

    useEffect(() => {
        const handleResize = () => {
            setPosition((prev) => {
                return {
                    x: window.innerWidth / 2,
                    y: prev.y,
                }
            })
        };

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])


    return (
        isWishing ?
            <>
                <div className="fixed" ref={wishesRef} style={{
                    top: position.y,
                    left: position.x,
                    transform: 'translateX(-50%)'
                }}>
                    {wishes.map((wish, index) => (<div key={index} className={`${className}`}>{wish}</div>))}
                </div>
            </> :
            <></>
    );
}


export default Wishes;
