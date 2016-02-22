Template.camera.events({
    'change #photoUpload': function (event, instance) {
        Session.set('photo', URL.createObjectURL(event.target.files[0]))
    }
})

Template.camera.helpers({
    photo: function () {
        return Session.get('photo')
    }
})