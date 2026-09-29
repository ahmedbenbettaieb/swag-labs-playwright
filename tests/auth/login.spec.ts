import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';

import {users} from '../../data/users';

test.describe('Login', () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
    })

    test('Login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    test('Login with invalid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(users.invalid.username, users.invalid.password);
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    test('Login with locked out user', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(users.lockedOut.username, users.lockedOut.password);
                await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })

    test('Login with empty  credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login('', '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    })
    test('Login with Empty username', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login('', users.standard.password);
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    })
    test('Login with Empty password', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(users.standard.username, '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    })
})