export const generateProductErrorInfo = product =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorios:
    -title: Must be a String(${product.title})
    -description: Must be a String(${product.description})
    -price: Must be numeric(${product.price})
    -thumbnails: Must be an array of String(${product.thumbnails})
    -code: Must be numeric(${product.code})
    -stock: Must be Number(${product.stock})
    -category: Must be a String(${product.category})
    -status: Must be a Boolean(${product.status})     
    `
}
export const generateCodeErrorInfo = product =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    No se puede crear otro product con igual code number:
    -code: Already exists code number:(${product.code}) 
    `
}

export const generateCartErrorInfo = cart =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorios:
    -products: Must be an Array of Products ID(${cart.products})  
    `
}

export const generateUserErrorInfo = user =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorios:
    -first_name: Must be a String(${user.first_name})
    -last_name: Must be a String(${user.last_name})
    -email: Must be a String(${user.email})
    -role: Must be a String(${user.role})
    -password: Must be String(${user.password})
    -age: Must be a Number(${user.age})   
    `
}