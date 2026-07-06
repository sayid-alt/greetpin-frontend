import { auth } from "./auth"

const getAccessToken = async () => {
    const session = await auth();
    return session?.accessToken;
}


export {getAccessToken}