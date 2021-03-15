import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const bs = screen.getByText(/Bullshit Bingo/i);
  expect(bs).toBeInTheDocument();
});
