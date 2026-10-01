import { DataTable } from "@cucumber/cucumber";
import { Page, Locator, expect } from "@playwright/test";
export class LoginPage {
  private readonly page: Page;
  public readonly baseUrl: string;

  private readonly usernameSelector: Locator;
  private readonly passwordSelector: Locator;
  private readonly loginBtnSelector: Locator;

  public readonly dashboardAssertion: Locator;

  public readonly invalidCredentialAlertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl =
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

    this.usernameSelector = this.page.getByRole("textbox", {
      name: "Username",
    });

    this.passwordSelector = this.page.getByRole("textbox", {
      name: "Password",
    });

    this.loginBtnSelector = this.page.getByRole("button", { name: "Login" });

    this.dashboardAssertion = this.page.getByRole("heading", {
      name: "Dashboard",
    });

    this.invalidCredentialAlertMessage = this.page.getByRole("alert");
  }

  async navigateToLoginPage() {
    await this.page.goto(this.baseUrl);
  }

  async enterLoginDetails(dataTable: DataTable) {
    const data = dataTable.hashes();

    await this.usernameSelector.fill(data[0].username);
    await this.passwordSelector.fill(data[0].password);
    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.loginBtnSelector.click(),
    ]);
  }
  async invalidCredentials(dataTable: DataTable) {
    const data = dataTable.hashes();

    await this.usernameSelector.fill(data[0].username);
    await this.passwordSelector.fill(data[0].password);
    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.loginBtnSelector.click(),
    ]);
  }

  async errorMessage(message: string) {
    await expect(this.invalidCredentialAlertMessage).toHaveText(message);
  }
}
