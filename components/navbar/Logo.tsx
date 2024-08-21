import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LuTent} from "react-icons/lu";

export default function Logo() {
    return (
        <>
            <Button size='icon' asChild>
                <Link href="/">
                    <LuTent className='u-6 h-6'/>
                </Link>
            </Button>
        </>
    )
}