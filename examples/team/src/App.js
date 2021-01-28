import React, { Component } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelHeader,
  ChannelListTeam,
  InfiniteScrollPaginator,
  ChannelList,
  MessageTeam,
  Window,
  Thread,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './App.css';

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user') || process.env.REACT_APP_USER_ID;
const theme = urlParams.get('theme') || 'light';
const userToken =
  urlParams.get('user_token') || process.env.REACT_APP_USER_TOKEN;

const filters = { type: 'team' };
const sort = { last_message_at: -1, cid: 1 };
const options = {
  member: true,
  watch: true,
  limit: 30,
};

const Paginator = (props) => (
  <InfiniteScrollPaginator threshold={300} {...props} />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.chatClient = new StreamChat(process.env.REACT_APP_STREAM_KEY);
    if (process.env.REACT_APP_CHAT_SERVER_ENDPOINT) {
      this.chatClient.setBaseURL(process.env.REACT_APP_CHAT_SERVER_ENDPOINT);
    }
    this.chatClient.setUser({ id: user }, userToken);
  }

  render() {
    return (
      <Chat client={this.chatClient} theme={`team ${theme}`}>
        <ChannelList
          filters={filters}
          sort={sort}
          options={options}
          List={ChannelListTeam}
          Paginator={Paginator}
        />
        <Channel
          onMentionsHover={(e, user) => console.log(e, user)}
          onMentionsClick={(e, user) => console.log(e, user)}
        >
          <Window>
            <ChannelHeader />
            <MessageList Message={MessageTeam} />
            <MessageInput focus />
          </Window>
          <Thread Message={MessageTeam} />
        </Channel>
      </Chat>
    );
  }
}

export default App;
