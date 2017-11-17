$(document).ready(function(){


	// Slider
	$('#slider').owlCarousel({

		// Most important owl features
		items: 1,
		singleItem: true,

		// Basic Speeds
		slideSpeed: 200,
		paginationSpeed: 800,
		rewindSpeed: 1000,

		// Autoplay
		autoplay: 4000,
		autoplayHoverPause: true,

		// Navigation
		nav: true,
		navText: false,
		rewindNav: true,
		scrollPerPage: true,

		// Pagination
		pagination: false,

		// Responsive 
		responsiveClass: true,

		// Lazy load
		lazyLoad: false,
		lazyFollow: true,
		lazyEffect: 'fade',

		// Auto height
		autoHeight: false,

		// Mouse Events
		dragBeforeAnimFinish: true,
		mouseDrag: true,
		touchDrag: true,

		// Transitions
		transitionStyle: 'fadeUp',

		// Other
		addClassActive: true

	});



	// Feedback Popup
	var modalDialogMouseOvered = false;
	var modal_holder = $('.modal-holder');
	
	$('#feedback-trigger').on('click', function(){
		modal_dialog = $($(this).attr('modal-dialog'));
		doModalVisible(modal_holder, modal_dialog);
		return false;
	});

	$('#test-trigger').on('click', function(){
		modal_dialog = $($(this).attr('modal-dialog'));
		doModalVisible(modal_holder, modal_dialog);
		return false;
	});

	$('.modal-dialog').on('mouseover', function(){ modalDialogMouseOvered = true; });
	$('.modal-dialog').on('mouseout', function(){  modalDialogMouseOvered = false; });

	$('.modal-holder').on('click', function(){
		if (!modalDialogMouseOvered) {
			doModalHidden($(this), $(this).find('.modal-dialog.isVisible'));
		}
	});

	$('.modal-close').on('click', function(){
		doModalHidden($(this).parents('.modal-holder'), $(this).parents('.modal-dialog'));
	});



	// do Modal Visible
	function doModalVisible(holder, dialog){
		
		if (holder.length > 0 && dialog.length > 0) {

			$('body').removeClass('overflow-hidden');

			if (device.windows()) {
				
				scroll_width = 0;
			
				doc_width_before = $(window).width();
					$('body').addClass('overflow-hidden');
						doc_width_after = $(window).width();

				scroll_width = doc_width_after - doc_width_before;

				$('body').css({'margin-right': scroll_width});

			}
			else {

				$('body').addClass('overflow-hidden');

			}

			holder.addClass('isVisible');
			holder.scrollTop(0);
			holder.find('.modal-dialog.isVisible').removeClass('isVisible');

			dialog.addClass('isVisible');

		}
		else {
			alert('error');
		}

	}



	// do Modal Hidden
	function doModalHidden(holder, dialog){

		if (holder.length > 0 && dialog.length > 0) {
		
			holder.addClass('isHidden');
			dialog.addClass('isHidden');

			setTimeout(function(){
				
				holder.removeClass('isVisible').removeClass('isHidden');
				dialog.removeClass('isVisible').removeClass('isHidden');
				$('body').css({'margin-right': 0});
				$('body').removeClass('overflow-hidden');

			}, 150);

		}

	}



});