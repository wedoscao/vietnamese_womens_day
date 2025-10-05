import { useState, useEffect, useRef } from 'react';

interface BouncingTextProps {
    className?: string;
    text: string;
}

const BouncingText = ({ className = '', text }: BouncingTextProps) => {
    const [position, setPosition] = useState({
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 100)
    });
    const [velocity, setVelocity] = useState({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4
    });
    const textRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = () => {
            setPosition(prev => {
                if (!textRef.current) return prev;

                const rect = textRef.current.getBoundingClientRect();
                let newX = prev.x + velocity.x;
                let newY = prev.y + velocity.y;
                let newVelX = velocity.x;
                let newVelY = velocity.y;

                if (newX <= 0 || newX + rect.width >= window.innerWidth) {
                    newVelX = -velocity.x;
                    newX = newX <= 0 ? 0 : window.innerWidth - rect.width;
                }

                if (newY <= 0 || newY + rect.height >= window.innerHeight) {
                    newVelY = -velocity.y;
                    newY = newY <= 0 ? 0 : window.innerHeight - rect.height;
                }

                if (newVelX !== velocity.x || newVelY !== velocity.y) {
                    setVelocity({ x: newVelX, y: newVelY });
                }

                return { x: newX, y: newY };
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [velocity]);

    return (
        <div
            ref={textRef}
            className={`fixed select-none cursor-default ${className}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: 'none'
            }}
        >
            {text}
        </div>
    );
};

export default BouncingText;
