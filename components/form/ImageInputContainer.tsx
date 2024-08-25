'use client'
import React, {useState} from "react";
import {actionFunction} from "@/utils/types";
import {LuUser2} from "react-icons/lu";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import FormContainer from "@/components/form/FormContainer";
import ImageInput from "@/components/form/ImageInput";
import SubmitButton from "@/components/form/Button";

type ImageInputContainerProps = {
    image: string;
    name: string;
    action: actionFunction;
    text: string;
    children?: React.ReactNode;
}

export default function ImageInputContainer(
    props: ImageInputContainerProps
) {

    //  이미지 업데이트를 처리하는 props 정의
    const {image, name, action, text, children} = props;

    //  업데이트 양식 표시 여부
    const [isUpdateFormVisible, setUpdateFormVisible] = useState<Boolean>(false);

    const userIcon = (
        <LuUser2
            className='w-24 h-24 bg-primary rounded text-white'
        />
    );

    const updateImage = (
        <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className='rounded object-cover mb-4 w-24 h-24'
        />
    );

    return (
        <>
            <div>
                {image ? updateImage : userIcon}
                <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                        setUpdateFormVisible((prev) => !prev)
                    }}
                >
                    {text}
                </Button>
                {
                    isUpdateFormVisible &&
                    <div className='max-w-lg mt-4'>
                        <FormContainer action={action}>
                            {children}
                            <ImageInput/>
                            <SubmitButton text='Submit' size='sm'/>
                        </FormContainer>
                    </div>
                }
            </div>
        </>
    )

}
