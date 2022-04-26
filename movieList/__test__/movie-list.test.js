const {By, Builder, Capabilities} = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('Delete a movie', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Hush\n')

    await driver.findElement(By.xpath('(//button)[2]')).click()

    const ul = await driver.findElement(By.xpath('//ul'))

    expect(ul.hasChildren).toBeFalsy()
})

test('Cross off a movie', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Hush 2\n')

    await driver.findElement(By.xpath('//span')).click()

    await driver.sleep(3000)

    const checked = await driver.findElement(By.xpath('//span[contains(@class,"checked")]'))

    const isChecked = checked.isDisplayed()

    expect(isChecked).toBeTruthy()
})

test('Reveal a message', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Hush\n')

    await driver.findElement(By.xpath('(//button)[2]')).click()
    
    const message = await driver.findElement(By.xpath('//*[contains(text(),"deleted")]'))
    
    const displayed = message.isDisplayed()

    expect(displayed).toBeTruthy()

    await driver.sleep(3000)
})