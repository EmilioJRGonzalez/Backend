import { faker } from '@faker-js/faker/locale/es'

const generateProducts = () => {
    let max = 100
    let products = [];
    for (let i = 0; i < max; i++) {
        products.push(getProduct());
    }
    return {
        products: products
    };
};

const getProduct = () => {

    const arrCategory = ['Categoria 1', 'Categoria 2', 'Categoria 3']

    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.string.alphanumeric(6),
        stock: faker.number.int({min: 0, max: 50}),        
        status: true,
        category: faker.helpers.arrayElement(arrCategory),
        owner: 'admin'
    }
};

export { generateProducts, getProduct }