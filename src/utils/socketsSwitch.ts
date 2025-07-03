
interface WebSocketHandlers {
  setNotifications?: React.Dispatch<React.SetStateAction<Notification[]>>;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  // Add more setter types if you use them
}

export function handleSocketMessage(
  message: string,
  handlers: WebSocketHandlers
) {
  try {
    const parsed = JSON.parse(message);
    const eventType = parsed.event;
    const payload = parsed.data;

    switch (eventType) {
      case "notification":
        if(handlers.setNotifications) handlers.setNotifications((prev) => [payload, ...prev]);
        break;

      case "unread_notifications":
        handlers.setUnreadCount(payload.count);
        break;

      case "direct_message":
        // handle direct message here
        break;

      case "direct_message_sent":
        // console.log("Message sent:", payload);
        break;

      case "unread_messages":
        // handle unread messages here if needed
        break;

      default:
        console.warn("Unknown event type:", eventType, payload);
    }
  } catch (err) {
    console.error("Error parsing WebSocket message:", err);
  }
}
