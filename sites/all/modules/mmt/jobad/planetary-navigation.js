(function($){

var planetaryNavigation = {
	info: {
		'identifier' : 'kwarc.mmt.planetary.navigation',
		'title' : 'MMT Navigation Service in Planetary',
		'author': 'MMT developer team',
		'description' : 'The navigation service for browsing MMT repositories in Planetary',
		'version' : '1.0',
		'dependencies' : [],
		'hasCleanNamespace': false
	},
  

    leftClick: function(target, JOBADInstance) {
		if(target.hasAttribute('jobad:href') && target.hasAttribute('data-relative')) {
			var uri = target.attr("jobad:href");
			var uriEnc = planetary.relNavigate(uri);
		}
		return false;
    },


    contextMenuEntries: function(target, JOBADInstance) {
    	var res = {};
		if (target.hasAttribute('jobad:href')) {			
			var mr = $(target).closest('mrow');
			var select = (mr.length === 0) ? target : mr[0];
			mmt.setSelected(select);
			var uri = target.attr('jobad:href');
			var me = this;
			res['Go To Declaration'] = function() {planetary.navigate(uri);};
			res['Show Definition'] = function() {
				$.ajax({ 
				  'url': mmtUrl + "/:planetary/getRelated",
   	  			  'type' : 'POST',
			      'data' : '{ "subject" : "' + uri + '",' + 
			      	'"relation" : "isDefinedBy",' + 
			        '"return" : "planetary"}',
			       'dataType' : 'html',
			       'processData' : 'false',
	       			'contentType' : 'text/plain',
	              'crossDomain': true,
                  'success': function cont(data) {
  					$('#dynamic_modal_content').html(data);
  					$('#dynamic_modal').modal();
                  },
                  'error' : function( reqObj, status, error ) {
					console.log( "ERROR:", error, "\n ",status );
		    	  },
                });
			};
		}
		return res;
	},
    
};

JOBAD.modules.register(planetaryNavigation);
})(jQuery);
	