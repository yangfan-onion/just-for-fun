var size = 123;
class Rkill {
    constructor() {
        this.size = size;
        this.player = [];
        this.gameStatus = false;
        this.gameID = ['村民','狼人']
    }
    createPlayer(socket) {
        let playerCount = this.player.length;
        if (playerCount > 2) return false;

        let player = {
            socket,
            playerCount:playerCount
        }
        this.player.push(player);
        socket.player = player;

        return true;
    }
    leaveGame(socket){
       
    }
    createPlayerID(socket){
        let ID = {
            socket,
            gameID: this.gameID.pop()
        }
        socket.player = ID;
    }
}
module.exports = Rkill;