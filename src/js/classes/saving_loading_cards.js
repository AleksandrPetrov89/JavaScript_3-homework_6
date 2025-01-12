// Функция, которая сохраняет состояние карточек на доске
export function savingCards() {
  const cardsField = document.querySelectorAll(".cards-field");
  let i = 0;
  for (const field of cardsField) {
    const htmlField = field.innerHTML;
    localStorage.setItem(`field ` + i, htmlField);
    i += 1;
  }
}

// Функция, которая расставляет карточки после загрузки страницы
export function loadingCards() {
  const cardsField = document.querySelectorAll(".cards-field");
  let i = 0;
  for (const field of cardsField) {
    const htmlField = localStorage.getItem(`field ` + i);
    field.innerHTML = htmlField;
    i += 1;
  }
}
