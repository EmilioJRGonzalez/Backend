const insertProductErrorInfo = (body) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        -> title: type String, recibido: ${body.title}
        -> description: type String, recibido: ${body.description}
        -> price: type Number, recibido: ${body.price}
        -> thumbnail: type Array, recibido: ${body.thumbnail}
        -> code: type String, recibido: ${body.code}
        -> category: type enum: ['Categoria 1', 'Categoria 2', 'Categoria 3'], recibido: ${body.category}
`;
}

module.exports = {
    insertProductErrorInfo
}