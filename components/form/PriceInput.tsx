import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type PriceInput = {
    defaultValue?: number
}

export default function PriceInput(props: PriceInput) {

    const name = 'price';
    const {defaultValue} = props;

    return (
        <>
            <div className="mb-2">
                <Label className='capitalize' htmlFor={name}>
                    Price($)
                </Label>
                <Input
                    id={name}
                    type='number'
                    name={name}
                    min={0}
                    defaultValue={defaultValue || 100}
                    required
                />
            </div>
        </>
    )

}