Template.navigation.onRendered(function () {
    frameworkInit()
})


Template.navigation.helpers({
    header() {
        return Session.get('header') || 'Dorodoro';
    },
    showBackButton() {
        let pageStack = Session.get('pageStack') || []
        return pageStack.length > 0
    },
    showPhoto() {
        return Session.get('showPhoto')
    }
})

Template.navigation.events({
    'click #logout-btn'() {
        Meteor.logout()
    },
    'click #back-btn'() {
        let pageStack = Session.get('pageStack') || [];
        if (pageStack.length <= 0) return
        let page = pageStack.pop()
        Session.set('pageStack', pageStack)
        Session.set('goingBack', true)
        FlowRouter.go(page)
    },
    'change #camera-input': function (event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                if (err){
                    console.log('error saving image')
                } else {
                    Session.set('photo', '/cfs/files/images/' + fileObj._id)
                    Session.set('tempPhoto', URL.createObjectURL(event.target.files[0]))
                    Session.set('showPhoto', true)
                }
            });
        });
    }
})