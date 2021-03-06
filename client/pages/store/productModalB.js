Template.productModalB.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('map', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            animation:google.maps.Animation.BOUNCE,
            map: map.instance
        });
    });
})

Template.productModalB.onRendered(function() {
    const template = this
    template.$('.rateit').rateit();
    GoogleMaps.load();
})

Template.productModalB.helpers({
    product() {
        return Template.instance().data.product
    },
    mapOptions: function () {

        let product = Template.instance().data.product

        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(product.location.lat, product.location.lng),
                zoom: 15
            };
        }
    },
    productRating(arr){
        return _.reduce(arr, function(memo, num) {
                return memo + num;
            }, 0) / (arr.length === 0 ? 1 : arr.length);
    },
    currentGift() {
        return Session.get('currentGift')
    }
})

Template.productModalB.events({
    'click #close-btn'(event, template) {
        template.$('.modal-container').addClass('slideOutDown')
        Meteor.setTimeout(function () {
            Session.set('selectedProduct', null)
        }, 1000)
    },
    'click .add-gift-btn'() {
        Session.set('currentGift', this.product._id)
        $('.group-dialog').removeClass("dialog--close").addClass('dialog--open')
    }
})

Template.productModalB.onDestroyed(function() {

})

