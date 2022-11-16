import initColumnFilter from '../libs/tableColumnFilter.js';
$(function () {
	var _$modal = $('#exampleModal'),
		_$table = $('#example');

	_$table.DataTable({
		scrollX: true,
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
