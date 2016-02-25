Template.product.onRendered(function () {
    Session.set('header', 'Product Details')
    GoogleMaps.load();
})
Template.product.helpers({
    product() {
        //GoogleMaps.load();
        let id = FlowRouter.getParam('id')
        return Products.findOne(id)
    },
    mapOptions: function () {
        let id = FlowRouter.getParam('id')
        let product = Products.findOne(id)

        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(product.location.lat, product.location.lng),
                zoom: 15
            };
        }
    },
    productRating(arr){
        console.log(arr)
        return _.reduce(arr, function(memo, num) {
                return memo + num;
            }, 0) / (arr.length === 0 ? 1 : arr.length);
    }
})

Template.product.onDestroyed(function () {
    Session.set('header', null)
})

Template.product.onCreated(function () {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready("exampleMap", function (map) {
        // Add a marker to the map once it's ready
        let id = FlowRouter.getParam('id')
        let product = Products.findOne(id)
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(product.location.lat, product.location.lng),
            map: map.instance
        });
        marker.setMapPosition();
    });
});