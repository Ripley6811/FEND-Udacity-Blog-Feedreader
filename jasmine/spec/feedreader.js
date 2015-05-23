/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /**
     * This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /**
         * Make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Loop through each feed
         * in the allFeeds object and ensure that each has a URL defined
         * and that the URL is not empty.
         */
        it('has a non-empty "URL" in each feed', function() {
            for (var i=0; i<allFeeds.length; i++) {
                var url = allFeeds[i].url;
                expect(url).toBeDefined();
                expect(url.slice(0,5).toLowerCase()).toBe('http:');
            }
        });

        /**
         * Loop through each feed
         * in the allFeeds object and ensure that each has a name defined
         * and that the name is not empty.
         */
        it('has a non-empty "name" in each feed', function() {
            for (var i=0; i<allFeeds.length; i++) {
                var name = allFeeds[i].name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        // Transition (sliding) time defined in CSS.
        var transitionTime = 200; 
        
        /**
         * Ensure that the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('.menu.hidden').position().left).toBeLessThan(0);
            expect($('body').attr('class')).toBe('menu-hidden');
        });

         /**
          * Ensure that the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes after icon clicks', function(done) {
            $('.menu-icon-link').click();
            expect($('body').attr('class')).toBe('');
            
            setTimeout(function() {
                expect($('.menu.hidden').position().left).toBe(0);
                $('.menu-icon-link').click();
                expect($('body').attr('class')).toBe('menu-hidden');
                
                setTimeout(function() {
                    expect($('.menu.hidden').position().left).toBeLessThan(0);
                    done();
                }, 2*transitionTime); // Add more time to complete transitions.
            }, 2*transitionTime);
        });
    });

    describe('Initial Entries', function() {
        /**
         * Allow time for DOM to finish loading.
         */
        beforeEach(function(done) {
            setTimeout(function() {
                done();
            }, 500);
        });

        /**
         * Ensure that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least one .entry element after loadFeed call', function() {
            expect($('.feed > .entry-link > .entry').get().length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        var initialContent = undefined,
            contentLocation = '.feed > .entry-link > .entry > h2',
            buttons = $('.feed-list > li > a');
        
        /**
         * Wait for DOM to finish then click a new feed link and allow
         * time to load.
         */
        beforeEach(function(done) {
            setTimeout(function() {
                initialContent = $(contentLocation).text();
                buttons.get(-1).click();
                // Allow time for click to take effect.
                setTimeout(function() {
                    done();
                }, 500);
            }, 500);
        });
        
        /**
         * Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes content after loadFeed call', function(done) {
            expect(initialContent).toBeDefined();
            expect(initialContent.length).toBeGreaterThan(0);
            var newContent = $(contentLocation).text();
            expect(newContent).toBeDefined();
            expect(newContent.length).toBeGreaterThan(0);
            expect(newContent).not.toBe(initialContent);
            done();
        });
        
        /**
         * Return page to original (first) feed.
         */
        afterEach(function(done) {
            buttons.get(0).click();
            setTimeout(function() {
                done();
            }, 500);
        });
    });
}());
