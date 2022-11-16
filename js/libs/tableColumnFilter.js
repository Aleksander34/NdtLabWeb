export default function initColumnFilter(selectorTable, selectorFilter) {
	let _$table = $(selectorTable);
	let _$filter = $(selectorFilter);

	let colNum = _$filter.data('num');
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
		_$filter.find('.tableColumnFilter__items').append(`<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>${element}</span></label>
</li>`);
	});

	_$filter.find('.tableColumnFilter__search').on('keyup', function () {
		let keyword = $(this).val().toLowerCase().trim();
		_$filter.find('.tableColumnFilter__items').text('');

		if (keyword == '') {
			filter.data.forEach((element) => {
				let isChecked = filter.selectedItems.includes(element);
				_$filter.find('.tableColumnFilter__items').append(`<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" ${
					isChecked ? 'checked' : ''
				} /><span>${element}</span></label>
        </li>`);
			});
			return;
		}

		let filteredData = filter.data.filter((x) => x.toLowerCase().includes(keyword.toLowerCase()));
		filteredData.forEach((element) => {
			_$filter.find('.tableColumnFilter__items').append(`<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>${element}</span></label>
	</li>`);
		});
	});

	$(document).on('change', '.tableColumnFilter__items input:checkbox', function () {
		let choisedElement = $(this).siblings('span').text();
		console.log(choisedElement + ' ' + this.checked);
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

	return filter;
}
