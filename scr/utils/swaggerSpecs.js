import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            description: "A simple CRUD API application made with Express and documented with Swagger"
        }
    },
    //apis: [path.join(__dirname, '../docs/**/*.yaml')]
    apis: ['../docs/**/*.yaml']
}

const swaggerSpecs = swaggerJsdoc(options)

export { swaggerSpecs }