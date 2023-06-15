export default class UserDTO{
    constructor(user){
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.age = user.age
        this.email = user.email
        this.role = user.role
        this.password = user.password
        this.cart = user.cart
    }

    current = ()=>{
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            age: this.age,
            email: this.email,
            role: this.role,
        }
    }
}