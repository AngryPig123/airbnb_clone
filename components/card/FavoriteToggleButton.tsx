import {Button} from "@/components/ui/button";
import {FaHeart} from "react-icons/fa6";

export default function FavoriteToggleButton(
    {propertyId}: { propertyId: String },
) {

    return (
        <>
            <Button
                size='icon'
                variant='outline'
                className='p-2 sursor-pointer'
            >
                <FaHeart/>
            </Button>
        </>
    )

}