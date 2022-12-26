import "../style/ChatroomView.css";
import React, {useEffect, useState, useContext, useRef} from "react";
import {SocketContext} from "../socket";
import {useNavigate} from "react-router-dom";
import rolecrate from "../../../server/utils/rolecreate.js";



const ChatroomView = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  let [userData, setUserData] = useState({});  // <-- Add comma here
  let [messages, setMessages] = useState([]);  // <-- Add comma here

  useEffect(() => {
    if (!socket.connected || socket.disconnected) return navigate("/", {replace: true});
    setUserData({});
    socket.emit("user:getroomdata", (room, roompass, nickname) => {
      if (room) {
        setUserData({room, roompass, nickname});
      } else navigate("/");
    });
    socket.removeAllListeners();
  }, []);



  let userRole = localStorage.getItem("userRole");
  console.log(socket)
  const checkIfMafia = () => {
    if (userRole === null) {
      userRole = rolecrate();
    }
    console.log("user role is:", userRole)
    console.log(userData);
    return userRole;

  };

  if (checkIfMafia() == "mafia") { 
    return (
        <div>  Hello Mafia 

        </div>
    );
  }
  else if (checkIfMafia() == "volk") {
    return (
      <div> Hello Volk 
      
      </div>
    );
  }
    return (
     <div> you are something else</div>
    );
  }


export default ChatroomView;
