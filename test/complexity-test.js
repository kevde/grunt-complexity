describe("Complexity task", function() {

	var grunt = require('grunt');
	var cut = require('../tasks/complexity')(grunt);
	var expect = require('chai').expect;

	it ("can normalize options to allow for multiple levels of error reporting", function() {

		var normalized = cut.normalizeOptions({
			cyclomatic: 3,
			halstead: 9
		});

		expect(normalized.cyclomatic).to.eql([3]);
		expect(normalized.halstead).to.eql([9]);
	});

	it ('throws an error when encountering an empty file', function () {
		var targetFile = __dirname + '/fixtures/empty.js';
		var reporter = {
			start: function () {}
		};

		expect(function () {
			cut.analyze(reporter, [targetFile], null);
		}).to.throw('Empty source file: \'' + targetFile + '\'.');
	});

	it ('parses es6', function () {
		var reporter = {
			start: function () {},
			maintainability: function () {},
			complexity: function () {},
			finish: function () {}
		};

	  var options = cut.normalizeOptions({
			cyclomatic: 3,
			halstead: 8
		});

		cut.analyze(reporter, [__dirname + '/fixtures/es6.js'], options);
	});

	it ('parses jsx', function () {
		var reporter = {
			start: function () {},
			maintainability: function () {},
			complexity: function () {},
			finish: function () {}
		};

	  var options = cut.normalizeOptions({
			cyclomatic: 3,
			halstead: 8
		});

		cut.analyze(reporter, [__dirname + '/fixtures/react.jsx'], options);
	});

	describe("isComplicated", function() {
		var data = {
			cyclomatic: 5,
			halstead: {
				difficulty: 7
			}
		};

		it('should return true if cyclomatic complexity is greater than in options', function() {
			// given
			var options = cut.normalizeOptions({
				cyclomatic: 3,
				halstead: 8
			});

			// when
			var isComplicated = cut.isComplicated(data, options);

			// then
			expect(isComplicated).to.equal(true);
		});

		it('should return true if halstead is greater than in options', function() {
			// given
			var options = cut.normalizeOptions({
				cyclomatic: 6,
				halstead: 3
			});

			// when
			var isComplicated = cut.isComplicated(data, options);

			// then
			expect(isComplicated).to.equal(true);
		});

		it('should return false if no metric is greater than in options', function() {
			// given
			var options = cut.normalizeOptions({
				cyclomatic: 6,
				halstead: 8
			});

			// when
			var isComplicated = cut.isComplicated(data, options);

			// then
			expect(isComplicated).to.equal(false);
		});
	});

	describe("isMaintainable", function() {
		var data = {
			maintainability: 120
		};

		it('should return true if maintainability is greater than or equal to options', function() {
			// given
			var options = {
				maintainability: 120
			};

			// when
			var isMaintainable = cut.isMaintainable(data, options);

			// then
			expect(isMaintainable).to.equal(true);
		});

		it('should return false otherwise', function() {
			// given
			var options = {
				maintainability: 140
			};

			// when
			var isMaintainable = cut.isMaintainable(data, options);

			// then
			expect(isMaintainable).to.equal(false);
		});

	});

});
