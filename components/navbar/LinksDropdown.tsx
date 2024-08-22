import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {LuAlignLeft} from 'react-icons/lu';
import Link from 'next/link';
import {Button} from '../ui/button';
import UserIcon from './UserIcon';
import {links} from '@/utils/links';
import SignOutLink from './SignOutLink';
import {SignedIn, SignedOut, SignInButton, SignUpButton} from "@clerk/nextjs";

export default function LinksDropdown() {
    return (
        <>
            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <Button
                        className='flex gap-4 max-w-[100px]'
                        variant={"outline"}
                    >
                        <LuAlignLeft className='w-6 h-6'/>
                        <UserIcon/>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className='w-52'
                    align='start'
                    sideOffset={10}
                >

                    <SignedOut>

                        <DropdownMenuItem>
                            <SignInButton mode='modal'>
                                <button className='w-full text-left'>
                                    Login
                                </button>
                            </SignInButton>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator/>

                        <DropdownMenuItem>
                            <SignUpButton mode='modal'>
                                <button className='w-full text-left'>
                                    Register
                                </button>
                            </SignUpButton>
                        </DropdownMenuItem>

                    </SignedOut>

                    <SignedIn>
                        {links.map((link, i) => {
                            return (
                                <>
                                    <DropdownMenuItem key={`ddmi_${link.href}_${i}`}>
                                        <Link
                                            className='capitalize w-full'
                                            href={`${link.href}`}>
                                            {link.label}
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )
                        })}

                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <SignOutLink/>
                        </DropdownMenuItem>

                    </SignedIn>


                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}