import {PropertyCardProps} from "@/utils/types";
import {fetchProperties} from "@/utils/action";
import EmptyList from "@/components/home/EmptyList";
import PropertiesList from "@/components/home/PropertiesList";

const emptyList = <>
    <EmptyList
        heading='No result.'
        message='Try changing or removing some of your filters.'
        btnTxt='Clear filters'
    />
</>

export default async function PropertiesContainer(
    {category, search}: { category?: string, search?: string }
) {

    const properties: PropertyCardProps[] = await fetchProperties({
        category, search
    })

    if (!(properties.length > 0)) return emptyList


    return (
        <>
            <PropertiesList properties={properties}/>
        </>
    )

}