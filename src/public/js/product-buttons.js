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