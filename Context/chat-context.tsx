import { useToast } from "@/components/ui/use-toast";
import { ReactNode, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query"

type StreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean,
    fileId: string
}

export const ChatContext = createContext<StreamResponse>({
    addMessage: () => {},
    message: "",
    handleInputChange: () => {},
    isLoading: false,
    fileId: ""
})

interface ChatContextProviderProps {
    fileId: string
    children: ReactNode
}


export const ChatContextProvider = ({fileId, children}: ChatContextProviderProps) => {
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({message} : {message: string}) => {
            setIsLoading(true)
            const response = await fetch('/api/message', {
                method: 'POST',
                body: JSON.stringify({
                    fileId,
                    message
                })
            });

            if (!response.ok) {
                throw new Error("Failed to send mesage");
            }
            
            setIsLoading(false);
            setMessage('');

            return;
        }
    });

    const addMessage = () => sendMessage({ message })
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    return (
        <ChatContext.Provider value={{
            addMessage: addMessage,
            message: message,
            handleInputChange: handleInputChange,
            isLoading: isLoading,
            fileId: fileId
        }}>
            {children}
        </ChatContext.Provider>
    )

}