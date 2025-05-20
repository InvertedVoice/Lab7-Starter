describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements were found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return item.data;
      });
    });

    console.log(`Checking product item 1/${prodItemsData.length}`);

    // **** TODO - STEP 1 ****
    // * Right now this function is only checking the first <product-item> it found, make it so that
    //   it checks every <product-item> it found
    for (let i = 0; i < prodItemsData.length; i++) {
      const item = prodItemsData[i];
      if (!item.title || !item.price || !item.image) {
        allArePopulated = false;
        break;
      }
    }

    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    /**
     **** TODO - STEP 2 **** 
     * Query a <product-item> element using puppeteer (checkout page.$() and page.$$() in the docs)
     * Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
     * Once you have the button, you can click it and check the innerText property of the button.
     * Once you have the innerText property, use innerText.jsonValue() to get the text value of it
     */

    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');

    await button.click();
    const buttonText = await button.getProperty('innerText');
    const textValue = await buttonText.jsonValue();

    expect(textValue).toBe("Remove from Cart");

    // Reset state
    await button.click();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** TODO - STEP 3 **** 
     * Query select all of the <product-item> elements, then for every single product element
     * get the shadowRoot and query select the button inside, and click on it.
     * Check to see if the innerText of #cart-count is 20
     */

    const productItems = await page.$$('product-item');

    for (let i = 0; i < productItems.length; i++) {
      const shadowRoot = await productItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const buttonText = await button.getProperty('innerText');
      const textValue = await buttonText.jsonValue();

      if (textValue === 'Add to Cart') {
        await button.click();
        await page.waitForTimeout(100); // prevent race condition
      }
    }

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 30000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 4 **** 
     * Reload the page, then select all of the <product-item> elements, and check every
     * element to make sure that all of their buttons say "Remove from Cart".
     * Also check to make sure that #cart-count is still 20
     */

    await page.reload();
    const productItems = await page.$$('product-item');

    for (let i = 0; i < productItems.length; i++) {
      const shadowRoot = await productItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      expect(text).toBe('Remove from Cart');
    }

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    /**
     **** TODO - STEP 5 **** 
     * At this point the item 'cart' in localStorage should be 
     * '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
     */
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    console.log('Cart contents:', cart);
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** TODO - STEP 6 **** 
     * Go through and click "Remove from Cart" on every single <product-item>, just like above.
     * Once you have, check to make sure that #cart-count is now 0
     */

    const productItems = await page.$$('product-item');

    for (let i = 0; i < productItems.length; i++) {
      const shadowRoot = await productItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const buttonText = await button.getProperty('innerText');
      const textValue = await buttonText.jsonValue();

      if (textValue === 'Remove from Cart') {
        await button.click();
        await page.waitForTimeout(100);
      }
    }

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 30000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 7 **** 
     * Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
     * is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
     * Also check to make sure that #cart-count is still 0
     */

    await page.reload();
    const productItems = await page.$$('product-item');

    for (let i = 0; i < productItems.length; i++) {
      const shadowRoot = await productItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      expect(text).toBe('Add to Cart');
    }

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    /**
     **** TODO - STEP 8 **** 
     * At this point the item 'cart' in localStorage should be '[]', check to make sure it is
     */

    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    console.log('Cart contents after removal:', cart);
    expect(cart).toBe('[]');
  });
});
