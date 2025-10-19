import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction
} from "react";

type FirstSlidingContextType = {
    isFirst: boolean;
    setIsFirst: Dispatch<SetStateAction<boolean>>;
};

const FirstSlidingContext = createContext<FirstSlidingContextType | undefined>(
    undefined
);

function FirstSlidingProvider({ children }: { children: ReactNode }) {
    const [isFirst, setIsFirst] = useState(true);

    return (
        <>
            <FirstSlidingContext
                value={{ isFirst: isFirst, setIsFirst: setIsFirst }}
            >
                {children}
            </FirstSlidingContext>
        </>
    );
}

function useFirstSliding() {
    const context = useContext(FirstSlidingContext);
    if (!context) {
        throw new Error(
            "useFirstSliding must be used within a FirstSlidingProvider"
        );
    }
    return context;
}

export { FirstSlidingProvider, useFirstSliding };
