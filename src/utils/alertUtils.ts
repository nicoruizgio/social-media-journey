export const showTemporaryAlert = (
  message: string,
  setShowAlert: (show: boolean) => void,
  setAlertMessage: (message: string) => void,
  duration = 4000
) => {
  setShowAlert(true);
  setAlertMessage(message);
  setTimeout(() => setShowAlert(false), duration);
};