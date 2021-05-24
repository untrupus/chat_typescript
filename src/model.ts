import { Message } from "./interfaces";
import { getItem, setItem, removeItem } from "./helpers";

export class Model {
    users: string[];
    user: string;
    interlocutor: string;
    messages: Message[];

    constructor() {
        this.users = []
        this.user = ''
        this.interlocutor = ''
        this.messages = []
        removeItem('interlocutor');
        if (getItem('users') === null) {
            setItem('users', JSON.stringify(this.users));
        }
    }

    /** Add your name to local storage */
    loginModel(name: string): void {
        localStorage.setItem('login', name);
        this.user = name;
        this.registerUserModel(name);
        this.getUsersModel();
    }

    /** Add your name to users list or find it in the list */
    registerUserModel(name: string): void {
        if (getItem('users') === null) {
            setItem('users', '[]');
        } else {
            this.users = JSON.parse(getItem('users')!);
        }

        if (this.users.length === 0) {
            this.users.push(name);
            setItem('users', JSON.stringify(this.users));
        } else {
            const check = this.users.filter(user => user === name);
            if (check.length === 0) {
                this.users.push(name);
                setItem('users', JSON.stringify(this.users));
            }
        }
    }

    /** Clear key "login" in local storage */
    logoutModel() {
        removeItem('login');
        removeItem('interlocutor');
        this.interlocutor = '';
        this.user = '';
    }

    /** Update users list */
    getUsersModel() {
        if (getItem('users') !== null) {
            this.users = JSON.parse(getItem('users')!);
        }
    }

    /** Get your login*/
    getUserModel() {
        return getItem('login')
    }

    /** Save interlocutor`s name in model */
    setInterlocutorModel(name: string): void {
        setItem('interlocutor', name);
        this.interlocutor = name;
    }

    /** Remove interlocutor from storage */
    removeInterlocutorModel(): void {
        removeItem('interlocutor');
        this.interlocutor = '';
    }

    /** Save your message in storage */
    sendMessageModel(text: string, from: string, to: string): void {
        if (to !== null) {
            if (getItem('messages') === null) {
                setItem('messages', '[]');
            } else {
                this.messages = JSON.parse(getItem('messages')!);
            }
            let message: Message = {
                date: new Date(),
                text,
                from,
                to
            };

            this.messages.push(message);
            setItem('messages', JSON.stringify(this.messages));
        }
    }

    /** Get Messages from storage */
    getMessageModel(): void {
        this.messages = JSON.parse(getItem('messages')!);
    }
}
