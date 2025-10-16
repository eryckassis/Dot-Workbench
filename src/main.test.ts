import "@testing-library/jest-dom";

jest.mock("../style.css", () => ({}));

import { getAllButtons, handleButtonClick, focusFirstButton } from "./main";
