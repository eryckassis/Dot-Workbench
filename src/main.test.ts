import "@testing-library/jest-dom";

jest.mock("../style.css", () => ({}));

import { getAllButtons, handleButtonClick, focusFirstButton } from "./main";

describe("Main.ts - Button Logic", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("getAllButtons", () => {
    it("should return empty array when no buttons exist", () => {
      const buttons = getAllButtons();
      expect(buttons).toEqual([]);
    });

    it("should return all buttons in the document", () => {
      document.body.innerHTML = ` <button>Seguir</button>
        <button>Seguir</button>
        <div>Not a button</div>`;

      const buttons = getAllButtons();
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("handleButtonClick", () => {
    it("should toggle following class and text", () => {
      document.body.innerHTML = "<button>Seguir</button>";
      const button = document.querySelector("button");
      handleButtonClick.call(button);
      expect(button).toHaveClass("following");
      expect(button.textContent).toBe("Unfollow");
    });
  });
});
