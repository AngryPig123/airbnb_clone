import {fetchProfile, updateProfileAction, updateProfileImageAction} from "@/utils/action";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/Button";
import ImageInputContainer from "@/components/form/ImageInputContainer";

export default async function ProfilePage() {
    const {
        id,
        clerkId,
        firstName,
        lastName,
        username,
        email,
        profileImage,
        createdAt,
        updatedAt
    } = await fetchProfile();

    return (
        <>
            <section>
                <h1 className='text-2xl font-semibold md-8 capitalize'>
                    user profile
                </h1>
                <div className='border p-8 rounded-md max-w-lg'>

                    {/* image input container */}

                    <ImageInputContainer
                        image={profileImage}
                        name={username}
                        action={updateProfileImageAction}
                        text='Update Profile Image'
                    />

                    <FormContainer action={updateProfileAction}>
                        <div className='grid gap-4 mt-4'>

                            <FormInput
                                type='text'
                                name='firstName'
                                label='First Name'
                                defaultValue={firstName}
                            />

                            <FormInput
                                type='text'
                                name='lastName'
                                label='Last Name'
                                defaultValue={lastName}
                            />

                            <FormInput
                                type='text'
                                name='username'
                                label='Username'
                                defaultValue={username}
                            />

                        </div>
                        <SubmitButton
                            className='mt-8'
                            text='Create Profile'
                        />
                    </FormContainer>

                </div>
            </section>
        </>
    )
}