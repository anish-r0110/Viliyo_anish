import { alertInstance } from "@/components/alert";


const logoutConfirmationDailouge = ( onConfirm:() => void ) => {
    
    alertInstance.emit("showAlert", {
        type: "logout",
        heading: "Are you sure you want to log out?",
        buttonText: "Yes",
        onCloseText: "No",
        onOk: onConfirm,
        onClose: () => {
          return;
        },
      });

}

export default logoutConfirmationDailouge;