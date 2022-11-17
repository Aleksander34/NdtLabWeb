export default function initColumnFilter(selectorTable, selectorCol) {
	initFilter($(selectorCol));
	let _$table = $(selectorTable);
	let _$filter = $(selectorCol).find('.tableColumnFilter');
	let colNum = $(selectorCol).data('num');
	let column = _$table.DataTable().column(colNum - 1);

	let set = new Set();
	column.data().each((element) => {
		set.add(element);
	});

	let filter = {
		data: [...set],
		selectedItems: [],
	};

	filter.data.forEach((element) => {
		_$filter.find('.tableColumnFilter__items')
			.append(`<li class="k-item" data-name="${element}"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>${element}</span></label>
</li>`);
	});

	_$filter.find('.tableColumnFilter__search').on('keyup', function () {
		let keyword = $(this).val().toLowerCase().trim();

		if (keyword == '') {
			_$filter.find('.tableColumnFilter__items').find(`[data-name]`).removeClass('d-none');
			return;
		}

		_$filter.find('.tableColumnFilter__items').find(`[data-name]`).addClass('d-none');
		let filteredData = filter.data.filter((x) => x.toLowerCase().includes(keyword.toLowerCase()));
		filteredData.forEach((element) => {
			_$filter.find('.tableColumnFilter__items').find(`[data-name=${element}]`).removeClass('d-none');
		});
	});

	_$filter.find('.tableColumnFilter__items input:checkbox').change(function () {
		let choisedElement = $(this).siblings('span').text();
		if (this.checked) {
			filter.selectedItems.push(choisedElement);
		} else {
			filter.selectedItems = filter.selectedItems.filter((x) => x != choisedElement);
		}
	});

	_$filter.find('.tableColumnFilter__filter-btn').click(function () {
		let regExp = '';
		if (filter.selectedItems.length > 0) {
			regExp = '(' + filter.selectedItems.join('|');
			regExp = regExp.substring(0, regExp.length - 2);
			regExp += ')';
		}

		let api = _$table.DataTable();
		api.column(colNum - 1)
			.search(regExp, true)
			.draw();
	});

	_$filter.find('.tableColumnFilter__clear-btn').click(function () {
		_$filter.find('.tableColumnFilter__items input:checkbox:checked').each(function () {
			$(this).prop('checked', false);
			let api = _$table.DataTable();
			api.column(colNum - 1)
				.search('', true)
				.draw();
		});
	});
	_$filter.siblings('.filterShow').click(function () {
		_$filter.removeClass('d-none');
	});

	return filter;
}

jQuery(function ($) {
	$(document).mouseup(function (e) {
		var div = $('.tableColumnFilter-wrapper');
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			div.find('.tableColumnFilter').addClass('d-none');
		}
	});
	$('.dataTables_scrollBody').find('.tableColumnFilter-wrapper').addClass('d-none');
});

//создание метода фильтра создает фильтр на странице
function initFilter(_$col) {
	_$col.append(`
	
	<div class="tableColumnFilter-wrapper">
	<button class="btn btn-primary filterShow">*
	</button> 
	<div
	class="tableColumnFilter k-animation-container d-none"

	>
	
	<span class="k-searchbox k-textbox k-input k-input-md k-rounded-md k-input-solid"
		><span class="k-input-icon k-icon k-i-search"></span><input class="tableColumnFilter__search k-input-inner" type="text" placeholder="Search" /><span class="k-input-suffix"
			><span class="k-clear-value"><span class="k-icon k-i-x"></span></span></span
	></span>
	<ul class="tableColumnFilter__items k-reset k-multicheck-wrap">
		<li class="k-item" style="display: none">
			<label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>Perth Pasties</span></label>
		</li>
	</ul>
	<div class="k-filter-selected-items">2 items selected</div>
	<div class="k-action-buttons">
		<button type="button" class="tableColumnFilter__filter-btn k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"><span class="k-button-text">Filter</span></button
		><button type="button" class="tableColumnFilter__clear-btn k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"><span class="k-button-text">Clear</span></button>
	</div>
	</div>
	</div>
	`);
}
