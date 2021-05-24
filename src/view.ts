import { $ } from './helpers';
import { ID, CLASS } from './constants';
import { Message } from "./interfaces";

export class View {
    chatWindow: HTMLElement;
    loginBlock: HTMLElement;
    loginBtn: HTMLElement;
    logoutBtn: HTMLElement;
    userName: HTMLInputElement;
    userList: HTMLElement;
    interlocutorName: HTMLElement;
    messageForm: HTMLElement;
    messageInput: HTMLInputElement;
    window: HTMLElement;

    constructor() {
        this.chatWindow = $(ID.chatWindow)!;
        this.loginBlock = $(ID.loginBlock)!;
        this.loginBtn = $(ID.loginBtn)!;
        this.logoutBtn = $(ID.logoutBtn)!;
        this.userName = <HTMLInputElement>$(ID.loginInput)!;
        this.userList = $(ID.usersList)!;
        this.interlocutorName = $(ID.interlocutorName)!;
        this.messageForm = $(ID.messageForm)!;
        this.messageInput = <HTMLInputElement>$(ID.messageInput)!;
        this.window = $(ID.window)!;
    }

    /** Add action on login button */
    loginView(handler: Function) {
        this.loginBtn.addEventListener('click', () => {
            if (this.userName.value !== '') {
                handler(this.userName.value);
                this.loginBlock.className = CLASS.hide;
                this.chatWindow.className = CLASS.chatWindow;
                this.userName.value = '';
            }
        });
    }

    /** Add action on logout button */
    logoutView(handler: Function) {
        this.logoutBtn.addEventListener('click', () => {
            handler();
            this.chatWindow.className = CLASS.hide;
            this.loginBlock.className = CLASS.login;
        });
    }

    /** Clear selected block  */
    clearHandlerView(element: HTMLElement) {
        element.innerHTML = '';
    }

    /** Render users in users list */
    setUserListView(userList: string[], yourAccount: string, interlocutorHandler: Function, handler?: Function) {
        if (userList !== null) {
            userList.forEach(user => {
                const newUser = document.createElement('li');
                newUser.className = 'item';
                newUser.id = user
                newUser.innerHTML = user;

                newUser.addEventListener('click', () => {
                    interlocutorHandler(user);
                });

                if (user !== yourAccount) {
                    this.userList.append(newUser);
                }
                handler ? handler(user) : null;
            });
        }
    }

    setInterlocutorNameView(name: string) {
        this.interlocutorName.innerHTML = name;
    }

    /** Add event on "send" button */
    sendMessageView(handler: Function) {
        this.messageForm.addEventListener('submit', () => {
            event!.preventDefault();
            if (this.messageInput.value !== '') {
                handler(this.messageInput.value);
                this.messageInput.value = '';
            }
        });
    }

    /** Render messages in chat window */
    renderMessagesView(messageList: Message[], from: string, to: string) {
        if (messageList !== null) {
            messageList.forEach(message => {
                if ((message.from === from && message.to === to) || (message.from === to && message.to === from)) {
                    const newMessage = document.createElement('div');
                    newMessage.className = 'singleMessage';
                    newMessage.innerHTML = `<p class="date">${message.date}</p><p>${message.text}</p>`;
                    this.window.append(newMessage);
                }
            });
        }
    }
}

