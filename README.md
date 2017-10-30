![Image](/instagram.png)
<h1 align="center"> Auto like my gf Instagram pics </h1>

Bot to automatically like your friend's Instagram post and notify you on your Slack channel.

### Practical use cases

 - You are like me. You don't have time to check social media and you want to give attention to someone so that she notices you.
 - You are in a relationship. Your girlfriend is constantly nagging you for not being the 'first-one' to like her Instagram pics.

 How it works ?
================  
 This script runs Instagram API every 15mins (Crone Job) and checks for any new Instagram post for a paticular `user_id`. If a new a post is found it likes the post and sends a notification to your configured Slack channel using Slack Webhooks.

Installation
===============

 - `git clone https://github.com/gulzar1996/auto-like-my-gf-insta-pic`
 - `npm install`
 - create a `.env` file (you must set `accessToken`, `user_id` (Target user id) from [Instagram Developer API](https://www.instagram.com/developer) and `slack_url` from [Slack Webhooks](https://api.slack.com/incoming-webhooks) ) as shown.
 ![.env file](/env.png)
 This would assure that your keys are secured and index.js file is untouched.
 - `npm start` (run the app)

Like all the recent instagram post (test)

     GET http://localhost:3000/run

Deploy to Heroku
================

 - `cd auto-like-my-gf-insta-pic`
 - `heroku login`
 - `heroku create` (add heroku to project)
 - `git push heroku master` (deploy to heroku)
 - `heroku ps:scale worker=1` (start dyno worker)

 Heroku will generate a url for you

      http://<HEROKU_URL>.herokuapp.com/run

Setting up Crone Job
================      

 - create an account [cron-job.org](https://cron-job.org/en/)
 - create a cronejob
 - paste the url `http://<HEROKU_URL>.herokuapp.com/run` in address
 - schedule every `15 mins`

  Thanks
================
Inspired from https://github.com/cyandterry/Like-My-GF. Code written in JS from scratch.
