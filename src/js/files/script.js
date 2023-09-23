// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

const blog = document.querySelector('.blog');
const showMoreButton = document.querySelector('.blog__view-more'); // Кнопка "Показати ще"
let itemsToShow = 3; // Початкова кількість товарів для показу

if (blog) {
  loadBlogItems();
  showMoreButton.addEventListener('click', showMoreItems);
}

async function loadBlogItems() {
  const response = await fetch('files/blog.json', {
    method: 'GET'
  });
  if (response.ok) {
    const responseResult = await response.json();
    initBlog(responseResult);
  } else {
    alert('Error!');
  }
}

function initBlog(data) {
  const blogItems = document.querySelector('.blog__items'); // Контейнер для товарів
  blogItems.innerHTML = ''; // Очистити контейнер перед виведенням нових товарів

  for (let index = 0; index < itemsToShow; index++) {
    if (index < data.items.length) {
      const item = data.items[index];
      buildBlogItem(item, blogItems);
    }
  }

  // Перевірка, чи потрібно приховати кнопку "Показати ще"
  if (itemsToShow >= data.items.length) {
    showMoreButton.style.display = 'none'; // Приховати кнопку
  } else {
    showMoreButton.style.display = 'block'; // Показати кнопку
  }
}

function buildBlogItem(item, blogItems) {
  let blogItemTemplate = `<article data-id="${item.id}" class="blog__item item-blog">`;

  if (item.image) {
    blogItemTemplate += `
      <a href="${item.link}" target="_blank" class="item-blog__image-ibg">
        <img src="${item.image}" alt="image">
      </a>`;
  }

  blogItemTemplate += `<div class="item-blog__date"">${item.date}</div>`;

  blogItemTemplate += `
    <h4 class="item-blog__title">
      <a href="${item.link}" target="_blank" class="item-blog__link-title">${item.title}</a>
    </h4>`;

  if (item.text) {
    blogItemTemplate += `
      <div class="item-blog__text text">
        <p>${item.text}</p>
      </div>`;
  }

  if (item.tags) {
    blogItemTemplate += `<div class="item-blog__tags">`;
    for (const tag in item.tags) {
      blogItemTemplate += `<a href="${item.tags[tag]}" target="_blank" class="item-blog__tag">${tag}</a>`;
    }
    blogItemTemplate += `</div>`;
  }

  blogItemTemplate += `</article>`;
  blogItems.insertAdjacentHTML('beforeend', blogItemTemplate);
}


function showMoreItems() {
  itemsToShow += 3; // Додавання 3 товарів при кожному кліку
  loadBlogItems(); // Оновити вміст блогу
}


// const blog = document.querySelector('.blog');
// if (blog) {
//   // Check if .blog element exists
//   loadBlogItems();
// }

// async function loadBlogItems() {
//   const response = await fetch('files/blog.json', {
//     method: 'GET'
//   });
//   if (response.ok) {
//     const responseResult = await response.json();
//     initBlog(responseResult);
//   } else {
//     alert('Error!');
//   }
// }

// function initBlog(data) {
//   const blogItems = document.querySelector('.blog__items'); // Select the container for blog items

//   for (let index = 0; index < 3; index++) {
//     const item = data.items[index];
//     buildBlogItem(item, blogItems);
//   }
// }

// function buildBlogItem(item, blogItems) {
//   let blogItemTemplate = `<article data-id="${item.id}" class="blog__item item-blog">`;

//   if (item.image) {
//     blogItemTemplate += `
//       <a href="${item.link}" target="_blank" class="item-blog__image-ibg">
//         <img src="${item.image}" alt="image">
//       </a>`;
//   }

//   blogItemTemplate += `<div class="item-blog__date"">${item.date}</div>`;

//   blogItemTemplate += `
//     <h4 class="item-blog__title">
//       <a href="${item.link}" target="_blank" class="item-blog__link-title">${item.title}</a>
//     </h4>`;

//   if (item.text) {
//     blogItemTemplate += `
//       <div class="item-blog__text text">
//         <p>${item.text}</p>
//       </div>`;
//   }

//   if (item.tags) {
//     blogItemTemplate += `<div class="item-blog__tags">`;
//     for (const tag in item.tags) {
//       blogItemTemplate += `<a href="${item.tags[tag]}" target="_blank" class="item-blog__tag">${tag}</a>`;
//     }
//     blogItemTemplate += `</div>`;
//   }

//   blogItemTemplate += `</article>`;
//   blogItems.insertAdjacentHTML('beforeend', blogItemTemplate);
// }


// document.addEventListener('click', documentActions);

// function documentActions(e) {
//   const targetElement = e.target;

//   if (targetElement.closest('.blog__view-more')) {
//     e.reventDefault();
//   }
// }