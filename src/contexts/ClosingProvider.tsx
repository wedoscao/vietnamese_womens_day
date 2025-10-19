import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction
} from "react";

type ClosingContextType = {
    isClosing: boolean;
    setIsClosing: Dispatch<SetStateAction<boolean>>;
};

const ClosingContext = createContext<ClosingContextType | undefined>(undefined);

function ClosingProvider({ children }: { children: ReactNode }) {
    const [isClosing, setIsClosing] = useState(false);
    return (
        <>
            <ClosingContext value={{ isClosing, setIsClosing }}>
                {children}
            </ClosingContext>
        </>
    );
}

function useClosing() {
    const context = useContext(ClosingContext);
    if (!context) {
        throw new Error("useClosing must be used within a ClosingProvider");
    }
    return context;
}

export { ClosingProvider, useClosing };
