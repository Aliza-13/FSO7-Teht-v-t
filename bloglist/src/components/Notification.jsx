import useNotificationStore from "../stores/NotificationStore";

const Notification = ({ notification }) => {
  const message = useNotificationStore((state) => state.message);
  const type = useNotificationStore((state) => state.type);

  console.log("Notification-komponentti:", { message, type });

  if (!message) return null;

  return (
    <div
      style={{
        padding: 20,
        margin: "20px",
        border: "3px solid",
        backgroundColor: "yellow",
        color: "black",
        fontSize: "24px",
        position: "relative",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
