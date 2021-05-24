(()=>{"use strict";var e={120:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Controller=void 0;const i=s(85),o=s(134);t.Controller=class{constructor(){this.model=new o.Model,this.view=new i.View,this.view.loginView(this.loginController.bind(this)),this.view.logoutView(this.logoutController.bind(this)),this.view.sendMessageView(this.sendMessageController.bind(this)),this.getMessagesController()}loginController(e){this.model.loginModel(e),this.view.clearHandlerView(this.view.userList),this.view.setUserListView(this.getUsersListController(),this.model.user,this.setInterlocutorController.bind(this))}logoutController(){this.model.logoutModel(),this.model.removeInterlocutorModel(),this.view.clearHandlerView(this.view.interlocutorName)}getUsersListController(){return this.model.getUsersModel(),this.model.users}setInterlocutorController(e){this.model.setInterlocutorModel(e),this.view.clearHandlerView(this.view.interlocutorName),this.view.setInterlocutorNameView(e),this.view.clearHandlerView(this.view.window),this.view.renderMessagesView(this.model.messages,this.model.getUserModel(),this.model.interlocutor)}sendMessageController(e){this.model.sendMessageModel(e,this.model.getUserModel(),this.model.interlocutor),this.model.getMessageModel(),this.view.clearHandlerView(this.view.window),this.view.renderMessagesView(this.model.messages,this.model.getUserModel(),this.model.interlocutor)}getMessagesController(){this.model.getMessageModel()}}},382:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.removeItem=t.setItem=t.getItem=t.$=void 0,t.$=e=>document.getElementById(e),t.getItem=e=>localStorage.getItem(e),t.setItem=(e,t)=>localStorage.setItem(e,t),t.removeItem=e=>localStorage.removeItem(e)},134:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const i=s(382);t.Model=class{constructor(){this.users=[],this.user="",this.interlocutor="",this.messages=[],i.removeItem("interlocutor"),null===i.getItem("users")&&i.setItem("users",JSON.stringify(this.users))}loginModel(e){localStorage.setItem("login",e),this.user=e,this.registerUserModel(e),this.getUsersModel()}registerUserModel(e){null===i.getItem("users")?i.setItem("users","[]"):this.users=JSON.parse(i.getItem("users")),(0===this.users.length||0===this.users.filter((t=>t===e)).length)&&(this.users.push(e),i.setItem("users",JSON.stringify(this.users)))}logoutModel(){i.removeItem("login"),i.removeItem("interlocutor"),this.interlocutor="",this.user=""}getUsersModel(){null!==i.getItem("users")&&(this.users=JSON.parse(i.getItem("users")))}getUserModel(){return i.getItem("login")}setInterlocutorModel(e){i.setItem("interlocutor",e),this.interlocutor=e}removeInterlocutorModel(){i.removeItem("interlocutor"),this.interlocutor=""}sendMessageModel(e,t,s){if(null!==s){null===i.getItem("messages")?i.setItem("messages","[]"):this.messages=JSON.parse(i.getItem("messages"));let o={date:new Date,text:e,from:t,to:s};this.messages.push(o),i.setItem("messages",JSON.stringify(this.messages))}}getMessageModel(){this.messages=JSON.parse(i.getItem("messages"))}}},85:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const i=s(382);t.View=class{constructor(){this.chatWindow=i.$("chatWindow"),this.loginBlock=i.$("loginBlock"),this.loginBtn=i.$("loginBtn"),this.logoutBtn=i.$("logoutBtn"),this.userName=i.$("loginInput"),this.userList=i.$("usersList"),this.interlocutorName=i.$("interlocutorName"),this.messageForm=i.$("messageForm"),this.messageInput=i.$("messageInput"),this.window=i.$("window")}loginView(e){this.loginBtn.addEventListener("click",(()=>{""!==this.userName.value&&(e(this.userName.value),this.loginBlock.className="hide",this.chatWindow.className="chatWindow",this.userName.value="")}))}logoutView(e){this.logoutBtn.addEventListener("click",(()=>{e(),this.chatWindow.className="hide",this.loginBlock.className="login"}))}clearHandlerView(e){e.innerHTML=""}setUserListView(e,t,s,i){null!==e&&e.forEach((e=>{const o=document.createElement("li");o.className="item",o.id=e,o.innerHTML=e,o.addEventListener("click",(()=>{s(e)})),e!==t&&this.userList.append(o),i&&i(e)}))}setInterlocutorNameView(e){this.interlocutorName.innerHTML=e}sendMessageView(e){this.messageForm.addEventListener("submit",(()=>{event.preventDefault(),""!==this.messageInput.value&&(e(this.messageInput.value),this.messageInput.value="")}))}renderMessagesView(e,t,s){null!==e&&e.forEach((e=>{if(e.from===t&&e.to===s||e.from===s&&e.to===t){const t=document.createElement("div");t.className="singleMessage",t.innerHTML=`<p class="date">${e.date}</p><p>${e.text}</p>`,this.window.append(t)}}))}}}},t={};new(function s(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,s),r.exports}(120).Controller)})();