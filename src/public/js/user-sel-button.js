const boton = document.getElementById('userSelector')
const selector = document.getElementById('users')

boton.addEventListener('click',async (e)=>{
    e.preventDefault()
    window.location.replace(`/views/usermanager/${selector.value}`); 
})