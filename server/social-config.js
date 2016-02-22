ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '974399485943358',
    secret: 'b96ac6019827044e4953dcf437f4805f'
});

Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
        options.profile.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    return user;
})