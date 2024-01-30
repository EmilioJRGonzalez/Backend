
const socket = io()

socket.on('products-update', (data)=> {

  const html = data.map(elem =>{
    return (
      `
            <div class="col">
                <div class="card" id=111>
                    <img src=${elem.thumbnail} class="card-img-top" alt="..." width="100" height="100">
                    <div class="card-body">
                        <h5 class="card-title">${elem.title}</h5>
                        <p class="card-text">${elem.description}</p>
                        <p class="card-text">$ ${elem.price}</p>
                    </div>
                </div>
            </div>
      `)
    }).join(' ')
    document.getElementById('lista').innerHTML = html
    let chat = document.getElementById('lista')
    chat.scrollTop = chat.scrollHeight
    
})

const addProduct = () =>{
  let product = {
    title : document.getElementById('title').value,
    description : document.getElementById('description').value,
    price : document.getElementById('price').value,
    code : document.getElementById('code').value,
    stock : document.getElementById('stock').value,
    category : document.getElementById('category').value,
    thumbnail : document.getElementById('thumbnail').value
  }

  socket.emit('product-add', product)
  return false
}
