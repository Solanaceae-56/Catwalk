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
  var path = req.query.path;
  var productId = req.query.productId;
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
  var productId = req.query.productId;
  var questionId = req.query.questionId;
  var path = req.query.path;
  //var page = req.body.page;
  var count = req.query.count;
  if (path === '/answers') {
    axios.get(apiPath + '/qa/questions/' + questionId + '/answers', { headers: { 'Authorization': API_KEYS.token } }).then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
  } else {
    console.log('what')
    axios.get(apiPath + '/qa/questions' + `?product_id=${productId}&count=${count}`, { headers: { 'Authorization': API_KEYS.token } }).then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
  }
})

app.post('/qa/questions', (req, res) => {
  //console.log(req.body);
  debugger;
  var path = req.body.path;
  var questionId = req.body.questionId;
  var questobj = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    product_id: req.body.productId,
  }
  //console.log(questobj);
  //console.log(req.body);
  var ansobj = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  }
  //console.log(path);
  //console.log(ansobj);
  if (path === '/answers') {
    console.log(questionId, 'questionid');
    axios.post(apiPath + `/qa/questions/${questionId}/answers`, ansobj, { headers: { 'Authorization': API_KEYS.token }}).then((response) => {
      console.log('created answer');
      //console.log(response);
      res.sendStatus(201);
    });
  } else {
    //console.log('here');
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
    } else {
      res.sendStatus(400);
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
  var paramsObj = {
    sku_id: req.body.sku_id
  };
  axios.post(apiPath + '/cart', paramsObj,
    {headers: { 'Authorization': API_KEYS.token }}
  ).then((results) => {
    res.send(results);
  }).catch((err) => {
    res.send(err);
  });
});

app.get('/reviews', (req, res) => {
  let paramsObj = {
    product_id: req.query.product_id,
    page: req.query.page,
    count: req.query.count,
    sort: req.query.sort
  }
    axios.get(apiPath + "/reviews", {
      headers: { 'Authorization': API_KEYS.token },
      params: paramsObj
    }).then((data) => {
      res.send(data.data);
    }).catch((err) => {
      res.send(err);
    });

})

  app.get('/reviews/meta', (req, res) => {
    console.log("get meta data")
    axios.get(`${apiPath}/reviews/meta?product_id=${req.query.product_id}`, {
      headers: {
        'Authorization': API_KEYS.token
      }
    }).then((data) => {
        res.send(data.data);
      }).catch((err) => {
        res.send(err);
      });

});


app.post('/reviews', (req, res) => {
 console.log(req.body)
  let paramsObj = req.body;
  axios.post(apiPath + '/reviews',paramsObj, {
    headers: { 'Authorization': API_KEYS.token }
  }).then((results) => {
    res.send(results);
  }).catch((err) => {
    res.send(err);
  })
});

app.put('/reviews/:review_id/helpful',(req,res)=>{
  let review_id = req.params.review_id;
  console.log(review_id);
  axios.put(apiPath+`/reviews/${review_id}/helpful`,{},{
    headers: { 'Authorization': API_KEYS.token }
  })
  .then(()=>{
    console.log("put req success")
    res.sendStatus(204)
  }).catch((err)=>{
    res.send(err);
  })
});

app.put('/reviews/:review_id/report',(req,res)=>{

  let review_id = req.params.review_id;
  axios.put(apiPath+`/reviews/${review_id}/report`,{},{
    headers: { 'Authorization': API_KEYS.token }
  })
  .then(()=>{
    res.sendStatus(204)
  }).catch((err)=>{
    res.send(err);
  })
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
});
