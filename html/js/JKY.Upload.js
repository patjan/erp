"use strict";
var JKY = JKY || {};
/*
	JKY.Upload - process all upload functions
	 method:	start()
	require:	Uploader.js
*/
/*
	JKY.Photo = JKY.Upload(
		{ object_name	: 'JKY.Photo'
		, table_name	: 'Contacts'
		, directory		: 'contacts'
		, field_name	: 'photo'
		, title			: 'Photo files'
		, extensions	: 'jpg,gif,png'
		, button_id		: 'jky-upload-photo'
		, filename_id	: 'jky-upload-name'
		, percent_id	: 'jky-upload-percent'
		, progress_id	: 'jky-upload-progress'
		, img_id		: 'jky-photo-img'
		, download_id	: 'jky-download-photo'
		});
*/
JKY.Upload = function(the_args) {
	var my_args = the_args;
	var my_row_id;
	var my_saved_name;

	var my_photo = new plupload.Uploader(
		{ browse_button	: my_args.button_id
		, runtimes		: 'html5,flash'
		, url			: 'plupload.php'
		, flash_swf_url	: 'swf/plupload.flash.swf'
		, filters		: [{title:my_args.title, extensions:my_args.extensions}]
		});

	my_photo.bind('Init', function(up, params) {});

	my_photo.bind('FilesAdded', function(up, files) {
		JKY.show('jky_loading');
		$.each(files, function(i, file) {
			JKY.set_html(my_args.filename_id, file.name);
			my_saved_name = file.name;
			file.name = my_args.directory + '.' + my_row_id + '.' + my_saved_name;
		});
		up.refresh();	//	reposition Flash/Silverlight
		setTimeout(my_args.object_name + '.start_upload()', 100);
	});

	my_photo.bind('UploadProgress', function(up, file) {
		JKY.set_html(my_args.percent_id, file.percent + '%');
		JKY.set_css (my_args.progress_id, 'width', file.percent + '%');
	});

	my_photo.bind('FileUploaded', function(up, file) {
		JKY.display_message('File ' + my_saved_name + ' uploaded');
		JKY.set_html(my_args.percent_id, '100%');

		var my_file_name = JKY.get_text(my_args.filename_id);
		var my_file_size = file.size;

//			var my_data = {command:'file_uploaded', file_name:my_file_name, file_size:my_file_size};
//			$.ajax({async:false, cache:true, type:'post', dataType:'json', url:'fuploads/ajax', data:my_data}).success(function(data) {});

//			var my_data = {command:'end_upload'};
//			$.ajax({async:true , cache:true, type:'post', dataType:'json', url:'fuploads/ajax', data:my_data}).success(function(data) {});

		var my_file_type = JKY.get_file_type(my_saved_name);
		var my_time = new Date();
		var my_html = '<a href="' + 'jky_download.php?file_name='		+ my_args.directory + '/' + my_row_id + '.' + my_file_type + '">'
					+ '<img id="' + my_args.img_id + '" src="/uploads/' + my_args.directory + '/' + my_row_id + '.' + my_file_type + '?time=' + my_time.getTime() + '" class="the_icon" />';
					+ '</a>'
					;
		JKY.set_html(my_args.download_id, my_html);

		var my_data =
			{ method: 'update'
			, table :  my_args.table_name
			, set	:  my_args.field_name + '=\'' + my_file_type + '\''
			, where :  'id=' + my_row_id
			};
		JKY.ajax(false, my_data);

		JKY.hide('jky_loading');
	});

	my_photo.bind('Error', function(up, error) {
		JKY.show('jky_loading');
		JKY.display_message('error: ' + error.code + '<br>message: ' + error.message + (error.file ? '<br> file: ' + error.file.name : ''));
		up.refresh();	//	reposition Flash/Silverlight
	});

	my_photo.init();

	return {
		  program_name		: 'Upload'
		, program_version	: '1.0.0'
		, set_row_id		: function(the_row_id)	{my_row_id = the_row_id;}
		, start_upload		: function()			{my_photo.start();}
	};
};