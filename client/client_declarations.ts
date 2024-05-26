interface ITextFieldProps {
    label: string;

    [x: string]: any;
}

// ? REDUX TYPES

interface IUserState {
    sessionId?:string;
    loggedIn: boolean;
    // token: string | null;
}


export type {
    ITextFieldProps,
    IUserState
}