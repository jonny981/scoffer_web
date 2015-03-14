'use strict';

scofferApp.directive('validateofferlength', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {

            ngModel.$parsers.unshift(function (value) {
                var isNotOverDuration = moment(value).isBefore(moment().add(1, 'weeks'));
                var isAfterToday = moment(value).isAfter(moment());
                var isValidDate = moment(value, ['MM/DD/YYYY'], true).isValid() || moment(value, ['M/D/YYYY'], true).isValid();
                var valid = isNotOverDuration && isAfterToday && isValidDate;
                ngModel.$setValidity('validateofferlength', valid);
                return valid ? value : undefined;
            });

            ngModel.$formatters.unshift(function (value) {
                var isNotOverDuration = moment(value).isBefore(moment().add(1, 'weeks'));
                var isAfterToday = moment(value).isAfter(moment());
                var isValidDate = moment(value, ['MM/DD/YYYY'], true).isValid() || moment(value, ['M/D/YYYY'], true).isValid();
                var valid = isNotOverDuration && isAfterToday && isValidDate;
                ngModel.$setValidity('validateofferlength', valid);
                return value;
            });
        }
    };
});

