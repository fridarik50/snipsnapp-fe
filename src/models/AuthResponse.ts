import BaseUser from "./BaseUser";

interface AuthResponse{
    entity: BaseUser;
    token: string;
}

export default AuthResponse;