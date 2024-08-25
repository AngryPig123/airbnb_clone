import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {categories} from "@/utils/categories";

const name = 'category';

export default function CategoryInput(
    {defaultValue}: { defaultValue?: string }
) {


    return (
        <>
            <div className="mb-2">
                <Label
                    htmlFor={name}
                    className='capivalize'
                >
                    Categories
                </Label>

                <Select
                    required
                    name={name}
                    defaultValue={defaultValue || categories[0].label}
                >
                    <SelectTrigger id={name}>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(
                            (item) => {
                                return (
                                    <>
                                        <SelectItem key={item.label} value={item.label}>
                                            <span className="flex item-center gap-2">
                                                 <item.icon/>
                                                {item.label}
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