describe('Controller: ContentHostAddSubscriptionsController', function() {
    var $scope,
        $controller,
        translate,
        HostSubscription,
        Subscription,
        Host,
        Nutupane,
        expectedTable,
        expectedRows,
        SubscriptionsHelper;

    beforeEach(module(
        'Bastion.content-hosts',
        'Bastion.subscriptions',
        'Bastion.test-mocks',
        'content-hosts/details/views/host-collections.html',
        'content-hosts/views/content-hosts.html',
        'content-hosts/views/content-hosts-table-full.html'
    ));

    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller'),
            $q = $injector.get('$q');

        Host = $injector.get('MockResource').$new();
        HostSubscription = $injector.get('MockResource').$new();
        HostSubscription.addSubscriptions = function() {};
        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        SubscriptionsHelper = $injector.get('SubscriptionsHelper');

        translate = function(message) {
            return message;
        };

        expectedRows = [];

        expectedTable = {
            showColumns: function() {},
            getSelected: function() {
                return expectedRows;
            },
            rows: function () {
                return expectedRows;
            },
            selectAll: function() {},
            allSelected: false
        };
        Nutupane = function() {
            this.table = expectedTable;
            this.removeRow = function() {};
            this.get = function() {};
            this.query = function() {};
            this.refresh = function() {};
            this.setSearchKey = function() {};
            this.setParams = function() {};
            this.load = function() {};
        };
        translate = function(message) {
            return message;
        };
        ContentHostSubscription = {
            remove: function() {},
            save: function() {}
        };

        subscription = {
            'multi_entitlement': false,
            available: 0,
            selected: false
        };

        $scope.host = new Host({
            id: 12345
        });

        $scope.addSubscriptionsPane = {
            refresh: function() {},
            table: {}
        };

        $scope.$stateParams = {hostId: $scope.host.id};

        $controller('ContentHostAddSubscriptionsController', {
            $scope: $scope,
            $location: $location,
            translate: translate,
            CurrentOrganization: 'organization',
            Subscription: Subscription,
            Host: Host,
            Nutupane: Nutupane,
            SubscriptionsHelper: SubscriptionsHelper,
            HostSubscription: HostSubscription
        });
    }));

    it('attaches the nutupane table to the scope', function() {
        expect($scope.contentNutupane).toBeDefined();
    });

    it("allows adding subscriptions to the content host", function() {
        var expected = {id: $scope.host.id, subscriptions: [
                                                      {id: 2, quantity: 0},
                                                      {id: 3, quantity: 1},
                                                      {id: 4, quantity: 1}
                                                    ]};
        spyOn(HostSubscription, 'addSubscriptions');

        $scope.detailsTable.getSelected = function() {
            return [
                     {id: 2, 'multi_entitlement': true},
                     {id: 3, 'multi_entitlement': true, 'amount': 1},
                     {id: 4, 'multi_entitlement': false}
                   ];
        };

        $scope.addSelected();
        expect(HostSubscription.addSubscriptions).toHaveBeenCalledWith(expected, jasmine.any(Function), jasmine.any(Function));
    });

    /*
    describe("provides a filter for the available display", function() {
        var expected;

        it("it should be 'Unlimited' if -1", function() {
            subscription.available = -1;
            expected = subscription;
            expected.availableDisplay = 'Unlimited';

            expect($scope.availableSubscriptionsTable.formatAvailableDisplay(subscription)).toBe(expected);
        });

        it("it should be the number if not -1", function() {
            subscription.available = 2;
            expected = subscription;

            expect($scope.availableSubscriptionsTable.formatAvailableDisplay(subscription)).toBe(expected);
        });
    });

    describe("provides a way to determine if the selector should be shown", function() {
        it("shows the selector if all three conditions are met", function() {
            subscription['multi_entitlement'] = true;
            expect($scope.availableSubscriptionsTable.showSelector(subscription)).toBe(false);

            subscription.available = 2;
            expect($scope.availableSubscriptionsTable.showSelector(subscription)).toBe(false);

            subscription.selected = true;
            expect($scope.availableSubscriptionsTable.showSelector(subscription)).toBe(true);
        });

        it("does not show the selector if conditions are not met", function() {
            expect($scope.availableSubscriptionsTable.showSelector(subscription)).toBe(false);
        });
    });

    describe("provides a way to attach and remove subscriptions", function() {
        beforeEach(function() {
            expectedRows = [
                {entitlementId: 1, cp_id: 'a'},
                {entitlementId: 2, cp_id: 'b'},
                {entitlementId: 3, cp_id: 'c'}
            ];

            $scope.contentHost = {
                uuid: 'abcde',
                $get: function() {}
            };
        });

        it("by removing the selected subscriptions", function() {
            spyOn(ContentHostSubscription, 'remove');

            expectedTable.getSelected = function() {
                return [expectedRows[1]];
            };

            $scope.removeSubscriptions();

            expect(ContentHostSubscription.remove).toHaveBeenCalledWith({contentHostId: 'abcde', id: 2},
                jasmine.any(Function), jasmine.any(Function)
            );
        });

        it("by removing all subscriptions if all are selected", function() {
            spyOn(ContentHostSubscription, 'remove');

            expectedTable.allSelected = true;

            $scope.removeSubscriptions();

            expect(ContentHostSubscription.remove).toHaveBeenCalledWith({contentHostId: 'abcde'},
                jasmine.any(Function), jasmine.any(Function)
            );
        });

        it("by attaching the selected subscriptions", function() {
            spyOn(ContentHostSubscription, 'save');

            expectedTable.getSelected = function() {
                return [expectedRows[1]];
            };

            $scope.attachSubscriptions();

            expect(ContentHostSubscription.save).toHaveBeenCalledWith({contentHostId: 'abcde',
                    pool: 'b', quantity: 1}, jasmine.any(Function), jasmine.any(Function)
            );
        });
    });
    */
});
