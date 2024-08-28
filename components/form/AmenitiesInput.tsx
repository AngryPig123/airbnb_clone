'use client'
import {amenities, Amenity} from "@/utils/amenities";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";

export default function AmenitiesInput(
    {defaultValue}: { defaultValue?: Amenity[] }
) {

    const [selectAmenities, setSelectAmenities] =
        useState<Amenity[]>(defaultValue || amenities);

    const handleChange = (amenity: Amenity) => {
        setSelectAmenities((prev) => {
            return prev.map((a) => {
                if (a.name === amenity.name) {
                    return {...a, selected: true};
                }
                return a;
            })
        })
    }

    return (
        <>
            <section>
                <input
                    type="hidden"
                    name='amenities'
                    value={JSON.stringify(selectAmenities)}
                />
                <div className="grid grid-cols-2 gap-4">
                    {selectAmenities.map((amenity) => {
                        return (
                            <>
                                <div
                                    className='flex items-center space-x-2'
                                    key={amenity.name}>
                                    <Checkbox
                                        id={amenity.name}
                                        checked={amenity.selected}
                                        onChange={() => {
                                            handleChange(amenity)
                                        }}
                                    ></Checkbox>
                                    <label
                                        className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'
                                        htmlFor={amenity.name}>
                                        {amenity.name}
                                        <amenity.icon className='w-4 h-4'/>
                                    </label>
                                </div>
                            </>
                        )
                    })}
                </div>
            </section>
        </>
    )

}