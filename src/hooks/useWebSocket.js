import { useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const useWebSocket = (onMessageReceived) => {
  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_API_BASE_URL}/ws`);
    const stompClient = over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/books", (message) => {
        onMessageReceived(message.body);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [onMessageReceived]);
};

export default useWebSocket;
