describe('Index', () => {
  it('should open page in desktop viewport size', async () => {
    await browser.url(`http://localhost:4567`)
    await browser.pause(100)
    await browser.takeFullPageScreenshot('index-desktop')

    await expect(browser).toHaveTitle(
      'Frontend Mentor Challenges • Optimum BH Internship'
    )
    await expect($('body')).toHaveTextContaining(
      'Front-end development challenges'
    )
    await expect($('body')).toHaveTextContaining('by Frontend Mentor')
    await expect($('=Frontend Mentor')).toHaveHref(
      'https://www.frontendmentor.io'
    )
    await expect($('body')).toHaveTextContaining('for Optimum BH Internship')
    await expect($('=Optimum BH')).toHaveHref('https://github.com/optimumBA')
    await expect($('body')).toHaveTextContaining('Source code')
    await expect($('=Source code')).toHaveHrefContaining('https://github.com')
    await expect($('=Source code')).toHaveHrefContaining(
      '/frontend_mentor_challenges'
    )
  })

  it('should open page in mobile viewport size', async () => {
    await browser.url(`http://localhost:4567`)
    await browser.setWindowSize(375, 667) // iPhone 8
    await browser.pause(100)
    await browser.takeFullPageScreenshot('index-mobile')

    await expect(browser).toHaveTitle(
      'Frontend Mentor Challenges • Optimum BH Internship'
    )
    await expect($('body')).toHaveTextContaining(
      'Front-end development challenges'
    )
    await expect($('body')).toHaveTextContaining('by Frontend Mentor')
    await expect($('=Frontend Mentor')).toHaveHref(
      'https://www.frontendmentor.io'
    )
    await expect($('body')).toHaveTextContaining('for Optimum BH Internship')
    await expect($('=Optimum BH')).toHaveHref('https://github.com/optimumBA')
    await expect($('body')).toHaveTextContaining('Source code')
    await expect($('=Source code')).toHaveHrefContaining('https://github.com')
    await expect($('=Source code')).toHaveHrefContaining(
      '/frontend_mentor_challenges'
    )
  })
})
