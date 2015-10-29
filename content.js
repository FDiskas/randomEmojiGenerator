var mtb = mtb || {};
mtb.randomShipit = mtb.randomShipit || {};

(function() {
	'use strict';

	var self = this;
	var shipitsArr = [
		':shipit:',
		':ship: :it:',
		':ship: :it:',
		':ship: :it:',
		':sheep: :it:',
		':sheep: :it:',
		':sheep: :it:',
		':sheep:',
		':sheep:',
		':sheep:',
		':package:',
		':package:',
		':package:'
	];

	this.init = function() {
		self.appendShipitButton();
		self.setupBindings();
	};

	this.appendShipitButton = function() {
		$('.js-comment-and-button').after('<button type="button" class="button js-random-shipit"><span class="btn-text">Random</span><img class="btn-icon" height="20" width="20" src="https://assets-cdn.github.com/images/icons/emoji/shipit.png"></button>');
	};

	this.setupBindings = function() {
		$(document).on('click', '.js-random-shipit', self.getRandomShipit);
	};

	this.getRandomShipit = function() {
		var rnd = Math.floor(Math.random() * shipitsArr.length);
		var val = shipitsArr[rnd];
		var textToAdd = $('#new_comment_field').val() + ' ' + val;
		$('#new_comment_field').val(val);

		self.submitForm();
	};

	this.submitForm = function() {
		$('.js-new-comment-form').submit();
		$('#new_comment_field').val('');
	};
}).apply(mtb.randomShipit);

mtb.randomShipit.init();