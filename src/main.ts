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
