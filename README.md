# Lab 7

## Members: George Minasyan

1. Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.
> *Within a Github action that runs whenever code is pushed.* 
Automated testing is best used as part of our continous integration (CI), which makes it so that our testing is automated with every push we do to our repository, which leads to quick veritifaction of the application still working correctly, all the while reducing the chance of our code completely breaking apart.

2. Would you use an end-to-end test to check if a function is returning the correct output? (yes/no)
> *No*
End-to-end testing is done to simulate real user interactions with the application (clicking buttons, navigating through pages, etc.). Instead of using end-to-end testing to check if a function returns the correct output, we can use unit tests for that.




