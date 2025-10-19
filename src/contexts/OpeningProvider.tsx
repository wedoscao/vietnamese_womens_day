import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction
} from "react";

type OpeningContextType = {
    isOpening: boolean;
    setIsWishing: Dispatch<SetStateAction<boolean>>;
};

const OpeningContext = createContext<OpeningContextType | undefined>(undefined);

function OpeningProvider({ children }: { children: ReactNode }) {
    const [isOpening, setIsWishing] = useState(true);
    return (
        <>
            <OpeningContext value={{ isOpening: isOpening, setIsWishing }}>
                {children}
            </OpeningContext>
        </>
    );
}

function useOpening() {
    const context = useContext(OpeningContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export { OpeningProvider, useOpening };
