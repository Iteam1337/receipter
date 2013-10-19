
angular.module('receipter').controller('AppController', function($scope) {

  'use strict';

  $scope.data = {
    receipts: [
      {
        id: 1,
        name: 'Whiskey',
        client: {
          name: 'Radical FM'
        },
        date: new Date(2013, 9, 2, 19, 22),
        image: '',
        amount: 265,
        note: 'Present for Tom'
      },
      {
        id: 2,
        name: 'Dinner',
        client: {
          name: 'TRR'
        },
        date: new Date(2013, 9, 14, 20, 4),
        image: '',
        amount: 895.5,
        note: 'Johan, Christian och Gunnar'
      },
      {
        id: 3,
        name: 'AW',
        client: {
          name: 'Iteam'
        },
        date: new Date(2013, 9, 15, 14, 3),
        image: '',
        amount: 645,
        note: 'IPA FTW!'
      }
    ]
  };

});