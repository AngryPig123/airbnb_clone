import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function EmptyList(
    {
        heading = 'No Items in the list.',
        message = 'Keep exploring our properties',
        btnTxt = 'back home'
    }: {
        heading?: string,
        message?: string,
        btnTxt?: string,
    }) {

    return (
        <>
            <div className="mt-4">
                <h2 className="text-xl font-bold">
                    {heading}
                </h2>
                <p className="text-lg">
                    {message}
                </p>
                <Button asChild className='mt-4 capitalize' size='lg'>
                    <Link href='/'>
                        {btnTxt}
                    </Link>
                </Button>
            </div>
        </>
    )

}