import {Input} from "@/components/ui/input";

export default function NavSearch() {
    return (
        <>
            <Input
                className='max-w-xs dark:bg-muted'
                type='text'
                placeholder='find a properties...'
            />
        </>
    )
}