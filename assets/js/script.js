/*
Learn Debounce And Throttle : https://www.youtube.com/watch?v=cjIswDCKgu0
Search filter : https://www.youtube.com/watch?v=TlP5WIxVirU
*/

const searchbar = document.querySelector('[data-searchbar]')
const productCount = document.querySelector('[data-product-count]')
const productContainer = document.querySelector('.product-container')
const productCardTemplate = document.querySelector('[data-product-card-template]')
const productDatabaseURL = 'https://fakestoreapi.com/products'
let matchedProductArray = []

function debounce(callback, delay = 1000){
    let timeout
    return (...args)=>{
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}

const showSingleProductCard = (productInfo)=>{
    const productCardElement = productCardTemplate.content.cloneNode(true).children[0]
    const productCardImage = productCardElement.querySelector('[data-product-card-image]')
    const productCardCategory = productCardElement.querySelector('[data-product-card-category]')
    const productCardTitle = productCardElement.querySelector('[data-product-card-title]')
    const productCardDescription = productCardElement.querySelector('[data-product-card-description]')

    const createShortDescription = (description)=>{
        let shortDescription = description
        if(description.length > 200) shortDescription = description.slice(0, 201) + '...'
        return shortDescription
    }

    productCardImage.src = productInfo.image
    productCardCategory.textContent = productInfo.category
    productCardTitle.textContent = productInfo.title
    productCardDescription.textContent = createShortDescription(productInfo.description)

    productContainer.append(productCardElement)
}

fetch(productDatabaseURL)
.then((res)=> res.json())
.then((data)=>{
    matchedProductArray = data.map((product)=>{
        return {image: product.image, category: product.category, title: product.title, description: product.description}
    })
    matchedProductArray.map((matchedProductItem)=>{
        showSingleProductCard(matchedProductItem)
    })
    productCount.textContent = matchedProductArray.length
})

const searchedMatchedProduct = debounce((searchedValue)=>{
    matchedProductArray = []
    productContainer.innerHTML = ''
    
    fetch(productDatabaseURL)
    .then((res)=> res.json())
    .then((data)=>{
        data.map((product)=>{
            if(product.category.toLowerCase().includes(searchedValue)){
                matchedProductArray.push({image: product.image, category: product.category, title: product.title, description: product.description})
            }else{
                return false
            }
        })
        productCount.textContent = matchedProductArray.length
        matchedProductArray.map((matchedProductItem)=>{
            showSingleProductCard(matchedProductItem)
        })
    })
})

searchbar.addEventListener('input', (e)=>{
    let searchedValue = e.target.value.toLowerCase()
    searchedMatchedProduct(searchedValue)
})