import { useContext } from "react";

import { SocketContext, ISocketContext } from "../contexts/SocketContext";

export const useSocket = (): ISocketContext => useContext(SocketContext);
