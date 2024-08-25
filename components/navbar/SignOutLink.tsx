'use client'
import {useToast} from "@/components/ui/use-toast";
import {SignOutButton} from "@clerk/nextjs";

export default function SignOutLink() {
    const {toast} = useToast()

    const handlerLogout = () => {
        toast({description: `you have been signed out.`})
    }

    return (
        <>
            <SignOutButton
                redirectUrl={`/`}
            >
                <button
                    className='w-full text-left'
                    onClick={handlerLogout}
                >
                    Logout
                </button>
            </SignOutButton>
        </>
    )
}