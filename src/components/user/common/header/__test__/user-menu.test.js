import { render, screen } from "@testing-library/react";
import { userData } from "../../../../../helpers/testing/test-data";
import { renderWithProviders } from "../../../../../helpers/testing/test-utils";
import UserMenu from "../user-menu";

describe("user menu", () => {
  it("should be rendered two buttons", () => {
    renderWithProviders(<UserMenu />);
    const loginBtn = screen.getByRole("button", { name: "Login" });
    const registerBtn = screen.getByRole("button", { name: "Register" });

    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it("should be rendered user name after user loged in", () => {
    renderWithProviders(<UserMenu />, { preloadedState: { auth: userData } });

    const ddlUserMenu = screen.getByTestId("ddlUserMenu");
    expect(ddlUserMenu).toBeInTheDocument();

    const displayName = screen.getByText(/ali gel/i);
    expect(displayName).toBeInTheDocument();

  });
});
