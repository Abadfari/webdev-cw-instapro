import {
  currentUserId,
  getToken,
  page,
  renderApp,
  setPosts,
  user,
} from "./index.js";
import { dislikePost, getPosts, likePost, getUserPosts } from "./api.js";
import { POSTS_PAGE } from "./routes.js";

export function initLikeListeners() {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      if (!user) {
        alert("Вы не авторизованы");
        return;
      }
      const isLiked = likeButton.dataset.liked === "true" ? true : false;
      const id = likeButton.dataset.postId;
      if (isLiked) {
        dislikePost({ token: getToken(), id }).then(async () => {
          upDatePosts();
        });
      } else {
        likePost({ token: getToken(), id }).then(async () => {
          upDatePosts();
        });
      }
    });
  }
}

async function upDatePosts() {
  let newPosts = [];
  if (page === POSTS_PAGE) {
    newPosts = await getPosts({ token: getToken() });
  } else {
    newPosts = await getUserPosts({ token: getToken(), id: currentUserId });
  }

  setPosts(newPosts);
  renderApp();
}
