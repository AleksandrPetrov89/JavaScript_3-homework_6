export default function taskManagementSystem() {
  const board = document.querySelector(".board");
  board.addEventListener("click", openForm);
}

function openForm(e) {
  if (e.target.classList.contains("column-add-btn")) {
    const btn = e.target;
    btn.classList.add("closed");
    const column = e.target.closest(".column");
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

    const addThisCard = addCard.bind(this, form, column, closeBtn);
    form.addEventListener("submit", addThisCard);

    this.closeThisForm = closeForm.bind(this, form, closeBtn, btn, addThisCard);
    closeBtn.addEventListener("click", this.closeThisForm);
  }
}

function closeForm(form, closeBtn, btn, addThisCard) {
  closeBtn.removeEventListener("click", this.closeThisForm);
  form.removeEventListener("submit", addThisCard);
  form.remove();
  console.log("closeBtn");
  btn.classList.remove("closed");
}

function addCard(form, column, closeBtn, e) {
  console.log("submit");
  e.preventDefault();
  const text = form.querySelector("textarea");
  const cardsField = column.querySelector(".cards-field");
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<p></p>`;
  cardsField.append(card);
  card.querySelector("p").textContent = text.value;
  text.value = "";
  closeBtn.click();
}
