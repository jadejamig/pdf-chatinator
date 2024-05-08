import React from 'react'
import { Button } from './ui/button'
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

const NavigationBar = () => {
  return (
    <div className='flex justify-end items-center w-full p-4'>
        <Button>
            <LogoutLink>Log out</LogoutLink>
        </Button>
    </div>
  )
}

export default NavigationBar