

// $(".tableColumnFilter__items").text("");
// data.each(element => {
// 	$(".tableColumnFilter__items").append(`<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>${element}</span></label>
// </li>`)
// });

// $(".tableColumnFilter__search").on("keyup", function(){
// 	let keyword = $(this).val().toLowerCase().trim();
// 	console.log(keyword)
// 	$(".tableColumnFilter__items").text("");
// 	if(keyword=="")
// 	{
// data.each(element => {
// 	$(".tableColumnFilter__items").append(`<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>${element}</span></label>
// </li>`)
// });
// return;
// 	}
// 	let filteredData = data.filter(x=>x.toLowerCase().includes(keyword.toLowerCase()));
// 	filteredData.each(element => {
// 		$(".tableColumnFilter__items").append(`<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>${element}</span></label>
// 	</li>`)
// 	});
// })

// $(".tableColumnFilter__filter-btn").click(function(){
// let selectedItems = [];
// $(".tableColumnFilter__items input:checkbox:checked").siblings("span").each(function(){
// 		selectedItems.push($(this).text());
// 	});

// let regExp ="";
// if(selectedItems.length>0)
// {
// 	regExp="("+selectedItems.join("|");
// 	regExp = regExp.substring(0, regExp.length-2);
// 	regExp+=")";
// 	console.log(regExp);
// }

// 	let api = _$table.DataTable()
// 	api
// 	.column(colNum-1)
// 	.search(regExp, true)
// 	.draw();

// 	console.log(selectedItems)
// })

// $(".tableColumnFilter__clear-btn").click(function(){
// 	$(".tableColumnFilter__items input:checkbox:checked").each(function(){
// 		$(this).prop("checked", false);
// 		let api = _$table.DataTable()
// 		api
// 		.column(colNum-1)
// 		.search("", true)
// 		.draw();
// 	});
// })

export default function initColumnFilter(selectorTable, selectorFilter){
let _$table = $(selectorTable);
let _$filter = $(selectorFilter);

let colNum = _$filter.data("num");
let column = _$table.DataTable().column(colNum-1);

let data = column.data();
console.log(data)
}