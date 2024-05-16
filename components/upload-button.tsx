"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
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
                <Button className="flex gap-x-2 bg-zinc-800 border border-emerald-500 text-emerald-500">
                    <UploadIcon className="w-4 h-4" />
                    <span>new file</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                </DialogHeader>
                <UploadDropZone setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    )
}

export default UploadButton