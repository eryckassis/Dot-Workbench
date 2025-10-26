import "./style.css";

const root = document.documentElement;
const xOutput = document.querySelector<HTMLOutputElement>("#x-pos");
const yOutput = document.querySelector<HTMLOutputElement>("#y-pos");

function atualizarPosiçãoDoPonteiro(event: PointerEvent): void {
  if (!xOutput || !yOutput) return;
  root.style.setProperty("--x", `${event.x}px`);
  root.style.setProperty("--y", `${event.y}px`);
  xOutput.textContent = event.x.toFixed(0);
  yOutput.textContent = event.x.toFixed(0);
}
document.addEventListener("pointermove", atualizarPosiçãoDoPonteiro);

//                                        Lógica para o botão dos Cards                                //

document.addEventListener("DOMContentLoaded", () => {
  const botoes = getAllButtons();
  if (botoes.length === 0) throw new Error("Nenhum botão encontrado.");

  botoes.forEach((botao) => {
    botao.addEventListener("click", handleButtonClick);
  });
  focusFirstButton();
});

function getAllButtons(): HTMLButtonElement[] {
  return Array.from(document.querySelectorAll<HTMLButtonElement>("button"));
}

function handleButtonClick(this: HTMLButtonElement): void {
  this.classList.toggle("following");
  this.textContent = this.classList.contains("following")
    ? "Unfollow"
    : "Seguir";
}

function focusFirstButton(): void {
  setTimeout(() => {
    const botaozinho = document.querySelector<HTMLButtonElement>("button");
    if (!botaozinho) return;
    botaozinho.focus();
  }, 500);
}

export {
  getAllButtons,
  handleButtonClick,
  focusFirstButton,
  atualizarPosiçãoDoPonteiro,
};

// Meus principais pontos:
// Cada função receberá uma unica responsabilidade(SRP);
// Utilizado early return para evitar execuções desnecessárias;
// Codigo totalmente modular, fácil de testar & manter
// teste
