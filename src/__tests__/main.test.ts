import "@testing-library/jest-dom";

jest.mock("../style.css", () => ({}));

import { getAllButtons, handleButtonClick, focusFirstButton } from "../main";

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
      const button = document.querySelector("button")!;
      handleButtonClick.call(button);
      expect(button).toHaveClass("following");
      expect(button.textContent).toBe("Unfollow");
    });
    it("should toggle back to original state", () => {
      document.body.innerHTML = '<button class="following">Unfollow</button>';
      const button = document.querySelector("button")!;
      handleButtonClick.call(button);
      expect(button).not.toHaveClass("following");
      expect(button.textContent).toBe("Seguir");
    });
  });

  describe("focusFirstButton", () => {
    it("should focus first button after tiemout", () => {
      document.body.innerHTML = "<button>Seguir</button>";
      const button = document.querySelector("button")!;
      const focusSpy = jest.spyOn(button, "focus");
      jest.useFakeTimers();
      focusFirstButton();
      jest.advanceTimersByTime(500);
      expect(focusSpy).toHaveBeenCalled();
      jest.useRealTimers();
    });
    it("should not throw error when no button exist", () => {
      jest.useFakeTimers();
      expect(() => {
        focusFirstButton();
        jest.advanceTimersByTime(500);
      }).not.toThrow();
      jest.useRealTimers();
    });
  });
});

describe("Main.ts - Pointer Logic", () => {
  beforeEach(() => {
    document.body.innerHTML = ` <output id="x-pos"></output>
      <output id="y-pos"></output>`;
  });

  it("should update CSS properties and values on pointer move", () => {
    const mockEvent = new PointerEvent("pointermove", {
      clientX: 100,
      clientY: 200,
    });
    document.dispatchEvent(mockEvent);
    expect(document.documentElement.style.getPropertyValue("--x")).toBe(
      "100px"
    );
    expect(document.documentElement.style.getPropertyValue("--y")).toBe(
      "200px"
    );
  });
});
