

class ErrorHandler
  constructor: () ->
    
  handleError: (exception)->  
    console.log("Sending error: #{JSON.stringify(exception)}");
    Bugsense.notify({
      error: exception
    });
    main.showDialogWithMessage("Feilen rapporteres til utviklingsteamet. Hvis du ønsker å bidra med ytligere informasjon, merk tidspunktet og send en mail.", "En feil har oppstått");
 
  
  hookInto : ()->
    jQuery("[onclick]").each (index, obj) ->
      if(obj.onclick)
        funksjon = obj.onclick
        obj.onclick = E(funksjon)

window.customErrorHandler = new ErrorHandler()

window.onerror = (error)-> window.customErrorhandler.handleError(error)
  

E = (funksjon) ->
  ()->
    try
      funksjon()
    catch e 
      console.log("catched #{JSON.stringify(e)}")
      window.customErrorHandler.handleError(e)
  



