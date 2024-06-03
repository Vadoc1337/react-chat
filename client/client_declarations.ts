interface ITextFieldProps {
    label: string;

    [x: string]: any;
}

interface IChatProps {
    userid: string | undefined;
}

interface IFormValues {
    message: string;
}

// ? REDUX TYPES

interface IUserState {
    sessionId?: string;
    loggedIn: boolean | null;
    // token: string | null; добавить в будущем
}

interface IColleaguesSlice {
    username?: string,
    userid?: string,
    connected?: boolean
}

interface IMessage {
    to: string | undefined;
    from?: string | null | undefined;
    text?: string
}

export type {
    ITextFieldProps,
    IUserState,
    IColleaguesSlice,
    IMessage,
    IChatProps,
    IFormValues,
}