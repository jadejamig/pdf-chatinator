import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-y-2">
        <Card className="w-[350px] border border-zinc-900 bg-zinc-300">
          <CardHeader>
            <CardTitle className="flex flex-col ">
              <p className="font-black">PDF Chatinator</p>
            </CardTitle>
            <CardDescription className="text-zinc-700 font-medium">Talk to your PDF files using AI technology.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-2">
            <Button className="w-full">
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button className="w-full">
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
