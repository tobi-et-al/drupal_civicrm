(function(angular, $, _) {

  angular.module('tobiextension').config(function($routeProvider) {
      $routeProvider.when('/civicrm/personalcampaign', {
        controller: 'TobiextensionCampaigns',
        templateUrl: '~/tobiextension/Campaigns.html',

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: {
          myContact: function(crmApi) {
            return crmApi('Contact', 'getsingle', {
              id: 'user_contact_id',
              return: ['first_name', 'last_name']
            });
          }
        }
      });
    }
  );

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('tobiextension').controller('TobiextensionCampaigns', function($scope, crmApi, crmStatus, crmUiHelp, myContact,$http,$location) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('tobiextension');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/tobiextension/Campaigns'}); // See: templates/CRM/tobiextension/Campaigns.hlp
    var url = $location.protocol() + '://' + $location.host() + ':' + $location.port();
     // We have myContact available in JS. We also want to reference it in HTML.

    $http.get(url + '/drupal//sites/all/modules/civicrm/extern/rest.php?entity=ContributionPage&action=get&api_key=testtesttest&key=e0c93507f1d54f16da5e51a4e1749e8d&json={%22debug%22:1,%22sequential%22:1,%22api.ContributionSoft.get%22:{}}')
      .success(function(response) {
          $scope.original = response;
          $scope.names = response.values;
          console.log($scope.names);

         for (var i = 0; i < $scope.original.count; i++) {
            $scope.names[i]['ContributionSoft'] = (response.values[i]["api.ContributionSoft.get"]);
            console.log($scope.names[i]['ContributionSoft'].values);
          }
      });
  });

})(angular, CRM.$, CRM._);
