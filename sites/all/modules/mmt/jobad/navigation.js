/*************************************************************************
* This file is part of the MathHub.info System  (http://mathhub.info).   *
* It is hosted at https://github.com/KWARC/MathHub                       *
* Copyright (c) 2015 by the KWARC group (http://kwarc.info)              *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html          *
**************************************************************************/

var navigation = {
	info: {
		'identifier' : 'kwarc.mmt.navigation',
		'title' : 'MMT Navigation Service',
		'author': 'MMT developer team',
		'description' : 'The navigation service for browsing MMT repositories',
		'version' : '1.0',
		'dependencies' : [],
		'hasCleanNamespace': false
	},
	
	init: function(JOBADInstance) {
		//updateVisibility(document.documentElement);
		$('#currentstyle').text(mmt.notstyle.split("?").pop());
		var query = window.location.search.substring(1);
		this.navigate(query);
	},

	navigate : function (uri) {
		// main div
		var url = mmt.adaptMMTURI(uri, '', true);
		mmt.ajaxReplaceIn(url, 'main');
		// breadcrumbs
		var bcurl = '/:breadcrumbs?' + uri;
		mmt.ajaxReplaceIn(bcurl, 'breadcrumbs');
	},

	leftClick: function(target, JOBADInstance) {
	   //handling clicks on parts of the document
      if(target.hasAttribute('mmtlink')) {
			var uri = target.attr('mmtlink');
			console.log(uri);
			this.navigate(uri);
		}
		if(target.hasAttribute('loadable')) {
			var elem = target.parent().get(0);
			var ref = mmt.load(elem);
			$(ref).find('span').attr('foldable', 'true');
			$(elem).replaceWith(ref);
		}
		if(target.hasAttribute('jobad:flattenable')) {
			var elem = target.parent().get(0);
			var loaded = mmt.load(elem);
			var fc = $(elem).children().filterMClass('flat-container');
			fc.children().replaceWith(loaded);
			fc.toggle()
		}
		if(target.hasAttribute('foldable')) {
			var content = $(target).parent().find('table').toggle();				
		}
		if (target.hasAttribute(mmtattr.symref)) {
			var mr = $(target).closest('mrow');
			var select = (mr.length == 0) ? target[0] : mr[0];
			mmt.setSelected(select);
			return true;
		}
		// highlight bracketed expression
		if (mmt.getTagName(target[0]) == 'mfenced') {
			mmt.setSelected(target[0]);
			return true;
		}
		// highlight variable declaration
		if (target.hasAttribute(mmtattr.varref)) {
			/* var v = $(target).parents('mrow').children().filter('[jobad:mmtref=' +  target.attr(mmtattr.varref) + ']');
			   this.setSelected(v[0]);*/
			alert("Unsupported");
			return true;
		}
		
		mmt.unsetSelected();	
		return true;	//we did stuff also
	},
  
};

JOBAD.modules.register(navigation);

