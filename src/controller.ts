import { View } from './view';
import { Model } from './model';

export class Controller {
    private model: Model;
    private view: View;

    constructor() {
        this.model = new Model()
        this.view = new View()

        this.view.loginView(this.loginController.bind(this));
        this.view.logoutView(this.logoutController.bind(this));
        this.view.sendMessageView(this.sendMessageController.bind(this));
        this.getMessagesController();
    }

    /** Login */
    loginController(name: string): void {
        this.model.loginModel(name);
        this.view.clearHandlerView(this.view.userList);
        this.view.setUserListView(
            this.getUsersListController(),
            this.model.user,
            this.setInterlocutorController.bind(this));
    }

    /** Logout */
    logoutController(): void {
        this.model.logoutModel();
        this.model.removeInterlocutorModel();
        this.view.clearHandlerView(this.view.interlocutorName);
    }

    /** Get users list from local storage */
    getUsersListController(): string[] {
        this.model.getUsersModel();
        return this.model.users;
    }

    /** Set interlocutor name in chat window header*/
    setInterlocutorController(name: string): void {
        this.model.setInterlocutorModel(name);
        this.view.clearHandlerView(this.view.interlocutorName);
        this.view.setInterlocutorNameView(name);
        this.view.clearHandlerView(this.view.window);
        this.view.renderMessagesView(this.model.messages, this.model.getUserModel()!, this.model.interlocutor);
    }

    /** Send message to interlocutor */
    sendMessageController(text: string) {
        this.model.sendMessageModel(text, this.model.getUserModel()!, this.model.interlocutor);
        this.model.getMessageModel();
        this.view.clearHandlerView(this.view.window);
        this.view.renderMessagesView(this.model.messages, this.model.getUserModel()!, this.model.interlocutor);
    }

    /** Get messages */
    getMessagesController(): void {
        this.model.getMessageModel();
    }
}