Template.login.events({
    'click #facebook-login-btn' () {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed")
            }
            Events.insert({
                date: new Date(),
                userId: Meteor.userId(),
                name: 'LOGIN'
            })
        });
    }
})