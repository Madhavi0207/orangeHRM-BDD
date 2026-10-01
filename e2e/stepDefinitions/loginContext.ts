import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../support/CustomWorld";
import { LoginPage } from "../pageObject/LoginPage";
import { expect } from "@playwright/test";

Given("the admin is in the login page", async function (this: CustomWorld) {
  if (!this.loginPage) {
    this.loginPage = new LoginPage(this.page);
  }
  await this.loginPage.navigateToLoginPage();
});

When(
  "the admin logs in with the given credentials",
  async function (this: CustomWorld, dataTable: DataTable) {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
    }

    await this.loginPage.enterLoginDetails(dataTable);
  },
);

Then("the admin is logged in successfully", async function (this: CustomWorld) {
  if (!this.loginPage) {
    this.loginPage = new LoginPage(this.page);
  }

  await expect(this.loginPage.dashboardAssertion).toBeVisible();
});

When(
  "the admin enter the invalid credentials",
  async function (this: CustomWorld, dataTable: DataTable) {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
    }

    await this.loginPage.invalidCredentails(dataTable);
  },
);

Then(
  "the alert message {string} must appear",
  async function (this: CustomWorld, message: string) {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
    }
    await expect(this.loginPage.invalidCredentailAlertMessage).toHaveText(
      message,
    );
  },
);
