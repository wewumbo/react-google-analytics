import React, { Component, Fragment } from "react";
import ChatList from "../../containers/chat/chatList";
import ChatSearch from "../../containers/chat/chatSearch";
import ChatContent from "../../containers/chat/chatContent";
import ChatMsgSend from "../../containers/chat/chatMsgSend";
import axios  from "axios";

class Chat extends Component {



      async _onMessageSend(message) {

        var body = { message: message.data.text, to: this.state.fromId };
        console.log(body);
        const config = {
          method: 'post',
          data: body,
          url: 'http://localhost/chat_backend/public/api/chat_to_user',
          headers: { 'Content-Type': 'application/json' }
        }
    
        let res = await axios(config);
    
      }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="left-part bg-white chat-list">
                        <ChatList />
                    </div>
                    <div className="right-part bg-white chat-list">
                        <ChatContent />
                        <ChatMsgSend />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Chat;
