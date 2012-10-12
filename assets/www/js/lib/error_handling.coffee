

class ErrorHandler
  constructor: () ->
    
  handleError: (exception)->  
    error_code = @errorCode()
    console.log("Sending error: #{JSON.stringify(exception)}");
    Bugsense.notify({
      error: exception
      code: error_code
    });
    main.showDialogWithMessage("Feilen rapporteres til utviklingsteamet. Hvis du ønsker å bidra med ytligere informasjon, noter koden \"#{error_code}\" og send en mail.", "En feil har oppstått");
 
  
  hookInto : ()->
    jQuery("[onclick]").each (index, obj) ->
      if(obj.onclick)
        funksjon = obj.onclick
        obj.onclick = E(funksjon)
        
  errorCode : ()->
    return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);

  


window.customErrorHandler = new ErrorHandler()

window.onerror = (error)-> window.customErrorHandler.handleError(error)
  

E = (funksjon) ->
  ()->
    try
      funksjon()
    catch e 
      console.log("catched #{JSON.stringify(e)}")
      window.customErrorHandler.handleError(e)
  



