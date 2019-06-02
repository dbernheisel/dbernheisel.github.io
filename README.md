# dbernheisel.github.io
My website at https://bernheisel.com

## Add a post
1. Add a folder: `mkdir src/pages/blog/my-blog-post`
2. Write the post in the folder: `vim src/pages/blog/my-blog-post/index.md`
3. Add some frontmatter:
  ```markdown
  ---
  title: "Testing Random Data in Emails with Bamboo"
  tags: ["elixir"]
  date: 2017-10-16
  originalUrl: https://robots.thoughtbot.com/testing-emails-with-bamboo
  ---
  ```
4. preview it as you write: `yarn run dev`
5. commit it.
6. publish it: `yarn run deploy`

