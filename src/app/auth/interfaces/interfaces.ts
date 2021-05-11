

export interface AuthResponse {
    ok: boolean;
    userID?: string;
    name?: string;
    email?: string;
    token?: string;
    msg: string;

}

export interface Usuario {
    userID: string;
    name: string;
    email: string;
}