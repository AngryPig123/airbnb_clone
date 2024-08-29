import FormContainer from "@/components/form/FormContainer";
import {createPropertyAction} from "@/utils/action";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/Button";
import PriceInput from "@/components/form/PriceInput";
import CategoryInput from "@/components/form/CategoryInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CountriesInput from "@/components/form/CountriesInput";
import ImageInput from "@/components/form/ImageInput";
import CounterInput from "@/components/form/CounterInput";
import AmenitiesInput from "@/components/form/AmenitiesInput";

export default function CreatePropertyPage() {

    return (
        <>
            <section>
                <h2 className="text-2xl font-semibold md-8 capitalize">
                    create property
                </h2>
                <div className="border p-8 rounded">
                    <h3 className="text-lg mb-4 font-medium">General Info</h3>
                    <FormContainer action={createPropertyAction}>
                        <div className="grid md:grid-cols-2 gap-8 mb-4">

                            <FormInput
                                name='name'
                                type='text'
                                label='Name (20 limit)'
                                defaultValue='Cabin in Latvia'
                            />

                            <FormInput
                                name='tagline'
                                type='text'
                                label='Tagling (30 limit)'
                                defaultValue='Dream Getaway Awaits You Here'
                            />

                            {/* price */}
                            <PriceInput/>

                            {/* categories */}
                            <CategoryInput/>
                        </div>

                        {/* text area / description */}
                        <TextAreaInput
                            name='description'
                            labelText='Description (10 - 1000 words)'
                        />

                        <div className="grid sm:grid-cols-2 gap-8 mt-4">
                            <CountriesInput/>
                            <ImageInput/>
                        </div>

                        <h3 className="text-lg mt-8 mb-4 font-medium">Accommodation Details</h3>

                        <CounterInput detail='guests'/>
                        <CounterInput detail='bedrooms'/>
                        <CounterInput detail='beds'/>
                        <CounterInput detail='baths'/>

                        <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
                        <AmenitiesInput/>

                        <SubmitButton
                            className='mt-12'
                            text='create rental'
                        />
                    </FormContainer>
                </div>
            </section>
        </>
    )

}