'use client'
import React, {useEffect} from "react";
import {useFormState} from "react-dom";
import {actionFunction} from '@/utils/types'
import {useToast} from "@/components/ui/use-toast";

const initialState = {
    message: '',
}

export default function FormContainer(
    {action, children}: { action: actionFunction, children: React.ReactNode }
) {

    const [state, formAction] = useFormState(action, initialState); //  useFormState에 form의 액션 함수와 초기값을 전달하면, form에 사용할 새로운 액션과 최신 state를 반환한다.
    const {toast} = useToast();

    //  useFormState 값에서 state 값이 변경될때를 감지해서 안에 담긴 return 값을 사용.
    useEffect(() => {
        if (state.message) {
            toast({description: state.message})
        }
    }, [state]);

    return (
        <>
            <form action={formAction}>
                {children}
            </form>
        </>
    )

}
