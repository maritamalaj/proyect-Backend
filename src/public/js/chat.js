let socket = io()
let user = ''
let chatbox = document.getElementById('chatbox')
let getUser = fetch('http://127.0.0.1:8080/api/users/current'). //OBTENEMOS EL USER MEDIANTE UN FETCH AL CURRENT , QUE LEE LA COOKIE Y NOS DEVUELVE LA INFO DEL USER
                then(data=>data.json()).
                then(response=>{
                    user = response.email
                    document.getElementById('username').innerHTML = user
                    socket.emit('session',user)
                })
/* let token = document.cookie.split('; ')[1].slice(5) */ //TAMBIEN PODRIAMOS OBTENER EL TOKEN DE LA COOKIE DE ESTA AMNERA Y CONVERTIRLO MEDIANTE libreria https://github.com/auth0/jwt-decode



/* Swal.fire({
    title:'Authentication',
    input: 'text',
    text: 'Set your e-mail',
    inputValidator: value=>{
        return !value.trim() && 'Please. Write an e-mail!'
    },
    allowOutsideClick: false
}).then(result=>{
    user = result.value
    document.getElementById('username').innerHTML = user
    socket.emit('session',user)
}) */

//enviamos mensajes
chatbox.addEventListener('keyup',event=>{
    if(event.key==='Enter'){
        if(chatbox.value.trim().length>0){
            socket.emit('message',{
                user,
                message: chatbox.value
            })
            chatbox.value = ''
        }
    }
})
socket.on('first',data=>{
    const divLog = document.getElementById('messageLogs')
    let messages = ''
    data.forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });
    divLog.innerHTML = messages
    divLog.scrollTo({ left: 0, top: divLog.scrollHeight, behavior: "smooth" });
})
socket.on('logs',data=>{
    const divLog = document.getElementById('messageLogs')
    let messages = ''
    data.forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });
    divLog.innerHTML = messages
    divLog.scrollTo({ left: 0, top: divLog.scrollHeight, behavior: "smooth" });
})