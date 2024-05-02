import { renderHeaderComponent } from "./header-component.js";
import { posts } from "../index.js";
import { initLikeListeners } from "../like-post.js";

// import { format } from 'date-fns';

export function renderUserPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  const postsHTML = posts
    .map((post) => {
      // const createDate = format(new Date(post.created_at), 'dd/MM/yyyy hh:mm');
      return `<li class="post">
    
    <div class="post-image-container">
      <img class="post-image" src="${post.imageUrl}">
    </div>
    <div class="post-likes">
    <button data-post-id="${post.id}" class="like-button" data-liked="${post.isLiked}">
    <img src="./assets/images/like-${post.isLiked ? "" : "not-"}active.svg">
  </button>
      <p class="post-likes-text">
        Нравится: <strong>${post.likes.length}</strong>
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${post.user.name}</span>
      ${post.description}
    </p>
    <p class="post-date">
      ${post.createdAt}
    </p>
  </li>`;
    })
    .join("");
  console.log(postsHTML);
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="post-header">
                ${
                  posts.length
                    ? `<img src="${posts?.[0]?.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${posts?.[0]?.user.name}</p>`
                    : "<div>У пользователя нет постов</div>"
                }
                
        </div>
                <ul class="posts">
                 ${postsHTML || "Постов нет"}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  initLikeListeners();

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}
