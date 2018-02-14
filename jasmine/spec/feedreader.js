/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    describe('RSS Feeds', function () {
        /* These tests make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* tests that the URL are defined and are not empty*/
        it('have URL and not empty', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        /*tests that the Name are defined and are not empty*/
        it('have Name and not empty', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function () {
        /*tests the menu element is hidden by default*/
        it('elements are by default hidden', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect($('.menu-hidden .slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });
        /*tests the menu visibility when it is clicked*/
        it('changes visibility when clicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        /*tests that the .feed container contains at least single .entry element
         * after the loadFeed is called and completes its work
         */
        it('should contain at least one entry in feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New feed Selection', function () {
        var feed0;
        var feed1;
        beforeEach(function (done) {
            loadFeed(0, function () {
                feed0 = $('.feed').html();
                loadFeed(1, function () {
                    feed1 = $('.feed').html();
                    //console.log('feed1 = ' + feed1);
                    done();
                });
                //console.log('feed0 = ' + feed0);
            });
        });
        /*tests that the content changes when new feed is loaded*/
        it('Content updates when new feed is loaded', function () {
            expect(feed0).not.toBe(feed1);
        });
    });
}());