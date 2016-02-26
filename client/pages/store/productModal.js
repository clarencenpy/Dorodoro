Template.productModal.onCreated(function() {

})

Template.productModal.onRendered(function() {
    const template = this
    template.$('.rateit').rateit();
    GoogleMaps.load();
})

Template.productModal.helpers({
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
    }
})

Template.productModal.events({
    'click #close-btn'(event, template) {
        template.$('.modal-container').addClass('slideOutDown')
        Meteor.setTimeout(function () {
            Session.set('selectedProduct', null)
        }, 1000)
    }
})

Template.productModal.onDestroyed(function() {

})

