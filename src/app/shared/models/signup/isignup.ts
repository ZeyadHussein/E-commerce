export interface Isignup {
    message: string;
    user: User;
    token: string;
}

interface User {
    name: string;
    email: string;
    role: string;
}

export interface SignupData{

    name:string | null;
    email:string | null;
    password:string | null;
    rePassword:string | null;
    phone:string | null;
}

