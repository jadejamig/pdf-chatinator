"use client";

import { UploadIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import Dropzone from "react-dropzone"
import UploadDropZone from "./upload-dropzone";

const UploadButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(x) => {
                if (!x) {
                    setIsOpen(x);
                }
            }}>
            <DialogTrigger
                asChild
                onClick={() => setIsOpen(true)}
            >
                <Button className="flex gap-x-2 ">
                    <UploadIcon className="w-4 h-4"/>
                    new file
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                </DialogHeader>
                <UploadDropZone />
            </DialogContent>
        </Dialog>
    )
}

export default UploadButton