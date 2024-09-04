import { useState } from "react";
import React from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, Message, MessageList, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";


type MessageType = {
    message: string,
    sender: string,
    direction: MessageDirection,
    position: "single" | "first" | "normal" | "last" | 0 |  1 | 2 | 3 
}

const ChatWindow = () => {

  const incoming: MessageDirection = "incoming";
  const outgoing: MessageDirection = "outgoing";
  const position: "single" | "first" | "normal" | "last" | 0 |  1 | 2 | 3 = "single";

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([{
    message: "Hello",
    sender: "ChatGPT",
    direction: incoming,
    position: position
  }
  ]) // []

  const handleSend = async (message: string) => {
    const newMessage = {
        message: message,
        sender: "user",
        direction: outgoing,
        position: position
    }

    const newMessages = [...messages, newMessage]

    //Update state
    setMessages(newMessages)

    //Typing indicator
    setTyping(true);
    //Process message to model (sen)
  }

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
        }}
        >
    <div style = {{ position: 'relative', height: '80vh', width:'60vw'}}>
        <MainContainer >
            <ChatContainer>
                <MessageList
                    scrollBehavior="smooth"
                    typingIndicator={typing ? <TypingIndicator content="Model is thinking"/>:null}
                >
                    {messages.map((message,i) => {
                        return <Message key={i} model={message}></Message>
                    })}
                </MessageList>
                <MessageInput placeholder="Type prompt here" onSend={handleSend}></MessageInput>
            </ChatContainer>
        </MainContainer>
    </div>
    </div>
  )
};

export default ChatWindow;
