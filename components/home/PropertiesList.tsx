import {PropertyCardProps} from "@/utils/types";
import PropertyCard from "@/components/card/PropertyCard";

export default function PropertiesList(
    {properties}: { properties: PropertyCardProps[] }
) {

    return (
        <>
            <section className='mt-4 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                {properties.map((property, index) => {
                    return(
                        <>
                            <PropertyCard
                                key={property.id}
                                property={property}
                            ></PropertyCard>
                        </>
                    )
                })}
            </section>
        </>
    )

}