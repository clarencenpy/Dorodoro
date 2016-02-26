Template.store.onCreated(function () {
    const template = this
    template.goingBack = !!Session.get('goingBack')
    Session.set('goingBack', false)
})

Template.store.onRendered(function () {
    Session.set('header', 'Gift Store')
    this.$('.rateit').rateit();

    /** Draggable Code **/
    dragdrop()
    var body = document.body,
        dropArea = document.getElementById('drop-area'),
        droppableArr = [], dropAreaTimeout;

    // initialize droppables
    [].slice.call(document.querySelectorAll('#drop-area .drop-area__item')).forEach(function (el) {
        droppableArr.push(new Droppable(el, {
            onDrop: function (instance, draggableEl) {
                // show checkmark inside the droppabe element
                classie.add(instance.el, 'drop-feedback');
                clearTimeout(instance.checkmarkTimeout);
                instance.checkmarkTimeout = setTimeout(function () {
                    classie.remove(instance.el, 'drop-feedback');
                }, 800);
            }
        }));
    });

    // initialize draggable(s)
    [].slice.call(document.querySelectorAll('#grid .grid__item')).forEach(function (el) {
        new Draggable(el, droppableArr, {
            //draggabilly: {containment: dropArea},
            scroll : true,
            scrollable : '#drop-area',
            scrollSpeed : 40,
            scrollSensitivity : 50,
            animBack: false,
            helper: true,
            onStart: function () {
                // add class 'drag-active' to body
                classie.add(body, 'drag-active');
                // clear timeout: dropAreaTimeout (toggle drop area)
                clearTimeout(dropAreaTimeout);
                // show dropArea
                classie.add(dropArea, 'show');
            },
            onEnd: function (wasDropped) {
                var afterDropFn = function () {
                    // hide dropArea
                    classie.remove(dropArea, 'show');
                    // remove class 'drag-active' from body
                    classie.remove(body, 'drag-active');
                };

                if (!wasDropped) {
                    afterDropFn();
                }
                else {
                    // after some time hide drop area and remove class 'drag-active' from body
                    clearTimeout(dropAreaTimeout);
                    dropAreaTimeout = setTimeout(afterDropFn, 400);
                }
            }
        })
    });
    /** End Draggable Code **/
})

Template.store.helpers({
    products() {
        return Products.find()
    },
    goingBack() {
        return Template.instance().goingBack
    },
    productRating(arr){
        console.log(arr)
        return _.reduce(arr, function(memo, num) {
                return memo + num;
            }, 0) / (arr.length === 0 ? 1 : arr.length);
    }
})

Template.store.events({
    'click .group-block'() {
        let pid = this._id
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.getRouteName())
        Session.set('pageStack', pageStack)
        FlowRouter.go('product', {id: pid})
    }
})

Template.store.onDestroyed(function () {
    Session.set('header', null)
})

