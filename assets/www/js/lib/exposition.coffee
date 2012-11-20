class Exposition
  
  constructor : (string, @callbacks) ->
    if(string.length != 8)
      @expositions = "00000000".split("")
    else
      @expositions = string.split("")
    
  toggle: (expo) ->
    @change(@indexFromExpo(expo))
    @callCallback(expo)
  
  indexFromExpo : (expo) ->
    switch expo
        when "NV" then 0
        when "N" then 1
        when "NØ" then 2
        when "Ø" then 3
        when "SØ" then 4
        when "S" then 5
        when "SV" then 6
        when "V" then 7
    
  change: (index) ->
    if(@expositions[index] == "1")
      @expositions[index] = "0"
    else
      @expositions[index] = "1"
  
  callCallback: (expo) ->
    @callbacks[expo](@expositions[@indexFromExpo(expo)] == "1") if @callbacks[expo]
    
  refresh : ()->
    jQuery.each(["NV", "N", "NØ", "Ø", "SØ", "S", "SV", "V"], (i, expo)=>
      @callCallback(expo)
    )
      
  toString: ()->
    @expositions.join("")
    
