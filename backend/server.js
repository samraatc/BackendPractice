import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is listening');
});


// joke for testing purposes

app.get('/api/jokes', (req, res) => {
    const joke = [
        {
            "id": 1,
            "title": "joke 1",
            "content": "Why couldn't the bicycle stand up by itself? Because it was two"
    
        },
        {
            "id": 2,
            "title": "joke 2",
            "content": "What do you call a fake noodle? An impasta."
        },
        {
            "id": 3,
            "title": "joke 3",
            "content": "Why did the scarecrow win an award? Because he was outstanding in his field."
        },
        {
            "id": 4,
            "title": "joke 4",
            "content": "Why don't scientists trust atoms? Because they make up everything."
        },
        {
            "id": 5,
            "title": "joke 5",
            "content": "Why don't eggs tell jokes? They'd crack each other up."
        }
    ];
    res.send(joke);
})


const port = process.env.PORT || 7001;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log("👍👍👍");
    
});
