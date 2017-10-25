(function( $ ) {
	$.fn.tableizer = function(options) {
		$table = this;
		$.each( options.columns, function( v, k ) {
			$table.children('thead').children('tr').append('<th>'+k.head+'</th>');
		});
		$.ajax({
			url: options.url,
			dataType: 'json'
		}).done(function( html ) {
			$table.append(html);
			var data;
			if (options.path) {
				var data = _.get( html, options.path );
			} else {
				var data = html;
			}
			$.each(data, function(v_data, k_data){
				$data_row = $table.children('tbody').append('<tr></tr>');
				$.each( options.columns, function( v, k ) {
					function getDescendantProp(obj, desc) {
						var arr = desc.split('.');
						while (arr.length) {
							obj = obj[arr.shift()];
						}
						return obj;
					}
					
					$data_row.append('<td>'+ getDescendantProp( k_data, k.data ) +'</td>')
				});
			})
		}).fail(function(err){
			$table.html('Content could not load');
			console.log('Error',err);
		});
		return this;
	};
}( jQuery ));