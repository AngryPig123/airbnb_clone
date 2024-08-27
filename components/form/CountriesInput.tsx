import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formattedCountries} from "@/utils/countries";

const name = 'country';

export default function CountriesInput(
    {defaultValue}: { defaultValue?: string }
) {

    return (
        <>
            <div className="md-2">
                <Label
                    htmlFor={name}
                    className='capitalize'
                >
                    country
                </Label>

                <Select
                    required
                    name={name}
                    defaultValue={defaultValue || formattedCountries[0].code}
                >
                    <SelectTrigger id={name}>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {formattedCountries.map(
                            (item) => {
                                return (
                                    <>
                                        <SelectItem key={item.code} value={item.code}>
                                            <span className="flex item-center gap-2">
                                                {item.flag}
                                                {item.name}
                                            </span>
                                        </SelectItem>
                                    </>
                                )
                            })}
                    </SelectContent>
                </Select>
            </div>
        </>
    )

}
