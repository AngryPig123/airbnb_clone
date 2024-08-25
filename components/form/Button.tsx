'use client'
import {useFormStatus} from 'react-dom'
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
    className?: string;
    text?: string;
    size?: btnSize
}

export default function SubmitButton(
    {className = '', text = '', size = 'lg'}: SubmitButtonProps
) {
    const {pending} = useFormStatus()
    return (
        <>
            <Button
                className={`capitalize ${className}`}
                type='submit'
                size={size}
                disabled={pending}
            >
                {pending ?
                    <>
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin'/>
                        Please wait...
                    </> :
                    text
                }
            </Button>
        </>
    )

}
