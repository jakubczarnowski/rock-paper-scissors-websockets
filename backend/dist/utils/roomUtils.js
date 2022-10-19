"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRoomForSocket = exports.filterRooms = void 0;
const filterRooms = (gameRoom, roomId, callback) => {
    const result = gameRoom.roomId !== roomId;
    if (!result)
        callback();
    return result;
};
exports.filterRooms = filterRooms;
const findRoomForSocket = (gameRooms, socketId) => {
    const foundRoom = gameRooms.find((x) => x.hostId === socketId || x.opponentId === socketId);
    return foundRoom;
};
exports.findRoomForSocket = findRoomForSocket;
