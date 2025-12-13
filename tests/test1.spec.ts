import { test, expect } from '@playwright/test';
import { HomePage } from '../POM/HomePage';

let texts = ["Design", "design"];
    
test('Verify all books match with input creteria', async ({ page }) => {
  const homePage = new HomePage(page);

  //And the user in on Book Store page
  await homePage.goto('https://demoqa.com/books');

  //When the user input name "Design" or "design" into the search box
    for (let text of texts) {
    console.log(text);
    await homePage.fillSearchBox(text);
    await homePage.expectNumberOfBook (2);
    //Then all books match with input creteria will be displayed
    await homePage.expectBookTitle(['Learning JavaScript Design Patterns', 'Designing Evolvable Web APIs with ASP.NET',]);
    }
});


 


 