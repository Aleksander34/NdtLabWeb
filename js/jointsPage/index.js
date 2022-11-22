import initColumnFilter from '../libs/tableColumnFilter.js';
$(function () {
	var _$modal = $('#exampleModal'),
		_$table = $('#example');

	$('#requestPreviewTable').DataTable({
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
		info: false,
		paging: false,
	});

	$('#repairCountTable').DataTable({
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
		info: false,
		paging: false,
	});

	let language = {
		emptyTable: 'нет данных',
		info: 'показано c: _START_ по: _END_ из: _TOTAL_',
		infoEmpty: 'нет данных',
		lengthMenu: 'элементов _MENU_ на странице',
		paginate: {
			first: 'первая страница',
			last: 'последняя страница',
			next: 'следующая страница',
			previous: 'предыдущая страница',
		},
	};

	let data = [
		{
			name1: 'Tiger Nixon',
			name2: 'System Architect',
			name3: '$3,120',
			name4: '2011/04/25',
			name5: 'Edinburgh',
			name6: '5421',
			name7: 'Tiger Nixon',
			name8: 'System Architect',
			name9: '$3,120',
			name10: '2011/04/25',
		},
	];

	_$table.DataTable({
		ordering: false,
		searching: false,
		data: data,
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
		language: language,
		drawCallback: () => {
			$('[data-bs-toggle="tooltip"]').tooltip();
		},
		columns: [
			{
				data: null,
				render: (data) => {
					return [
						`<button type="button" class="btn text-danger btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Удалить"><i class="fa-solid fa-xmark"></i></button>`,
						`<button type="button" class="btn text-secondary btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Редактировать"><i class="fa-solid fa-pen"></i></button>`,
						`<button type="button" class="showRepairCountModal btn text-secondary btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Количество: 10"><i class="fa-regular fa-eye"></i></button>`,
					].join('');
				},
			},
			{
				data: 'name1',
			},
			{
				data: 'name2',
			},
			{
				data: 'name3',
			},
			{
				data: 'name4',
			},
			{
				data: 'name5',
			},
			{
				data: 'name6',
			},
			{
				data: 'name7',
			},
			{
				data: 'name8',
			},
			{
				data: 'name9',
			},
			{
				data: 'name10',
			},
		],
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

	//на главной
	$('#productionRequest2').click(function () {
		$('#qualificationRequestType2').addClass('d-none');
		$('#productionRequestType2').removeClass('d-none');
		$(this).addClass('active');
		$('#qualificationRequest2').removeClass('active');
	});

	$('#qualificationRequest2').click(function () {
		$('#productionRequestType2').addClass('d-none');
		$('#qualificationRequestType2').removeClass('d-none');
		$(this).addClass('active');
		$('#productionRequest2').removeClass('active');
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

	$('#saveRequest').click(function () {
		$('#exampleModal').modal('hide');
		swal('Успешно!', 'Заявка загружена', 'success');
	});

	let f1 = initColumnFilter('#example', '.colWithFilter[data-num="3"]');
	let f2 = initColumnFilter('#example', '.colWithFilter[data-num="2"]');
	let f3 = initColumnFilter('#example', '.colWithFilter[data-num="1"]');

	$(document).on('click', '.showRepairCountModal', function () {
		$('#repairCountModal').modal('show');
	});
});
