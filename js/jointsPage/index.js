import initColumnFilter from '../libs/tableColumnFilter.js';
$(function () {
	var _$modal = $('#exampleModal'),
		_$table = $('#example');

	_$table.DataTable({
		scrollX: true,
		ordering: false,
		searching: false,
		dom: [
			"<'row'<'col-md-12'f>>",
			"<'row'<'col-md-12't>>",
			"<'row mt-2'",
			"<'col-lg-1 col-xs-12'<'float-left text-center data-tables-refresh'B>>",
			"<'col-lg-3 col-xs-12'<'float-left text-center'i>>",
			"<'col-lg-3 col-xs-12'<'text-center'l>>",
			"<'col-lg-5 col-xs-12'<'float-right'p>>",
			'>',
		].join(''),
		buttons: [{ name: 'refresh', text: '<i class="fa-solid fa-rotate"></i>', action: () => console.log('refresh') }],
	});

	// paging: false, // свойствами дата таблицы можно убрать лишнее
	// ordering: false,
	// info: false,

	new AirDatepicker('#jointsDate', {
		range: true,
		multipleDatesSeparator: ' - ',
	});

	_$modal
		.on('shown.bs.modal', () => {}) //действия при открытии
		.on('hidden.bs.modal', () => {
			$('#requestFile').val('');
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

	let f1 = initColumnFilter('#example', '.colWithFilter[data-num="3"]');
	let f2 = initColumnFilter('#example', '.colWithFilter[data-num="2"]');
	let f3 = initColumnFilter('#example', '.colWithFilter[data-num="1"]');
});
