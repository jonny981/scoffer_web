'use strict';

scofferApp.filter('filterByDate', function () {
    return function (offer, datePosted, rangeStart, rangeEnd) {
        var filterStart = rangeStart;
        var filterEnd = rangeEnd;
        return offer.filter(function (offer) {
            return (offer[datePosted] > filterEnd && offer[datePosted] < filterStart);
        });
    };
});


