
const socket = io()

/* 

const render = (data)=> {
  const html = data.map(elem =>{
    return (
      `
        <div>
          <strong>${elem.author}</strong> dice <em>${elem.text}</em>
        </div>
      `
    )
  }).join(' ')

  document.getElementById('caja').innerHTML = html
} */


const addMessage = ()=> {
  const msg = {
    author: document.getElementById('name').value,
    text: document.getElementById('text').value
  }
  socket.emit('new-message', msg)
  return false
}

socket.on('products-update', (data)=> {
  console.log(data)
  //render(data)
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
