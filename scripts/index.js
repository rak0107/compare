/*var h = $('#handle'),
    l = $('#left'),
    r = $('#right'),
    w = $('body').width() - 18;

var isDragging = false;

h.mousedown(function(e){
    isDragging = true;
    e.preventDefault();
});
$(document).mouseup(function(){
    isDragging = false;
}).mousemove(function(e){
    if(isDragging){
        l.css('width', e.pageX);
        r.css('width', w - e.pageX);
    }
});*/ //commented code to support resizable divs
var assembly1 = {};


$(document).ready(function(){
	assembly1 = data1; //data1 is coming from data1.js file.
	$("#left").Tree(data1);
    $("#right").Tree(data1);
});

/*Tree component*/
$.fn.Tree = function(data){
	console.log(this);
	var uiRenderer = this;
	
	var assembly = data.objectAssembly;
	var root = data.objectInfo;
	
	var $table = $("<table>",{id:"leftTable",class:"compareTable"});
	var $firstRow = $("<th>",{id:"leftRoot",class:"root"}).append("<td>").text(root.name);
	$table.append($firstRow);
	generateTreeHTML(assembly,$table,0,false);
	uiRenderer.append($table);
}

function generateTreeHTML(assembly,$parentElement,level,childNode){
	level++;
	$.each(assembly, function(key,value){
		//alert(value.id);
        var $img = $("<img>",{class:"icons",src:"images/1.jpg"});
        if(childNode!=true)
		var $tr = $("<tr>",{id:value.id,class:"treeItem","level":level}).append("<td>").text(value.displayValue).prepend($img);
        else
        var $tr = $("<tr>",{id:value.id,class:"treeItem childNode","level":level}).append("<td>").text(value.displayValue).prepend($img);
		$parentElement.append($tr);
		if(value.objectAssembly === undefined)
			return;
		else
			generateTreeHTML(value.objectAssembly,$parentElement,level,true);
		
	});
}

