import { useContext } from "react";
import { SocketContext, SocketContextType } from "../contexts/SocketContext";

export const useSocket = (): SocketContextType => useContext(SocketContext);
