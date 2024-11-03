export interface AuthSatte {
    token: string | null;
    user: User | null;
}

export interface User {
    email: string;
    password: string;
}