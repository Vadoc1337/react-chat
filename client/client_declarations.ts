interface ITextFieldProps {
    label: string;

    [x: string]: any;
}

interface ChatProps {
    userid: string | undefined;
}

// ? REDUX TYPES

interface IUserState {
    sessionId?: string;
    loggedIn: boolean | null;
    // token: string | null;
}

interface IColleaguesSlice {
    username?: string,
    userid?: string,
    connected?: string
}

interface IMessagesSlice {
    to: string | undefined;
    from?: string | null | undefined;
    text?: string
}

export type {
    ITextFieldProps,
    IUserState,
    IColleaguesSlice,
    IMessagesSlice,
    ChatProps
}