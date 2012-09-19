var learning_page = {
		
		init: function(lastPage) 
		{
			$('header_middle_text').innerHTML = "Beskrivelse";
			jQuery("#regobs-name").hide();
			
			switch(lastPage) 
			{
			case 'snow': 
    			break;
    			
    		case 'snow_obs': 
    			break;
    			
    		case 'snow_picture': 
    			$('learning_content').innerHTML = SNOW_PICTURE;
    			break;
    			
    		case 'snow_hendelse': 
    			$('learning_content').innerHTML = SNOW_INCIDENT;
    			break;
    			
    		case 'snow_faresign': 
    			$('learning_content').innerHTML = SNOW_DANGERSIGN;
    			break;
    		case 'snow_surface':
    			$('learning_content').innerHTML = SNOW_SURFACE;
    			break;
    			
    		case 'water': 
    			break;

    		case 'water_obs': 
    			break;
    			
    		case 'water_picture': 
    			$('learning_content').innerHTML = WATER_PICTURE;
    			break;
    			
    		case 'water_hendelse': 
    			$('learning_content').innerHTML = WATER_INCIDENT;
    			break;
    			
    		case 'water_faresign': 
    			$('learning_content').innerHTML = WATER_DANGERSIGN;
    			break;
    			
    		case 'ice': 
    			break;
    			
    		case 'ice_obs': 
    			break;
    			
    		case 'ice_picture': 
    			$('learning_content').innerHTML = ICE_PICTURE;
    			break;
    			
    		case 'ice_hendelse': 
    			$('learning_content').innerHTML = ICE_INCIDENT;
    			break;
    			
    		case 'ice_faresign': 
    			$('learning_content').innerHTML = ICE_DANGERSIGN;
    			break;
    			
    		case 'dirt': 
    			break;
    			
    		case 'dirt_obs': 
    			break;
    			
    		case 'dirt_picture': 
    			$('learning_content').innerHTML = DIRT_PICTURE;
    			break;
    			
    		case 'dirt_hendelse': 
    			$('learning_content').innerHTML = DIRT_INCIDENT;
    			break;
    			
    		case 'dirt_faresign': 
    			$('learning_content').innerHTML = DIRT_DANGERSIGN;
    			break;
    			
    		case 'dirt_avalange': 
    			$('learning_content').innerHTML = DIRT_AVALANGE;
    			break; 
    			
    		default:
    			break;
			
			}
		}
		
}