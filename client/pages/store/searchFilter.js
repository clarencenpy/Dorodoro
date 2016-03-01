Template.searchFilter.onCreated(function () {
    const template = this
})

Template.searchFilter.onRendered(function () {
    const template = this

    Session.set('header', 'Search Filter')

    $("#example_id").ionRangeSlider({
        min: 0,
        max: 5000,
        from: 1000,
        to: 3500,
        type: 'double',
        prefix: "$",
        onStart: function (data) {
            console.log(data);
        },
        onChange: function (data) {
            console.log(data);
        },
        onFinish: function (data) {
            console.log(data);
        },
        onUpdate: function (data) {
            console.log(data);
        }
    });
})

Template.searchFilter.helpers({
    /*function() {
     $( "#slider-range" ).slider({
     range: true,
     min: 0,
     max: 500,
     values: [ 75, 300 ],
     slide: function( event, ui ) {
     $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
     }
     });
     $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
     " - $" + $( "#slider-range" ).slider( "values", 1 ) );
     }*/
})

Template.searchFilter.events({
    'click #close-btn'(event, template) {
        template.$('.modal-container').addClass('slideOutUp')
        Meteor.setTimeout(function () {
            Session.set('showFilter', false)
        }, 1000)
    }
})

Template.searchFilter.onDestroyed(function () {

})