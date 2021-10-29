const express = require('express');
const path = require('path');
const axios = require('axios');
const API_KEYS = require('../config.js');

const PORT = 3000;
const app = express();
const apiPath = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';


app.use(express.static(path.join(__dirname, '../client', 'dist')));
app.use(express.json());

app.get('/products', (req, res) => {
  console.log(req.body);
  var path = req.body.path;
  var productId = req.body.productId;
  if (path === '/products') {
    axios.get(apiPath + '/products', {
      headers: { 'Authorization': API_KEYS.token }
    }).then((data) => {
      res.send(data.data);
    }).catch((err) => {
      res.send(err);
    });
  } else if (path === '/products/:product_id') {
    axios.get(apiPath + '/products/' + productId, {
      headers: { 'Authorization': API_KEYS.token }
    }).then((data) => {
      res.send(data.data);
    }).catch((err) => {
      res.send(err);
    });
  } else if (path === '/products/:product_id/styles') {
    axios.get(apiPath + '/products/' + productId + '/styles', {
      headers: { 'Authorization': API_KEYS.token }
    }).then((data) => {
      res.send(data.data);
    }).catch((err) => {
      res.send(err);
    });
  } else if (path === '/products/:product_id/related') {
    axios.get(apiPath + '/products/' + productId + '/related', {
      headers: { 'Authorization': API_KEYS.token }
    }).then((data) => {
      res.send(data.data);
    }).catch((err) => {
      res.send(err);
    });
  }
});

app.get('/qa/questions', (req, res) => {
  var productId = req.body.productId;
  var questionId = req.body.questionId;
  var path = req.body.path;
  if (path === '/answers') {
    axios.get(apiPath + '/qa/questions/' + questionId + '/answers', { headers: { 'Authorization': API_KEYS.token } }).then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
  } else {
    axios.get(apiPath + '/qa/questions' + '?product_id=' + productId, { headers: { 'Authorization': API_KEYS.token } }).then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
  }
})

app.post('/qa/questions', (req, res) => {
  //console.log(req.body);
  var path = req.body.path;
  var questionId = {
    question_id: req.body.questionId
  }
  var questobj = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    product_id: req.body.productId,
  }
  console.log(questobj);
  var ansobj = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  }
  if (path === '/answers') {
    //console.log('questionid');
    axios.post(apiPath + `/qa/questions/${questionId}/answers`, ansobj, { headers: { 'Authorization': API_KEYS.token }}).then((response) => {
      console.log('created answer');
      console.log(response);
      res.sendStatus(201);
    });
  } else {
    console.log('here');
    axios.post(apiPath + '/qa/questions', questobj, { headers: { 'Authorization': API_KEYS.token }}).then((response) => {
      console.log('created question');
      console.log(response);
      res.sendStatus(201);
    });
  }
})

app.put('/qa/questions/put', (req, res) => {
  var path = req.body.path;
  var questionId = req.body.questionId;
  var answerId = req.body.answerId;
  if (path === 'helpfulquestion') {
    axios.put(apiPath + `/qa/questions/${questionId}/helpful`, {"question_helpfulness": 1 }, { headers: { 'Authorization': API_KEYS.token }})
    .then((response) => {
      console.log(response);
      res.sendStatus(204);
    });
  } else if (path === 'reportquestion') {
      axios.put(apiPath + `/qa/questions/${questionId}/report`, {reported: true}, { headers: { 'Authorization': API_KEYS.token }})
      .then((response) => {
        console.log(response);
        res.sendStatus(204);
      });
  } else if (path === 'helpfulanswer') {
      axios.put(apiPath + `/qa/answers/${answerId}/helpful`, {"helpfulness": 1}, { headers: { 'Authorization': API_KEYS.token }})
      .then((response) => {
        console.log(response);
        res.sendStatus(204);
      });
  } else if (path === 'reportanswer') {
      axios.put(apiPath + `/qa/answers/${answerId}/report`, {reported: true}, { headers: { 'Authorization': API_KEYS.token }})
      .then((response) => {
        console.log(response);
        res.sendStatus(204);
      });
    }
});

app.get('/cart', (req, res) => {
  axios.get(apiPath + '/cart', {
    headers: { 'Authorization': API_KEYS.token }
  }).then((results) => {
    res.send(results.data);
  }).catch((err) => {
    res.send(err);
  });

})

app.post('/cart', (req, res) => {
  console.log(typeof req.body);
  var paramsObj = {
    sku_id: req.body.sku_id
  };
  axios.post(apiPath + '/cart', paramsObj,
    {headers: { 'Authorization': API_KEYS.token }}
  ).then((results) => {
    res.send(results);
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
});

app.get('/reviews', (req, res) => {
  var path = req.body.path;
  var paramsObj = {
    productId: req.body.id,
    reviewPage: req.body.page,
    reviewCount: req.body.count,
    reviewSort: req.body.sort
  }

  if (path === '/reviews') {
    axios.get(apiPath + "/reviews", {
      headers: { 'Authorization': API_KEYS.token },
      params: paramsObj
    }).then((data) => {
      console.log(data.data);
      res.send(data.data);
    }).catch((err) => {
      res.send(err);
    });
  } else if (path === "/reviews/meta") {
    axios.get(apiPath + "/reviews/meta", {
      headers: {
        'Authorization': API_KEYS.token
      },
      params: {
        product_id: paramsObj.productId
      }
    }).then((data) => {
        console.log(data.data);
        res.send(data.data);
      }).catch((err) => {
        res.send(err);
      });
  }
});


app.post('/reviews', (req, res) => {
  var paramsObj = {
    product_id: req.body.id,
    rating:req.body.rating,
    summary:req.body.summary,
    body:req.body.body,
    recomend:req.body.recomend,
    name:req.body.name,
    email:req.body.email,
    photo:req.body.photo,
    characteristics:req.body.characteristics
  };
  axios.post(apiPath + '/reviews', {
    headers: { 'Authorization': API_KEYS.token },
    params: paramsObj
  }).then((results) => {
    res.send(results);
  }).catch((err) => {
    res.send(err);
  })

});

app.put('reviews/:review_id/helpful',(req,res)=>{
  var review_id = req.body.review_id;
  axios.put('reviews/:'+review_id+'helpful', {'review_id':review_id})
  .then((results)=>{
    res.send(results)
  }).catch((err)=>{
    res.send(err);
  })
});

app.put('reviews/:review_id/report',(req,res)=>{
  var review_id = req.body.review_id;
  axios.put('reviews/:'+review_id+'report', {'review_id':review_id})
  .then((results)=>{
    res.send(results)
  }).catch((err)=>{
    res.send(err);
  })
});


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
});
