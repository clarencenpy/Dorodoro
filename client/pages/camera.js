Template.camera.helpers({
    photo: function () {
        return Session.get('photo')
    }
})

Template.camera.events({
    'change #photoUpload': function (event, instance) {
        Session.set('photo', URL.createObjectURL(event.target.files[0]))
    }
})