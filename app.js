$(document).ready(function(){
	$("#out").click(function(){
		$("#out").fadeOut(600, function(){
			$("#in").fadeIn(400);
		});
	});
	$("#reset").click(function(){
		$("#in").fadeOut(400, function(){
			$("#out").fadeIn(600);
		});
	});

	$("#wiki-search").keypress(function(e){
		var userSearch = $("#wiki-search").val();
		var wiki = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + userSearch + "&gsrnamespace=0&gsrprop=snippet&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=3&exlimit=max&format=json&callback=?";
		if(e.which == 13){
			console.log("success");
			$("#out").html('<i class="fa fa-search" aria-hidden="true"></i>' + "<strong> : </strong>" + userSearch);
			$("h1").css("padding-bottom", "5px");
			$("body").css({
				"border-left" : "2px solid #3F8EFC",
				"border-right" : "2px solid #3F8EFC"
			})
			var wikiPages = ""

			$.getJSON(wiki , function(json){
				for (var article in json.query.pages) {
				    var curID = "https://en.wikipedia.org/?curid=";
					wikiPages += '<a href ="';
					wikiPages += curID + json.query.pages[article].pageid;
					wikiPages += '" target = "blank"><div class = "wiki-page text-left"><div><div><h3><strong>';
					wikiPages += json.query.pages[article].title;
					wikiPages += '</strong></h3></div>';
					wikiPages += '<div class = "text-left"><p>';
					wikiPages += json.query.pages[article].extract;
					wikiPages += '</p></div></div></div></a>';
				}
				$("#content").html(wikiPages);
				$(".wiki-page").show("linear");
			});
		};
	});
});
