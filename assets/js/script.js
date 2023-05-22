/*
Learn Debounce And Throttle : https://www.youtube.com/watch?v=cjIswDCKgu0
Search filter : https://www.youtube.com/watch?v=TlP5WIxVirU
*/

const productContainer = document.querySelector('.product-container')
const productCardTemplate = document.querySelector('[data-product-card-template]')
const apiURL = 'https://fakestoreapi.com/products'

fetch(apiURL)
.then((res)=> res.json())
.then((data)=>{
    data.map((product)=>{
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

        productCardImage.src = product.image
        productCardCategory.textContent = product.category
        productCardTitle.textContent = product.title
        productCardDescription.textContent = createShortDescription(product.description)

        productContainer.append(productCardElement)
    })
});