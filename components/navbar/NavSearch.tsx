'use client'
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

export default function NavSearch() {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const [search, setSearch] = useState<string>(searchParams.get('search')?.toString() || '')

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set('search', value)
        } else {
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 500)

    useEffect(() => {
        if (!search) setSearch('')
    }, [search]);

    return (
        <>
            <Input
                className='max-w-xs dark:bg-muted'
                type='text'
                placeholder='find a properties...'
                onChange={(e) => {
                    const value = e.target.value
                    setSearch(value)
                    handleSearch(value)
                }}
                value={search}
            />
        </>
    )
}