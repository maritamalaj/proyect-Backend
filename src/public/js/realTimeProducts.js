const boton = document.getElementById('boton')
const table = document.getElementById('productsTable')
const socket = io() 
socket.on('connect', () =>{
    console.log(socket.id);
})
socket.on('msg_back', console.log)
socket.on('track', ()=>{console.log('Hola');})
socket.on('updatedProducts', data => {
    table.innerHTML = 
        `<tr>
            <td><strong>Producto</strong></td>
            <td><strong>Descripción</strong></td>
            <td><strong>Precio</strong></td>
            <td><strong>Código</strong></td>
            <td><strong>Stock</strong></td>
            <td><strong>Categoría</strong></td>
        </tr>`;
        for (product of data) {
            let tr = document.createElement('tr')
            tr.innerHTML=
                        `   <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                            <td>${product.category}</td>
                        `;
            table.getElementsByTagName('tbody')[0].appendChild(tr);
        }
           
} )

boton.addEventListener('click', () =>{
    const name = socket.id
    socket.emit('msg_front','Enviado desde el front, ID: '+name)
})


/* socket.on('msg_individual', console.log)
socket.on('msg_resto', console.log)
socket.on('msg_all', console.log) */