var server = require('http').createServer();
var io = require('socket.io')(server); //引入socket.io
var Rkill = require('../lib/kill');
var crypto = require('crypto');
var moment = require('moment');


server.listen(3000, '127.0.0.1');
console.log('Open client/index.html with broswer for chat!')

var rkill = new Rkill();
var groups = {};
var users = {};

io.on('connection', function (socket) {
    io.emit('after-connection', { groups: groups });

    socket.on('login', function (data) {
        var userName = data.user_name;
        var groupName = data.group_name;

        var userId = crypto.createHash('md5').update(userName).digest('hex');
        var groupId = crypto.createHash('md5').update(groupName).digest('hex');

        // if(users[userId]){
        //     sendP2PMessage(socket, 'login-reply', {'is_success': true, 'msg': 'User name exist!'})
        //     return false;
        // }

        users[userId] = {
            socket_id: socket.id,
            id: userId,
            name: userName,
            group_id: groupId,
            login_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        socket.join(groupId);

        sendP2PMessage(socket, 'login-reply', {'is_success': true, 'msg': 'Have Fun!', 'users': users})
        broadcaseMessage(io, groupId, 'login-notify', {'is_success': true, 'users': users});
    });

    socket.on('create-group', function(){
        createGroup(data.group_name);

        broadcaseMessage(socket, 'create-group-notify', groups);
    });

    socket.on('logout', function (data) {
        var userName = data.user_name;
        var userId = crypto.createHash('md5').update(userName).digest('hex');

        delete users[userId];

        broadcaseMessage(socket, 'logout-group-notify', users);
    });

    socket.on('send-msg', function (data) {
        console.log(data)
        if(data.to){
            var toUserId = crypto.createHash('md5').update(data.to).digest('hex');
            var socketId = users[toUserId].socket_id;

            io.to(`${socketId}`).emit('p2p-msg-notify', {'is_success': true, 'from': data.from, 'msg': data.msg});
            sendP2PMessage(socket, 'p2p-msg-notify', {'is_success': true, 'from': data.from, 'msg': data.msg});
        }else{
            var fromUserId = crypto.createHash('md5').update(data.from).digest('hex');
            var groupId = users[fromUserId].group_id;

            broadcaseMessage(io, groupId, 'broadcast-msg-notify', {'is_success': true, 'from': data.from, 'msg': data.msg});
        }
    });
});



function createGroup(groupName){
    var groupId = crypto.createHash('md5').update(groupName).digest('hex');

    if(groups[groupId]){
        sendP2PMessage(socket, {'is_success': false, 'msg': 'Group name exist!'})
    }

    groups[groupId] = {
        id: groupId,
        name: groupName,
        create_date: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    return groups;
}

createGroup('Sample Group');

function sendP2PMessage(socket, event, data){
    socket.emit(event, data);
}

function broadcaseMessage(io, groupId, event, data){
    io.to(groupId).emit(event, data);
}