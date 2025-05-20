# Lab 7

## Members: George Minasyan and Aldrin Ilagan

[Link to test.js](https://github.com/InvertedVoice/Lab7-Starter/blob/main/__tests__/lab7.test.js)
[Link to screenshot](https://github.com/InvertedVoice/Lab7-Starter/blob/main/tests.png)

1. Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.
> *Within a Github action that runs whenever code is pushed.* <br>
Automated testing is best used as part of our continous integration (CI), which makes it so that our testing is automated with every push we do to our repository, which leads to quick veritifaction of the application still working correctly, all the while reducing the chance of our code completely breaking apart.

2. Would you use an end-to-end test to check if a function is returning the correct output? (yes/no)
> *No* <br>
End-to-end testing is done to simulate real user interactions with the application (clicking buttons, navigating through pages, etc.). Instead of using end-to-end testing to check if a function returns the correct output, we can use unit tests for that.

3. What is the difference between navigation and snapshot mode?
> Navigation mode analyzes a page after it finishes loading and provides you with insight into it's performance and accessibility. Snapshot mode analyzes the page in it's current static state, but cannot evaluate on dynamic content or JS coding, which only makes it good for accessibility.

4. Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.
- Optimizing and resizing Images to reduce the load time by reducing image sizes.
- Minimizing the unused JS or CSS for better performance by reducing unnecessary loading times and improving the page's speed.
- Adding a <meta name="viewport"> tag in order to reduce input delay and make it more responsive on mobile.

