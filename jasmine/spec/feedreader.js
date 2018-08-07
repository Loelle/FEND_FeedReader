/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Validates URL property of the allFeeds object

        it('have a URL', function () {
            allFeeds.forEach(function(feeds) {
                expect(feeds.url).toBeDefined();
                expect(feeds.url.length).not.toBe(0);
            }) 
        });

        // Validates name property of the allFeeds object
        it('have a name', function () {
            allFeeds.forEach(function (feeds) {
                expect(feeds.name).toBeDefined();
                expect(feeds.name.length).not.toBe(0);
                expect(typeof (feeds.name)).toEqual('string');
            })
        });
    });


    /* Testing suite for "The menu" */
    describe('The menu', function () {
        // Ensures the menu element is hidden by default.
        it('element hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         //Ensures the menu changes visibility when the menu icon is clicked.
        it('visibility change on menu icon click', function () {
            // first click normally remove menu-hidden class
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // another click add menu-hidden class
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* Testing suite for "Initial Entries" */
    describe('Initial Entries', function () {
        // Ensures loadFeed is able to load a feed which fill the element with the class entry
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('contains at least one element', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Testing suite for "New Feed Selection" */
    describe('New Feed Selection', function () {
        // Ensures the content change when a new feed is loaded
        let firstFeed, secondFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                // store the first feed
                firstFeed = $('.feed').html();
				// load a second feed
				loadFeed(1, function() {
					// store the second feed
					secondFeed = $('.feed').html();
					// Ensures asynchronous events is done with success before continue with the it() function
					done();
				});
            });
            
        });
		// Ensures the content of the first feed is different from the second one
        it('changes the content', function () {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
