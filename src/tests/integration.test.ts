import "@testing-library/jest-dom";

describe("Integration Test", () => {
  beforeEach(() => {
    document.body.innerHTML = `<button>Seguir</button>
      <button>Seguir</button>
      <output id="x-pos"></output>
      <output id="y-pos"></output>`;
  });
});
