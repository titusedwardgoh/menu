import menuArray from "./data.js"


const orderedItems = []
const orderedItemsEl = document.getElementById("ordered-items")
const menuEl = document.querySelector("#menu")

menuEl.addEventListener("click",(event)=>{
    
    if(event.target.dataset.menuid){
        addItem(event)
        renderOrderedItems()
    }
    console.log(orderedItems)
})

orderedItemsEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-button")) {
        addItem(event);
        renderOrderedItems();
    } else if (event.target.classList.contains("remove-button")) {
        subtractItem(event);
        renderOrderedItems();
    }
});

function addItem(event) {
    let orderedItem = event.target.dataset.menuid
    let existingItem = orderedItems.find((item) => item.id === orderedItem)

    if (existingItem) {
        existingItem.count++
    }
    else {
            orderedItems.push({
                name: menuArray[orderedItem].name,
                price: menuArray[orderedItem].price,
                count:1,
                id: orderedItem
            })
        }
}

function subtractItem(event) {
    let orderedItem = event.target.dataset.menuid;
    let existingItem = orderedItems.find((item) => item.id === orderedItem);

    if (existingItem) {
        existingItem.count--;
        if (existingItem.count <= 0) {
            const index = orderedItems.indexOf(existingItem);
            if (index > -1) {
                orderedItems.splice(index, 1);
            }
        }
    }
}

function render() {

const menu = document.getElementById("menu")
let htmlString = ""

menuArray.forEach((item)=>{
    const {name, ingredients, price, emoji, id} = item
    
    htmlString+= `
     <div class = "menu-item" id = "menu-item-${id}">
        <div class="item-icon">${emoji}</div>
        <div class = "item-desc">
            <div class = "item-title">${name}</div>
            <div class = "item-ingredients">${ingredients.join(", ")}</div>
            <div class = "item-price">$${price}</div>
        </div>
        <button class="item-add" data-menuId = ${id}>+</button>
    </div>
    `
})
    menu.innerHTML=htmlString

}

function renderOrderedItems(){
    let totalPrice = 0
    orderedItems.forEach((item)=>{
        totalPrice += item.price*item.count
    })

    if (orderedItems.length===0 || totalPrice ===0 ){
        orderedItemsEl.classList.add("hidden")
        return
    }

        let htmlString = ``
        
        orderedItems.forEach((item)=>{
            const {name, price, id, count} = item
            htmlString+= `
            <div class = "added-item-container">
                <div class = "added-item ${id}">${name}</div>
                    <div class = "added-item ${id} multiplier">x${count}</div>
                    <div class="button-container">
                        <button class = "remove-button" data-menuId = ${id}>-</button>
                        <button class = "add-button" data-menuId = ${id}>+</button>
                    </div>
                    <div class="total-item-price">$${price*count}</div>
            </div>
                    `
            totalPrice+=price*count
        })

        document.getElementById("your-order").innerHTML=htmlString
        document.querySelector(".total-price").innerHTML=
        `
        <div>Total Price:</div> 
        <div class="total-price-dollars">$${totalPrice}</div>
        `
        orderedItemsEl.classList.remove("hidden")
    }
  





render()
renderOrderedItems()