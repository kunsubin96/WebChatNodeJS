var socket=io("https://anhkydemowebchatnodejs.herokuapp.com/");

socket.on("server-send-dk-thatbai",function(){
	alert("Trung UserName (Co nguoi da dang ky rui!!!)");
});
socket.on("server-send-dk-thanhcong",function(data){
	$("#lbUser").html("Name: "+data);
	$("#form1").hide(2000);
	$("#form2").show(1000);
});

socket.on("server-send-rooms",function(data){
	$("#dsRoom").html("");
	//duyệt từng phần tử trong mảng
	data.map(function(r){
		$("#dsRoom").append($("<li></li>").text(r));
		//$("#dsRoom").append("");
		//$("#dsRoom").append("<li class='left clearfix'><div class='chat-body clearfix'><div class='header_sec'><strong class='primary-font'>"+r+"</strong></div></div></li>");
	});
	$("#dsRoom li").on("click", function(){
 		 //alert($(this).text());
 		 socket.emit("chuyen-phong",$(this).text());

 	});
});

socket.on("server-send-room-socket",function(data){
	$("#lbRoom").html("Room: "+data);
});

socket.on("server-chuyen-phong",function(data){
	$("#lbRoom").html("Room: "+data);
	$("#listMessage").html("");

});

socket.on("server-chat",function(data){
	var bo="<li class='left clearfix'>"+data.un+": "+data.nd+"</li>"
	$("#listMessage").append(bo);
	//$("#listMessage").append($("<li class='left clearfix'><p class='userName'>"+data.un+": "+"</p><p>"+data.nd+"</p></li>");
});

$(document).ready(function(){
	$("#form1").show();
	$("#form2").hide();	
	$("#btnRegister").click(function(){
		if($.trim($("#txtRegister").val())==''){
			alert("Nhập tên vào!");
		}else{
			socket.emit("create-user",$.trim($("#txtRegister").val()));
		}
		
	});
	$("#btnAdd").click(function(){
		if($.trim($("#txtRoom").val())==''){
			alert("Nhập tên room vào!");
		}else{
			socket.emit("join-room",$.trim($("#txtRoom").val()));
		}
		
	});
	$("#btnSend").click(function(){
		if($.trim($("#txtMessage").val())==''){
			alert("Chưa có nội dung!");
		}else{
			socket.emit("send-message-client",$.trim($("#txtMessage").val()));
		}
		
	});
	
});