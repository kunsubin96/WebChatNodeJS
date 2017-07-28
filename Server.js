var express=require("express");
var app=express();
app.use(express.static("public"));//mọi yêu cầu của người dùng chi dc truy cập tìm trong thư mục public

app.set("view engine","ejs");
app.set("views","./views");

var server=require("http").Server(app);

var io=require("socket.io")(server);
server.listen(process.env.PORT || 8000);

var mangUser=[];

io.on("connection",function(socket){
	console.log("Co nguoi ket noi: ",socket.id);

	socket.on("create-user",function(data){
		if(mangUser.indexOf(data)>=0){
			//fail
			socket.emit("server-send-dk-thatbai");
		}else{
			//success
			mangUser.push(data);
			socket.Username=data;
			socket.emit("server-send-dk-thanhcong",data);
			console.log(socket.id+" Dang ky thanh cong!");
			//phat danh dach user trong mang cho tat ca moi nguoi thay
			//io.sockets.emit("server-send-danhsach-Users",mangUser);
			//trả về ds rooms
			var mang=[];

			for (r in socket.adapter.rooms) {
				mang.push(r);
			}
			io.sockets.emit("server-send-rooms",mang);

		}
	});

	socket.on("join-room",function(data){
		socket.join(data);
		socket.Phong=data;

		//trả về ds rooms
		var mang=[];

		for (r in socket.adapter.rooms) {
			mang.push(r);
		}
		io.sockets.emit("server-send-rooms",mang);
		socket.emit("server-send-room-socket",data);
	});

	socket.on("chuyen-phong",function(data){
		socket.join(data);
		socket.Phong=data;
		socket.emit("server-chuyen-phong",data);
	});

	socket.on("send-message-client",function(data){
		io.sockets.in(socket.Phong).emit("server-chat",{un:socket.Username,nd:data});
	});

});



app.get("/",function(req,res){
	res.render("trangchu");
});
