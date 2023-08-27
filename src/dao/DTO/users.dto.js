export default class UserDTO{
    constructor(user){
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.age = user.age
        this.email = user.email
        this.role = user.role
        this.password = user.password
        this.cart = user.cart
        this.documents = user.documents
        this.last_connection = user.last_connection
    }
   
    getAll = ()=>{
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role: this.role,
        }
    }

    current = ()=>{
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            age: this.age,
            email: this.email,
            role: this.role,
            last_connection: this.last_connection
        
        }
    }
}