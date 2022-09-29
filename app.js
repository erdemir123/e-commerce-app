const cartIcon = document.querySelector(".fa-cart-arrow-down")
const wholeCartWindow = document.querySelector(".whole-cart-window")
const cart_wrapper = document.querySelector(".cart-wrapper")
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
const card_leng = document.querySelector(".card-length")

const kolay = document.querySelector(".kolay")
const text ="Hayal.com"
let  index = 0 
animate()
function animate(){
    kolay.innerText = text.slice(0,index)
    index++
    if(index>text.length){
        index = 0
    }
    setTimeout(animate,300)
}



wholeCartWindow.inWindow = 0
cartIcon.addEventListener("click",()=>{
    if(wholeCartWindow.classList.toggle("hide")){

    }
})

let cards = JSON.parse(localStorage.getItem("CARD")) || []
card_leng.textContent = cards.length



const renderSavedCard=()=>{
    cards.forEach((card) => {
        createElement(card)
    });
}
renderSavedCard()


addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', (e)=>{
        const card={
            id : new Date().getTime(),
            img :e.target.parentElement.parentElement.previousElementSibling.src,
            name :e.target.parentElement.previousElementSibling.textContent,
            desc : e.target.parentElement.children[0].textContent,
            price : e.target.parentElement.children[1].textContent,
        }
        cards.push(card)
        localStorage.setItem("CARD", JSON.stringify(cards));
        createElement(card)
        ++card_leng.innerHTML
    })
}  )
function createElement(card){
    const {id,img,name,desc,price}=card
    const basketItem = document.createElement("div")
    const basketImg = document.createElement("img")
    const basketName = document.createElement("span")
    const basketdesc = document.createElement("p")
    const basketprice = document.createElement("p")
    const basketclose = document.createElement("div")
    basketItem.classList.add("basketItem")
    basketImg.classList.add("basketImg")
    basketName.classList.add("basketName")
    basketdesc.classList.add("basketdesc")
    basketprice.classList.add("basketprice")
    basketclose.classList.add("basketclose")
    cart_wrapper.appendChild(basketItem)
    basketItem.appendChild(basketImg)
    basketItem.appendChild(basketName)
    basketItem.appendChild(basketprice)
    basketItem.appendChild(basketclose)
    basketItem.appendChild(basketdesc)
    basketItem.id = id
    basketImg.src=img
    basketName.textContent = name
    basketdesc.textContent = desc
    basketprice.textContent = price
    box =price.replace("price:","")
    
}
cart_wrapper.addEventListener("click",(e)=>{
    const id = e.target.parentElement.getAttribute("id")
    if(e.target.classList.contains("basketclose")){
        e.target.parentElement.remove()
        --card_leng.innerHTML
    }
    cards = cards.filter(item=>item.id != id)
        localStorage.setItem("CARD",JSON.stringify(cards))
})