# Mancala

A Mancala game created by Softwire Manchester's October 2023 cohort of work experience students.

### Useful HTML/CSS/JavaScript Guides

| What                                                                 | Where                                                                                                  |
|----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| HTML Basics                                                          | [here](https://www.w3schools.com/html/html_basic.asp)                                                  |
| CSS Basics                                                           | [here](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)         |
| CSS Flexbox Guide                                                    | [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)                                        |
| JavaScript Basics                                                    | [here](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)

## Running Locally

To test your changes whilst you are developing, you will need to be able to run the website locally. This means that the backend code is running on your own computer and you can access it in a browser without having to deploy the app publically over the internet.

To run and access the website locally, you can do the following:

- Run the app locally
  - You can run the app with `npx serve`
- Visit the website
  - After you have run `npx serve` you should see `"App listening at http://localhost:3000"`
  - `localhost` is the default name for your own computer

### Working on a Feature

Try not to make changes on the `main` branch, this branch should always only contain code that has been reviewed. Development work should be done on a feature branch. However, don't worry if you accidentally work on `main`! Just let me know and I'll help you move it over to a feature branch.

- Make sure you are on the `main` branch and that it is up to date:
  - `git checkout main`
  - `git pull`
- Create a branch for your feature:
  - `git checkout -b [your-own-feature-branch-name]`
- Make some code changes
- Add your changes:
  - (if you want to check what changes you have): `git status`
  - `git add [yourFiles.example]`
  - `git commit -m "sensible message here, e.g. add a line piece to the library"`
  - You can (and probably should) do this process multiple times on your branch as you gradually add code to acheive the feature
- Push the changes to GitHub:
  - If it's the first time you have pushed this branch:
    - `git push --set-upstream origin [your-own-feature-branch-name]`
  - If you have pushed this branch before:
    - `git push`

## Running Mancala After the Work Experience Week

### To Keep Working On Mancala Locally:

1. Fork the repository (click the "fork" button in the top left of the repository main page on Github)
2. Find the URL of your forked repository (on your repo's main page, click the green "Code" button and copy the URL)
3. In your local repository, run: `git clone <url-of-your-cloned-repo>`
4. You should now have your own version of the code you can work on and push to.
