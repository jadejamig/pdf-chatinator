import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh max-h-dvh w-screen bg-gray-950 bg-[url('/grid.svg')]">
      <div className="flex flex-col gap-y-2">
        <Card className="w-[350px] border border-zinc-900 bg-zinc-300">
          <CardHeader>
            <CardTitle className="flex flex-col ">
              <p className="font-black">PDF Chatinator</p>
            </CardTitle>
            <CardDescription className="text-zinc-700 font-medium">Talk to your PDF files using AI technology.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            
            
              <Button className="w-full" asChild>
                <Link href="/dashboard">
                  Get Started
                  <MoveRight className="pl-2"/>
                </Link>
              </Button>
           

            <div className="flex flex-row justify-center items-center gap-x-2">
              <div className="w-full h-px bg-zinc-400" /> 
                <p className="text-xs text-nowrap">by Jade Jamig</p>
              <div className="w-full h-px bg-zinc-400"/>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
