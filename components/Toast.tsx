import RNToast from "react-native-toast-message";

type ToastOptions = {
  type?: "success" | "error" | "info";
  text1?: string;
  text2?: string;
};

const Toast = {
  show({ type = "info", text1, text2 }: ToastOptions) {
    RNToast.show({
      type,
      text1,
      text2,
      position: "top",
      visibilityTime: 3000,
    });
  },
};

export default Toast;
