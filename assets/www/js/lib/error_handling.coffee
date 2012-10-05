

class ErrorHandler
  constructor: () ->
    
  handleError: ()->
    console.log("Sending error: #{JSON.stringify(arguments)}");
    Bugsense.notify({
      error: arguments
    });
  
  hookInto : ()->
    jQuery("[onclick]").each (index, obj) ->
      if(obj.onclick)
        funksjon = obj.onclick
        obj.onclick = E(funksjon)

window.customErrorHandler = new ErrorHandler()

window.onerror = ()->
  window.customErrorHandler.handleError.call(this, arguments)
  main.showDialogWithMessage("Feilen rapporteres til utviklingsteamet. Hvis du ønsker å bidra med ytligere informasjon, merk tidspunktet og send en mail.", "En feil har oppstått");

E = (funksjon) ->
  ()->
    try
      funksjon()
    catch e 
      window.onerror.call(this, e)
  



