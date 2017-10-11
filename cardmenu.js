$.fn.cardmenu = function (options) {
	var opt = $.extend({
		createUpCard: true,
		upCard: "up",
		itemCard: "a",
		speed: "slow"
	}, options);
	
	var $elm = this;
	var pluginClass = "cardmenu";
	
	$elm.addClass(pluginClass);
	
	var $ul = $elm.find("ul").hide();
	
	var $upCard;

	if (opt.createUpCard) {
		var upElm = $(opt.upCard).length ? opt.upCard : '<li><a href="#" class="show-parent">' + opt.upCard + '</a></li>';

		$upCard = $(upElm);

		$upCard = $upCard[0] instanceof HTMLLIElement ? $upCard : $("<li>" + upElm + "</li>");
		$upCard.children().addClass("show-parent");
		
		$ul.prepend($upCard);
		$upCard = $elm.find(".show-parent");
		
	} else {
		$upCard = $elm.find(opt.upCard);
	}

	var $clickable = $elm.find("li " + opt.itemCard);
	$clickable = $clickable.add($elm.find("li .show-parent"));
	
	$clickable.on("click", function (e) {
		console.log("here");
		var $a = $(this);
		var $ulSibling = $a.siblings("ul");
		
		if ($a.is($upCard)) {
			var $ulGrandParent = $a.closest("ul");
			$ulGrandParent.hide();
			
			var $aGrandParentSibling = $ulGrandParent.siblings(opt.itemCard);
			$aGrandParentSibling.show(opt.speed);
			
			var $liGrandGrandParent = $aGrandParentSibling.parent();
			$liGrandGrandParent.siblings().show(opt.speed);
			
		} else if ($ulSibling.length > 0) {
			$a.hide();
			$ulSibling.show(opt.speed);
			
			var $aCurrent = $a
			var $liParent;
			var $ulGrandParent;
			var isUlWin10menu;
			
			do {
				$liParent = $aCurrent.parent();
				$liParent.siblings("li").hide();
				
				$ulGrandParent = $liParent.parent();
				$aCurrent = $ulGrandParent.siblings(opt.itemCard).hide();

				isUlWin10menu = $ulGrandParent.hasClass(pluginClass);
			} while (!isUlWin10menu);
			$elm.siblings(opt.itemCard).show();
		}
	});
	
	return this;
};
