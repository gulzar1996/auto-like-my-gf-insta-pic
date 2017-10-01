var accessToken = ENTER_YOUR_INSTAGRAM_ACCESS_TOKEN;
const user_id = ENTER_USER_ID_TO_MONITOR;
var slack_url = ENTER_SLACK_INCOMING_WEBHOOK_URL;

var InstagramAPI = require('instagram-api');
var request = require('request');
var instagramAPI = new InstagramAPI(accessToken);
var request = require('request');
const express = require('express')
const app = express()


app.get('/run', function (req, res) 
{
    instagramAPI.userMedia(user_id).then(result => 
    {
        var pics = [];
        var likePromise = [];
        result.data.forEach(function(media){ 

        if (media.user_has_liked == false)  
            likePromise.push(instagramAPI.postMediaLike(media.id).then(resp =>
            {
                return sendPostToSlack(media);
            }));            
        });  

        Promise.all(likePromise).then(values => 
            { 
                console.log('All photos liked')
                res.send(values);
            },
            function(err)
            {
                res.send(err);
            }
        );

    }, 
    function(err)
    {
        res.send(err);
        console.log(err); // error info 
    });
    
})

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
  

function sendPostToSlack(media)
{
    let caption;
    if(media.caption === null)
        caption = 'Unknown';
        else
        caption = media.caption.text;
request.post(
        slack_url,
        {
             json: {
                "attachments": [
                    {
                        "pretext": caption,
                        "image_url": media.images.standard_resolution.url,
                        "footer": "Instagram "+media.type+" liked",
                        "footer_icon": "https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300",
                        "ts": Math.floor(Date.now() / 1000)
                    }
                ]
            }
    },
        function (error, response, body) {
            return response;
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}