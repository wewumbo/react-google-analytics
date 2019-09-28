import React from 'react';
import Socketio from 'socket.io-client';
import Echo from "laravel-echo";
import { connect } from 'react-redux';
import { addNewChat, sendMsg } from '../../../redux/chat/action';
import user1 from '../../../assets/images/users/1.jpg';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addNewChat: (id, chatMsg) => dispatch(addNewChat(id, chatMsg)),
  sendMsg: (id, chatMsg) => dispatch(sendMsg(id, chatMsg))
});


class Footer extends React.Component {


  constructor(props) {
    super(props);
    let echo = new Echo({
      broadcaster: 'socket.io',
      host: 'ws://localhost:6001',
      client: Socketio

    });

    echo.channel('admin')
      .listen('ChatEventAdmin', event => {
        var reply = event.msg;
        console.log(reply);
        var chats = this.props.chatReducer.chats;
        if (reply.message.includes("User visited")) {

          var result = chats.filter(t => t.session.includes(reply.from));
          if (result.length == 0) {
            var newId = Math.max.apply(Math, chats.map(function (o) { return o.id; })) + 1;
            console.log(newId);

            var newUser = {
              id: newId,
              name: reply.message,
              status: "online",
              session: reply.from,
              thumb: user1,
              recent: true,
              excerpt: 'Doctor',
              chatHistory: [
                {
                  0: {
                      from: ["Tom got a small piece of pie."],
                      to: [
                          "I'd rather be a bird than a fish.",
                          "They got there early, and they got really good seats."
                      ]
                  },
                  1: {
                      from: [
                          "If I don’t like something, I’ll stay away from it.",
                          "I want more detailed information."
                      ],
                      to: ["We need to rent a room for our party."]
                  }
              }
              ]
            }
            chats.push(newUser);
            this.props.addNewChat(chats);
          }

        } else {

          console.log(reply.from);
          var result = chats.filter(t => t.session.includes(reply.from));
          console.log(result[0].id);
          if (result.length > 0) {
            var id = result[0].id;
            this.props.sendMsg(id, reply.message);
          }

        }


      });
  }

  render() {
    return (
      <footer className="footer text-center">
        All Rights Reserved by Travel Hub Asia. Designed and Developed by{' '}
        <a href="#">Travel Hub Asia</a>.
      </footer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);