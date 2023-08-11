// mouse.js
import { storage } from '@/firebase';
import { ref } from '@firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

export async function useUploadUserImage(imageFile: File) {
    try {
        const storageRef = ref(storage, `userImages/${(Math.random() + 1).toString(36).substring(2)}.png`);
        await uploadBytes(storageRef, new Blob([imageFile], { type: 'image/png' }));
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.error('Error uploading user image:', error);
    }
}