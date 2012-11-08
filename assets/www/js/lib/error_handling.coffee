

class ErrorHandler
  constructor: () ->
    
  handleError: (exception)->  
    error_code = @errorCode()
    stacktrace = printStackTrace();
    console.log("pp: feil catched " + exception)
    
    Bugsense.notify({
      error: exception
      code: error_code
      stack : stacktrace
    });
    main.showDialogWithMessage("Feilen rapporteres til utviklingsteamet. Hvis du ønsker å bidra med ytligere informasjon, noter koden \"#{error_code}\" og send en mail.", "En feil har oppstått");
 
  
  hookInto : ()->
    jQuery("[onclick]").each (index, obj) ->
      console.log("pp: onclick hook "+ obj)
      if(obj.onclick)
        funksjon = obj.onclick
        obj.onclick = E(funksjon)
        
  errorCode : ()->
    Math.floor(Math.random() * 0x10000).toString(16)

  
window.customErrorHandler = new ErrorHandler()

window.onerror = (error)-> 
  console.log("pp: window error " + error)
  window.customErrorHandler.handleError(error)
  

E = (funksjon) ->
  ()->
    try
      funksjon()
    catch e 
      console.log("E catched #{JSON.stringify(e)}") 
      window.customErrorHandler.handleError(e)
  



