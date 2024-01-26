
const socket = io()

const render = (data)=> {
  const html = data.map(elem =>{
    return (
      `
            <div class="col">
                <div class="card" id=111>
                    <img src="..." class="card-img-top" alt="...">
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
} 


const addMessage = ()=> {
  const msg = {
    author: document.getElementById('name').value,
    text: document.getElementById('text').value
  }
  socket.emit('new-message', msg)
  return false
}

socket.on('products-update', (data)=> {
  console.log('products-update')
  render(data)
  let chat = document.getElementById('lista')
  chat.scrollTop = chat.scrollHeight
})

const addProduct = () =>{
  console.log("addProduct")
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
