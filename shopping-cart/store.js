import items from "./items.json";
import formatPrice from "./util/formatPrice";

const itemTemplate = document.querySelector(".item-template");
const itemsContainer = document.querySelector("[data-items-container]");

export function renderItemsInContainer() {
  if (!itemTemplate) return;
  items.forEach((item) => {
    const templateClone = itemTemplate.content.cloneNode(true);
    const id = templateClone.querySelector("[data-item-id]");
    id.dataset.itemId = item.id;
    const img = templateClone.querySelector("[data-item-img]");
    img.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;
    const itemName = templateClone.querySelector("[data-item-name]");
    itemName.textContent = item.itemName;
    const category = templateClone.querySelector("[data-item-category]");
    category.textContent = item.category;
    const price = templateClone.querySelector("[data-item-price]");

    price.textContent = formatPrice(item.priceCents);
    itemsContainer.appendChild(templateClone);
  });
}
