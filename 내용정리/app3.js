const express = require('express');

const app = express();

const indexRouter = require('../routes');
const userRouter = require('../routes/user');
const findRouter = require('../routes/find');

app.set('port', process.env.PORT || 3000);

app.use('/', indexRouter); // 각기 다른 경로에 미들웨어 장착
app.use('/user', userRouter); // 각기 다른 경로에 미들웨어 장착
app.use('/find', findRouter);

app.use((req, res, next) =>{
    req.statusCode(404).send('Not Found');
});

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '실행완료');
});