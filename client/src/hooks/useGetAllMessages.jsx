import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useGetAllMessages = ({ chatUserId }) => {
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/message/all/${chatUserId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.success) {
          //   dispatch(setUserProfile(data.user));
          console.log(data.messages);
          console.log(chatUserId);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };

    fetchAllMessages();
  }, [chatUserId]);
};

export default useGetAllMessages;
