var app = angular.module('Selects', []);

app.controller('itensCtrl', function ($scope, $http) {
	$scope.itens = [10, 25, 50, 100];
	$scope.orderby = ["Menor preço", "Maior preço"];
	$scope.coin = ["Real", "Dolar", "Euro"];
	$scope.selectedItem = $scope.itens[0];
	$scope.selectedOrder = $scope.orderby[0];
	$scope.selectedCoin = $scope.coin[0];
});

app.controller('listCarts', function ($scope, $http) {
	$http.get('/media/js/ajax/cart.json').
		success(function(data, status, headers, config) {
			var lengthData = data.length;
			$scope.posts = [];

			for(var i = 0; i < lengthData; i++) {
				$scope.posts.push(data[i]);
			}

			$scope.favorite = function (event) {
				var icon = event.currentTarget;

				icon.className == 'icon-heart favorite' ? icon.setAttribute('class', 'icon-heart') : icon.setAttribute('class', 'icon-heart favorite');
			};

			$scope.showDetails = function (event) {
				var icon = event.currentTarget.children[0],
					container = event.currentTarget.closest('.car');

				if(container.className.indexOf('see-details') > -1) {
					icon.setAttribute('class', 'icon-plus');
					container.setAttribute('class', container.className.replace('see-details', ''));
				} else {
					icon.setAttribute('class', 'icon-minus');
					container.setAttribute('class', container.className.concat(' see-details'));
				}
			};
		}).
		error(function(data, status, headers, config) {
		});
});