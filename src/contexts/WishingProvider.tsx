import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction
} from "react";

type WishingContextType = {
    isWishing: boolean;
    setIsWishing: Dispatch<SetStateAction<boolean>>;
};

const WishingContext = createContext<WishingContextType | undefined>(undefined);

function WishingProvider({ children }: { children: ReactNode }) {
    const [isWishing, setIsWishing] = useState(true);
    return (
        <>
            <WishingContext value={{ isWishing, setIsWishing }}>
                {children}
            </WishingContext>
        </>
    );
}

function useWishing() {
    const context = useContext(WishingContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export { WishingProvider, useWishing };
