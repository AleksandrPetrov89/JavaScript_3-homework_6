export function savingCards() {
  const cardsField = document.querySelectorAll(".cards-field");
  for (const field of cardsField) {
    const htmlField = field.innerHTML;
    console.log(htmlField);
  }
}
