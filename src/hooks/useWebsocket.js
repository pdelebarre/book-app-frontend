import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const useWebSocket = (onMessageReceived) => {
  useEffect(() => {
    // Create a SockJS connection
    const socket = new SockJS(
      `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/ws`
    );

    // Initialize the STOMP client
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        stompClient.subscribe("/topic/books", (message) => {
          onMessageReceived(message.body);
        });
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers["message"]}`);
        console.error(`Additional details: ${frame.body}`);
      },
    });

    // Connect to the server
    stompClient.activate();

    // Cleanup on component unmount
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [onMessageReceived]);
};

export default useWebSocket;
