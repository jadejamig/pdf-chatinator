import { useToast } from "@/components/ui/use-toast";
import { ReactNode, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query"

type StreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean,
}

export const ChatContext = createContext({
    addMessage: () => {},
    message: "",
    handleInputChange: () => {},
    isLoading: false,
})

interface ChatContextProviderProps {
    fileId: string
    children: ReactNode
}


export const ChatContextProvider = ({fileId, children}: ChatContextProviderProps) => {
    const [message, setMessage] = useState<string>('');

    const { toast } = useToast();

    const { mutate: sendMessage } = useMutation({
        mutationFn: async () => {
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

            return response.body;
        }
    });


}