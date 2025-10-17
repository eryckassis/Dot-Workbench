import "@testing-library/jest-dom";

describe("Integration Test", () => {
  beforeEach(() => {
    document.body.innerHTML = `<button>Seguir</button>
      <button>Seguir</button>
      <output id="x-pos"></output>
      <output id="y-pos"></output>`;
  });
  it("should be initialize all buttons correctly on DOM Load", () => {
    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.click();
      expect(button).toHaveClass("following");
      expect(button.textContent).toBe("Unfollow");
    });
  });
});
