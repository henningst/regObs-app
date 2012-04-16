var ice_page = {
		
	reports: null,
	
	generate : function() {
		
		this.reports = 
			[
			 {name:"John",description:"Doe",height:50,terrain:"blue"},
			 {name:"Peter",description:"ad",height:51,terrain:"red"},
			 {name:"Bjon",description:"rg",height:52,terrain:"yellow"},
			 {name:"Jim",description:"Dte",height:53,terrain:"pink"},
			 ];
	},
	
	init: function() {

		$('header_middle_text').innerHTML = "Is";
		this.generate();
		this.reports.push({name:"Jim Beam",description:"Dte",height:53,terrain:"pink"});
	},
};