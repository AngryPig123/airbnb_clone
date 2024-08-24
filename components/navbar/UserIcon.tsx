import {LuUser2} from "react-icons/lu";
import {fetchProfileImage} from "@/utils/action";

export default async function UserIcon() {

    const imageClass = 'w-6 h-6 bg-primary rounded-lg test-white';
    const profileImage = await fetchProfileImage();

    if (profileImage) {
        return (
            <img
                className={imageClass}
                src={`${profileImage}`}
                alt="user profile image"
            />
        )
    }

    return (
        <>
            <LuUser2
                className={imageClass}
            />
        </>
    )

}
