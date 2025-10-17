import "@testing-library/jest-dom";

// Mock CSS
jest.mock("../style.css", () => ({}));

describe("Integration Test", () => {
  beforeEach(() => {
    // Limpar DOM
    document.body.innerHTML = "";

    // Simular HTML
    document.body.innerHTML = `
      <button>Seguir</button>
      <button>Seguir</button>
      <output id="x-pos"></output>
      <output id="y-pos"></output>
    `;
  });

  it("should initialize buttons correctly", () => {
    // Importar dinamicamente para evitar problemas de módulo
    require("../main");

    // Simular DOMContentLoaded
    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.click();
      expect(button).toHaveClass("following");
      expect(button.textContent).toBe("Unfollow");
    });
  });

  it("should throw error when no buttons exist", () => {
    document.body.innerHTML = "<div>No buttons</div>";

    expect(() => {
      // Importar dinamicamente
      require("../main");
      const event = new Event("DOMContentLoaded");
      document.dispatchEvent(event);
    }).toThrow("Nenhum botão encontrado.");
  });
});
