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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('must have url field defined for each feed and it must not be empty', function() {
            for(let i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('must have name field defined for each feed and it must not be empty', function() {
            for(let i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });
    });

    /* Test suite named "The menu" */
    describe('The Menu', function() {
        const BODY = $('body');
        const MENU_BUTTON = $('.menu-icon-link'); 

        /* This tests that the menu element is hidden by default
         */
        it('must be hidden by default', function() {
            expect(BODY.hasClass('menu-hidden')).toBeTruthy();
        });

         /* This tests that the menu changes 
          * visibility when the menu icon is clicked.
          */
        it('must change visibility when the menu icon is clicked', function() {
            MENU_BUTTON.click();
            expect(BODY.hasClass('menu-hidden')).toBeFalsy();
            MENU_BUTTON.click();
            expect(BODY.hasClass('menu-hidden')).toBeTruthy();
        });
    });
    
    /* Test suite named "Initial Entries" */
    describe('Intial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        });

         /* This tests when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('must load feed and render the entry and .feed container', function() {
            expect($('.feed').has('.entry').length).not.toBe(0);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let intialFeedHtml;

        beforeEach(function(done) {
            loadFeed(0, function() {
                intialFeedHtml = $('.feed').html();

                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* This tests that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('must load new feed', function(done) {
            let newFeedHtml = $('.feed').html();
            expect(newFeedHtml).not.toBe('intialFeedHtml');
            done();
        });
    });
}());
