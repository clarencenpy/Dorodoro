Template.product.onCreated(function() {
    Session.set('header', 'Product Detail')
})

Template.product.onRendered(function() {
    const template = this
    template.$('.rateit').rateit();
    GoogleMaps.load();
})

Template.product.helpers({
    product() {
        return Products.findOne(FlowRouter.getParam('id'))
    },
    mapOptions: function () {

        let product = Products.findOne(FlowRouter.getParam('id'))

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

Template.product.events({

})

Template.product.onDestroyed(function() {
    Session.set('header', null)
})

