import MoveCard from "./classes/move_card";
import { savingCards, loadingCards } from "./classes/saving_loading_cards";

export default function taskManagementSystem() {
  loadingCards();

  const board = document.querySelector(".board");
  board.addEventListener("click", openForm);

  const moveCard = new MoveCard(board);
  moveCard.start();
}

// Открывает форму для создания новой карточки и удаляет карточки
function openForm(e) {
  if (e.target.classList.contains("column-add-btn")) {
    const btn = e.target;
    btn.classList.add("closed");
    const column = e.target.closest(".column");
    const cardsField = column.querySelector(".cards-field");
    cardsField.classList.add("form-open");
    const form = document.createElement("form");
    form.classList.add("form-adding-card");
    form.innerHTML = `
      <textarea placeholder="Введите название для этой карточки" required class="form-adding-card text"></textarea>
      <div class="form-adding-card buttons">
        <button type="submit" class="form-adding-card add-button">Добавить карточку</button>
        <button type="button" class="form-adding-card close-button">&#x2716</button>
      </div>
      `;
    column.append(form);

    const closeBtn = form.querySelector(".close-button");

    const addThisCard = addCard.bind(this, form, closeBtn, cardsField);
    form.addEventListener("submit", addThisCard);

    this.closeThisForm = closeForm.bind(
      this,
      form,
      closeBtn,
      btn,
      addThisCard,
      cardsField,
    );
    closeBtn.addEventListener("click", this.closeThisForm);
  }
  //Удаляет карточку и сохраняет состояние в localStorage
  if (e.target.classList.contains("card-close-btn")) {
    e.target.closest(".card").remove();
    savingCards();
  }
}

// Закрывает форму создания карточки
function closeForm(form, closeBtn, btn, addThisCard, cardsField) {
  closeBtn.removeEventListener("click", this.closeThisForm);
  form.removeEventListener("submit", addThisCard);
  form.remove();
  cardsField.classList.remove("form-open");
  btn.classList.remove("closed");
}

// Создает новую карточку
function addCard(form, closeBtn, cardsField, e) {
  e.preventDefault();
  const text = form.querySelector("textarea");
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<p class="card-text"></p><button type="button" class="card-close-btn">&#x2716</button>`;
  cardsField.append(card);
  card.querySelector("p").textContent = text.value;
  text.value = "";
  closeBtn.click();

  // Сохраняет состояние в localStorage
  savingCards();
}
