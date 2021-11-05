import React, { useContext } from "react";
import { Avatar } from "@mui/material";
import { AuthContext } from "context/AuthProvider";
import { AppContext } from "context/AppProvider";
import moment from "moment";

export default function Message(props) {
  const { user } = useContext(AuthContext);
  const { selectedRoom } = useContext(AppContext);
  const { displayName, text, photoURL, createdAt, uid } = props;

  function formatDate(seconds) {
    let formattedDate = "";

    if (seconds) {
      formattedDate = moment(new Date(seconds * 1000), "H:mm").format("H:mm");
    }

    return formattedDate;
  }

  return (
    <div
      className={
        uid === user.uid
          ? "chat-window__chat__container__content-conv__mess--right"
          : "chat-window__chat__container__content-conv__mess--left"
      }
    >
      <Avatar src={photoURL} />
      <div className="chat-window__chat__container__content-conv__mess__text">
        {selectedRoom.members.length !== 2 && uid !== user.uid && (
          <div style={{ marginLeft: "2px" }}>{displayName}</div>
        )}
        {text}
        <div style={{ marginTop: "8px" }}>
          {formatDate(createdAt?.seconds) || "Đang gửi"}
        </div>
      </div>
    </div>
  );
}
