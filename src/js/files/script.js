// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

const addBlogCart = function () {
  const blog = document.querySelector('.blog');
  const showMoreButton = document.querySelector('.blog__view-more');
  let itemsToShow = 3;

  if (blog) {
    loadBlogItems();
    showMoreButton.addEventListener('click', showMoreItems);
  }

  async function loadBlogItems() {
    try {
      const response = await fetch('files/blog.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      initBlog(data);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  function initBlog(data) {
    const blogItems = document.querySelector('.blog__items');
    blogItems.innerHTML = '';

    data.items.slice(0, itemsToShow).forEach((item) => {
      buildBlogItem(item, blogItems);
    });

    // Затримка перед появою кнопки "View More" на 1 секунду
    setTimeout(() => {
      showMoreButton.style.display =
        itemsToShow < data.items.length ? 'block' : 'none';
    }, 3000);

    showMoreButton.addEventListener('click', () => {
      showMoreButton.style.display = 'none'; // Після кліка ховаю кнопку

      // Використовую setTimeout для затримки відновлення видимості кнопки
      setTimeout(() => {
        loadBlogItems();
        showMoreButton.style.display =
          itemsToShow < data.items.length ? 'block' : 'none';
      }, 3000);
    });
  }

  function buildBlogItem(item, blogItems) {
    const blogItemTemplate = `<article data-id="${
      item.id
    }" class="blog__item item-blog">
    ${
      item.image
        ? `
      <a href="${item.link}" target="_blank" class="item-blog__image-ibg">
        <img src="${item.image}" alt="image">
      </a>`
        : ''
    }
    <div class="item-blog__date">${item.date}</div>
    <h4 class="item-blog__title">
      <a href="${item.link}" target="_blank" class="item-blog__link-title">${
        item.title
      }</a>
    </h4>
    ${
      item.text
        ? `
      <div class="item-blog__text text">
        <p>${item.text}</p>
      </div>`
        : ''
    }
    ${
      item.tags
        ? `<div class="item-blog__tags">
      ${Object.entries(item.tags)
        .map(
          ([tag, url]) =>
            `<a href="${url}" target="_blank" class="item-blog__tag">${tag}</a>`
        )
        .join('')}
    </div>`
        : ''
    }
  </article>`;

    blogItems.insertAdjacentHTML('beforeend', blogItemTemplate);
  }

  function showMoreItems() {
    itemsToShow += 3;
    loadBlogItems();
  }
};
addBlogCart();
