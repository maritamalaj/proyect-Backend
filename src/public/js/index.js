const socket = io (); //intancia y guardar la const socket, somo clientes, representa una vista
socket.emit ('message', '¡Hola, me estoy comunicando desde websocket!')

socket.on ('evento para socket individual', data=>{
    console.log (data);

}) ;

socket.on ('evento _para_todos_menos _el_socket_actual', data=>{
    console.log (data);
});

socket.om ('evento_para_todos', data =>{
    console.log(data);
})