import { setMessages } from "@/redux/chatSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useGetAllMessages = () => {
  const { selectedUser } = useSelector((store) => store.auth);

  const chatUserId = selectedUser?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        if (!chatUserId) return;
        const response = await fetch(
          `${baseUrl}/api/v1/message/all/${chatUserId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.success) {
          // console.log(data.messages);
          dispatch(setMessages(data.messages));
          // console.log(chatUserId);
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
