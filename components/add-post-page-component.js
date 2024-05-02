import { escapeHTML } from "../helpers.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
      <div class="upload-image-container"></div>
      <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
            </label>
      <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.querySelector(".textarea").value;
      if (!imageUrl) {
        alert("Загрузите картинку");
        return;
      }
      if (!description) {
        alert("Добавьте описание");
        return;
      }
      onAddPostClick({
        description: escapeHTML(description),
        imageUrl,
      });
    });
  };

  render();
}
