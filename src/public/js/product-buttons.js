const botones = document.getElementsByName('addToCart')
 botones.forEach(boton => {
     boton.addEventListener('click',async ()=>{
         await fetch(`/api/carts/63ceae26991165afcfd1cb36/products/${boton.id}`, {
             method: 'POST',
         }).then(result => console.log(result))
     })
 })