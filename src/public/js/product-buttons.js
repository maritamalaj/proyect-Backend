const cartId = document.getElementById('user_cart')?.getAttribute("cartid");

const botones = document.getElementsByName('addToCart')
botones.forEach(boton => {
    boton.addEventListener('click',async ()=>{
        await fetch(`/api/carts/${cartId}/products/${boton.id}`, {
            method: 'POST',

        }).then(result => {
            console.log(result)
            if(result.status == 401) window.location.replace("/views/login")
            else document.location.reload()})
    })
})

const eliminar = document.getElementsByName('removeFromCart')
eliminar.forEach(boton => {
    boton.addEventListener('click',async ()=>{
        await fetch(`/api/carts/${cartId}/products/${boton.id}`, {
            method: 'DELETE',
        }).then(result => console.log(result), document.location.reload())
    })
})
const purchaseButton = document.getElementById('purchaseCart')
if (purchaseButton) {
    purchaseButton.addEventListener('click',async ()=>{
        await fetch(`/api/carts/${cartId}/purchase`, {
            method: 'POST',
        }).then(result => result.json())
        .then(data => {
            console.log(data);
            let carrito = document.getElementById('carrito')
            if(data.status == 'error'){
                carrito.innerHTML = `
                <p style='color:red'>Status: <strong>${data.status}</strong></p>
                <p>Mensaje: <strong>${data.error}</strong></p>
                
                `
            } else {
            carrito.innerHTML = `
            <p class='display-6'>Su transacción se ha realizado satisfactoriamente:</p>
            <div class='lead'>
                <p>Status: <strong>${data.status}</strong></p>
                <p>TxID: <strong>${data.ticket.code}</strong></p>
                <p>Fecha y hora: <strong>${data.ticket.purchase_datetime}</strong></p>
                <p>Monto Total: <strong>$ ${data.ticket.amount}.-</strong></p>
                <p>Comprador: <strong>${data.ticket.purchaser}.-</strong></p>
                <p>Productos: </p>
            </div>
            `
            data.ticket.products.forEach(product => {
                carrito.innerHTML += `
                <p style='transform:scale(0.90)'>- id: <strong> ${product.product}.-</strong></p>
                <p style='transform:scale(0.90)'>- Cantidad: <strong> ${product.quantity}.-</strong></p>
                `
            })
            if(data.messages){
                carrito.innerHTML += `
                <p style='color:red'>Advertencia: <strong>${data.messages.alert}</strong></p>
                
                `
                data.messages.outOfStock.forEach(product=>{
                    carrito.innerHTML += `  <p style='transform:scale(0.90)'>- id: <strong> ${product}.-</strong></p>`
                })
            }
            }
        })
    })    
}