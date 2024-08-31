import {PropertyCardProps} from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import {formatCurrency} from "@/utils/format";
import PropertyRating from "@/components/card/PropertyRating";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import CountryFlagAndName from "@/components/card/CountryFlagAndName";

export default function PropertyCard(
    {property}: { property: PropertyCardProps }
) {

    const {name, image, price} = property;

    //  구조분해 대상이 되는 property id 속성값을 propertyId 로 할당
    const {country, id: propertyId, tagline} = property;

    return (
        <>
            <article className='group relative'>
                <Link href={`/properties/${propertyId}`}>
                    <div className='relative h-[300px] mb-2 overflow-hidden rounded-md'>
                        <Image
                            src={image}
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
                            alt={name}
                            className='rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500'
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold mt-1">
                            {name.substring(0, 30)}
                        </h3>
                        <PropertyRating inPage={false} propertyId={propertyId}/>
                    </div>

                    <p className="text-sm mt-1 text-muted-foreground">
                        {tagline.substring(0, 40)}
                    </p>

                    <div className="flex justify-between items-center mt-1">
                        <p className="text-sm mt-1">
                    <span className="font-semibold">
                        {formatCurrency(price)}
                    </span>
                            night
                        </p>
                    </div>
                    <CountryFlagAndName countryCode={country}/>
                </Link>
                <div className="absolute top-5 right-4 z-5">
                    {/* favorite toggle button */}
                    <FavoriteToggleButton propertyId={propertyId}/>
                </div>
            </article>
        </>

    )

}