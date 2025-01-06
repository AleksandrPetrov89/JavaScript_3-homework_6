// Класс, который управляет перемещением карточек
export default class MoveCard {
  constructor(board) {
    this.board = board;
    this.underElem = { underElem: null, higherOrLower: null, changed: null };
  }

  // запускает работу класса, ловит события "mousedown"
  start() {
    this.takeCard = this.#takeCard.bind(this);
    this.board.addEventListener("mousedown", this.takeCard);
  }

  // Метод, управляющий поведением карточки при нажатии на нее мышкой.
  // "Вырывает" карточку со своего места, запоминает, где она была
  // и ловит события движения мыши "mousemove" и "mouseup"
  #takeCard(e) {
    if (e.target.classList.contains("card")) {
      e.preventDefault();
      this.activCard = e.target;

      this.possiblePlace = this.activCard.cloneNode(true); // Для выделения места под карточку
      this.possiblePlace.classList.add("possible-place");

      const cardСoordinates = this.activCard.getBoundingClientRect();
      this.offsetY = e.clientY - cardСoordinates.y;
      this.offsetX = e.clientX - cardСoordinates.x;
      this.activCard.style.width = getComputedStyle(e.target).width;
      this.activCard.style.height = getComputedStyle(e.target).height;
      this.activCard.classList.add("dragged");

      this.oldPosition = document.createElement("div");
      this.oldPosition.classList.add("old-position");

      this.activCard = e.target
        .closest(".cards-field")
        .replaceChild(this.oldPosition, e.target);
      document.querySelector("body").append(this.activCard);

      // Чтобы спозиционировать карточку
      this.#mouseMove(e);

      this.mouseMove = this.#mouseMove.bind(this);
      document.addEventListener("mousemove", this.mouseMove);

      this.mouseUp = this.#mouseUp.bind(this);
      document.addEventListener("mouseup", this.mouseUp);
    }
  }

  // Метод, отвечающий за перемещение карточки
  #mouseMove(e) {
    this.activCard.style.top = e.clientY - this.offsetY + "px";
    this.activCard.style.left = e.clientX - this.offsetX + "px";

    this.#underElem(e);
    //Чтобы не выделять место под карточку в одном и том же месте
    if (this.underElem.changed) {
      this.#preInsertion();
    }
  }

  // Метод, отвечающий за окончательное местоположение карточки,
  // удаление обработчиков событий и вспомогательных html-узлов
  #mouseUp(e) {
    this.#underElem(e);
    this.#preInsertion();

    this.possiblePlace.replaceWith(this.activCard);
    this.oldPosition.remove();

    this.activCard.classList.remove("dragged");
    this.activCard.style.width = "";
    this.activCard.style.height = "";
    this.activCard.style.top = "0px";
    this.activCard.style.left = "0px";

    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
  }

  // Метод, определяющий над каким узлом сейчас курсор мыши (над карточкой, колонкой или вне доски)
  // и в вверхней половине узла или в нижней, и изменилось ли это с прошлого движения мыши
  #underElem(e) {
    this.activCard.style.pointerEvents = "none";
    const targetElem = document.elementFromPoint(e.clientX, e.clientY);
    this.activCard.style.pointerEvents = "auto";

    let underElem, higherOrLower;
    if (targetElem.classList.contains("card")) {
      underElem = targetElem;
    } else if (targetElem.closest(".column")) {
      underElem = targetElem.closest(".column");
    } else {
      underElem = null;
    }

    if (underElem) {
      const elemCoor = underElem.getBoundingClientRect();
      const middleUnderElem = elemCoor.y + elemCoor.height / 2;
      if (middleUnderElem > e.clientY) {
        higherOrLower = true;
      } else higherOrLower = false;
    }

    if (
      this.underElem.underElem === underElem &&
      this.underElem.higherOrLower === higherOrLower
    ) {
      this.underElem.changed = false;
    } else {
      this.underElem.underElem = underElem;
      this.underElem.higherOrLower = higherOrLower;
      this.underElem.changed = true;
    }
  }

  // Метод, который предварительно размещает карточку/выделяет место под нее
  #preInsertion() {
    if (this.underElem.underElem === null) {
      this.oldPosition.after(this.possiblePlace);
    } else if (this.underElem.underElem.classList.contains("card")) {
      if (this.underElem.higherOrLower) {
        this.underElem.underElem.before(this.possiblePlace);
      } else {
        this.underElem.underElem.after(this.possiblePlace);
      }
    } else if (this.underElem.underElem.classList.contains("column")) {
      const cardsField = this.underElem.underElem.querySelector(".cards-field");
      if (this.underElem.higherOrLower) {
        cardsField.prepend(this.possiblePlace);
      } else {
        cardsField.append(this.possiblePlace);
      }
    } else {
      throw new Error("Ошибка при вставке карточки!");
    }
  }
}
