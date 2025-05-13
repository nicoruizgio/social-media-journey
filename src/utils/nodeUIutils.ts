export const showTemporaryAlert = (message, setShowAlert, setAlertMessage, duration = 4000) => {
  setShowAlert(true);
  setAlertMessage(message);
  setTimeout(() => setShowAlert(false), duration);
};

export const setupConnectionCompletedListener = (setPendingConnection) => {
  const handleConnectionCompleted = () => {
    setPendingConnection(null);

    const handles = document.querySelectorAll(".react-flow__handle");
    handles.forEach((handle) => {
      if (handle.classList.contains("connecting-handle")) {
        handle.classList.remove("connecting-handle");
        handle.style.display = "none";
        void handle.offsetHeight;
        handle.style.display = "";
      }
    });
  };

  document.addEventListener("connection-completed", handleConnectionCompleted);
  return () => document.removeEventListener("connection-completed", handleConnectionCompleted);
};