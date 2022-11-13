import initColumnFilter from "../libs/tableColumnFilter.js";
$(function () {
	var _$modal = $('#exampleModal'),
			_$table=$('#example');

	_$table.DataTable({
    scrollX: true,
  });

	_$modal
		.on('shown.bs.modal', () => {}) //действия при открытии
		.on('hidden.bs.modal', () => {
			$('#requestFile').val('')
			$('#requestPreviewInfo').addClass('d-none'); // действия при закрытии
		}); //ивент который происходит во время запуска модального окна

	$('#productionRequest').click(function () {
		$('#qualificationRequestType').addClass('d-none');
		$('#productionRequestType').removeClass('d-none');
		$(this).addClass('active');
		$('#qualificationRequest').removeClass('active');
	});

	$('#qualificationRequest').click(function () {
		$('#productionRequestType').addClass('d-none');
		$('#qualificationRequestType').removeClass('d-none');
		$(this).addClass('active');
		$('#productionRequest').removeClass('active');
	});

	$('.requestType').click(function () {
		$('.requestType').removeClass('active');
		$(this).addClass('active');
	});

	$('#requestFile').change(function () {
		if ($(this).get(0).files.length > 0) {
			let fileName = $(this).get(0).files[0].name;
			if (!fileName.match(/.*\.(xlsx|xls|xlsb)/)) {
				toastr['warning']('Допустимые форматы: .xlsx .xls .xlsb', 'Не верный формат файла');
				$('#requestPreviewInfo').addClass('d-none');
				return;
			}
			$('#requestPreviewInfo').removeClass('d-none');
		}
	});

	$('#requestPreviewTable').DataTable({
		scrollX: true,
	});

	$('#saveRequest').click(function () {
		$('#exampleModal').modal('hide');
		swal('Успешно!', 'Заявка загружена', 'success');
	});
// //фильтр таблицы по значениям колонки
// //получение всех значений в пределах колонки по номеру
// let colNum = 3;
// let column = _$table.DataTable().column(colNum-1);

// let data = column.data();
// console.log(data)

// //фильтрация значений колонки по введеному запросу в поиске
// let keyWord = "o";
// let filteredData = data.filter(x=>x.toLowerCase().includes(keyWord.toLowerCase()));
// console.log(filteredData);

// //программирование фильтра на странице
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
initColumnFilter("#example", ".tableColumnFilter")
});
