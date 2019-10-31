const router = require('express').Router();
const Account = require('models/account');
const vkService = require('vkService');

router.use('/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    Account.findOne({'username': username}, function (err, exists) {
        if (err) return next(err);

        if (exists) return next(new Error('account already registered!'));

        var account = new Account({
            username: username,
            password: password,
            data: {
                coins: 100
            }
        });

        account.save(function (err, newAccount) {
            if (err) return next(err);

            res.json({status: 200, message: 'ok', account: newAccount});
        });
    });
});

router.use('/getData', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    Account.findOne({'username': username, 'password': password}, function (err, account) {
        if (err) return next(err);

        if (!account) return next(new Error('account not registered!'));

        res.json({status: 200, message: 'ok', account: account});
    });
});

router.use('/saveData', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var data = req.body.data;

    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    Account.findOneAndUpdate({
        'username': username,
        'password': password
    }, {$set: {data: data}}, {new: true}, function (err, account) {
        if (err) return next(err);

        if (!account) return next(new Error('account not registered!'));

        res.json({status: 200, message: 'ok', account: account});
    });
});

router.use('/checkVkId', function (req, res, next) {
    var crypto = require('crypto');

    var userId = req.body.id;
    var userAuthKey = req.body.auth_key;

    var isValidKey = vkService.checkKey(userId,userAuthKey);

    if (!isValidKey) return next(new Error('auth key is invalid!'));

    res.json({status: 200, message: 'ok'});
});

module.exports = router;