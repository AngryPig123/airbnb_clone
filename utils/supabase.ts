import {createClient} from "@supabase/supabase-js";

const bucket = 'angrypig_airbnb_clone'

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

//  supabase bucket 에 파일을 업로드 하고 업로드 성공시 public url 을 가져오는 코드
export const uploadImage = async (image: File) => {
    const timeStamp = Date.now();
    const newName = `${timeStamp}-${image.name}`;
    const {data, error} =
        await supabase.storage.from(bucket).upload(
            newName,
            image,
            {cacheControl: '3600'}
        );
    console.log(data)
    if (!data) throw new Error('Image upload failed');
    return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
}
