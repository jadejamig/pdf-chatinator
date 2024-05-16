import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { BiLogoGithub } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";


export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh max-h-dvh w-dvw bg-zinc-950 bg-[url('/grid.svg')]">
      <div className="flex flex-col gap-y-2">
        <Card className="w-[350px] border border-zinc-900 bg-zinc-300">
          <CardHeader>
            <CardTitle className="flex flex-col ">
              <p className="font-black ">PDF Chatinator</p>
            </CardTitle>
            <CardDescription className="text-zinc-700 font-medium">Talk to your PDF files using generative AI.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
              <Link href="/dashboard">
                <Button className="flex w-full ">
                  <span className="font-bold bg-gradient-to-r text-base from-emerald-400 via-emerald-500 to-lime-300  inline-block text-transparent bg-clip-text">
                    Get Started
                  </span>
                </Button>
              </Link>
              
            <div>
                <a href="https://github.com/jadejamig" target="_blank" className="flex flex-row justify-center items-center gap-x-2" >
                  <p className="text-xs text-nowrap underline">by @JadeJamig</p>
                  <FaGithub className="h-5 w-5"/>
                </a>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
