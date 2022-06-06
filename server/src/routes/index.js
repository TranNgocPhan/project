const homeRouter = require('./home');
const express = require('express');
const loginRouter = require('./login');
const registerRouter = require('./register');
const illnessRouter = require('./illness');
const postRouter = require('./post');
const categoryRouter = require('./category');
const profileRouter = require('./profile');
const adminRouter = require('./admin');

function route(app) {
    app.use('/', homeRouter);
    app.use('/Signin', loginRouter);
    app.use('/Signup', registerRouter);
    app.use('/Illness', illnessRouter);
    app.use('/Post', postRouter);
    app.use('/Category', categoryRouter);
    app.use('/Profile', profileRouter);
    app.use('/Admin', adminRouter);
}

module.exports = route;