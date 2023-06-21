import { faker} from "@faker-js/faker";
faker.locale= 'es';

export const generateProduct = () => {

    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnails: [faker.image.imageUrl()],
        code: faker.random.numeric(5),
        stock: faker.random.numeric(2),
        category: faker.commerce.department(),
        status: faker.datatype.boolean()

    }
}