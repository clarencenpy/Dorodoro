Template.mainLayout.onRendered(function () {
    WebFont.load({
        google: {
            families: ["Montserrat:400,700", "Fredoka One:400"]
        }
    })
})
Template.onlyIfLoggedIn.helpers({
    authInProcess() {
        return Meteor.loggingIn()
    },
    canShow() {
        return !!Meteor.user()
    }
})