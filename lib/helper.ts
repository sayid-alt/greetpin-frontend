import { auth } from "../service/auth"

const getAccessToken = async () => {
    const session = await auth();
    return session?.accessToken;
}


export {getAccessToken}