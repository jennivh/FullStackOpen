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
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'uus',
        password: 'hehe'
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
      await page.getByTestId('author').fill('tooteli')
      await page.getByTestId('url').fill('tuuteli')
      await page.getByRole('button',{name:'create'}).click()

      await expect(page.getByText('tiiteli', {exact:'true'})).toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('First Blog')
      await page.getByTestId('author').fill('Author 1')
      await page.getByTestId('url').fill('http://firstblog.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByTestId('title').fill('Second Blog')
      await page.getByTestId('author').fill('Author 2')
      await page.getByTestId('url').fill('http://secondblog.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).nth(1).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByTestId('blog').first().getByTestId('title')).toHaveText('Second Blog')
      await expect(page.getByTestId('blog').last().getByTestId('title')).toHaveText('First Blog')
    })

    describe('blog exists', () => {
      beforeEach(async ({page, request}) => {
        await page.getByRole('button',{name:"new blog"}).click()
        await page.getByTestId('title').fill('tiiteli')
        await page.getByTestId('author').fill('taateli')
        await page.getByTestId('url').fill('tuuteli')
        await page.getByRole('button',{name:'create'}).click()
        await page.getByRole('button',{name:'view'}).last().click()

      })

      test('blog can be liked', async ({page}) => {
        await page.getByRole('button', {name: 'like'}).click()
        await expect(page.getByTestId('number')).toHaveText('1')
      })

      test('blog can be deleted', async ({page}) => {
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', {name:'remove'}).click()
        
        await expect(page.getByText("tiiteli", {exact:'true'})).not.toBeVisible()
      })

      describe("other user logs in",() => {
        beforeEach(async ({page,request}) => {
          await page.getByRole('button',{name:'log out'}).click()
          await page.getByRole('textbox').first().fill('uus')
          await page.getByRole('textbox').last().fill('hehe')
          await page.getByRole('button').click()
        })

        test('Can not remove other persons blog', async ({page}) => {
          await page.getByRole('button',{name:'view'}).click()
          await expect(page.getByRole('button',{name:'remove'})).not.toBeVisible()
        })
      })

      
    }) 

    
  })

})

