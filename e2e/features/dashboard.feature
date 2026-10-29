@dashboard
Feature: Admin dashboard
  As an admin
  I want an overview of HR activity when I sign in
  So that I can see what needs attention and jump to common tasks

  Background:
    Given the admin is logged in

  @smoke
  Scenario: Admin sees the key HR widgets after signing in
    Then the admin sees these dashboard widgets:
      | Time at Work                      |
      | My Actions                        |
      | Quick Launch                      |
      | Buzz Latest Posts                 |
      | Employees on Leave Today          |
      | Employee Distribution by Sub Unit |
      | Employee Distribution by Location |

  Scenario Outline: Admin opens a module from the main menu
    When the admin opens the "<module>" module
    Then the "<module>" module is displayed

    Examples:
      | module |
      | Admin  |
      | PIM    |
      | Leave  |
      | Time   |

  Scenario Outline: Admin uses a quick launch shortcut
    When the admin uses the "<shortcut>" shortcut
    Then the "<page>" page is displayed

    Examples:
      | shortcut     | page         |
      | Assign Leave | Assign Leave |
      | Leave List   | Leave List   |

  Scenario: Admin finds a module with the menu search
    When the admin searches the menu for "PIM"
    Then only the "PIM" module is listed in the menu

  @smoke
  Scenario: Admin signs out
    When the admin signs out
    Then the admin is returned to the login page