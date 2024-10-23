const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'admi',
        password: 'kuusi'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = page.getByText("username")
    const password = page.getByText("password")
    
    await expect(password).toBeVisible()
    await expect(username).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('admi')
      await page.getByRole('textbox').last().fill('kuusi')
      await page.getByRole('button').click()

      await expect(page.getByText("admi logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('ami')
      await page.getByRole('textbox').last().fill('kuusi')
      await page.getByRole('button').click()

      await expect(page.getByText("wrong credentials")).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('admi')
      await page.getByRole('textbox').last().fill('kuusi')
      await page.getByRole('button').click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button',{name:"new blog"}).click()
      await page.getByTestId('title').fill('tiiteli')
      await page.getByTestId('author').fill('taateli')
      await page.getByTestId('url').fill('tuuteli')
      await page.getByRole('button',{name:'create'}).click()

      await expect(page.getByText('taateli')).toBeVisible()
    })
  })

})

