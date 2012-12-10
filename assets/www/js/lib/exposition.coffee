class Exposition
  
  constructor : (string, @callbacks) ->
    if(string.length != 8)
      @expositions = "00000000".split("")
    else
      @expositions = string.split("")
    
    @callbacks["*"](@toHumanString())
    
  toggle: (expo) ->
    @change(@indexFromExpo(expo))
    @callCallback(expo)
  
  indexFromExpo : (expo) ->
    switch expo
        
        when "N" then 0
        when "NØ" then 1
        when "Ø" then 2
        when "SØ" then 3
        when "S" then 4
        when "SV" then 5
        when "V" then 6
        when "NV" then 7
        
  indexToExpo : (index) ->
    switch index
        when 0 then "N"
        when 1 then "NØ"
        when 2 then "Ø"
        when 3 then "SØ"
        when 4 then "S"
        when 5 then "SV"
        when 6 then "V"
        when 7 then "NV" 
    
  change: (index) ->
    if(@expositions[index] == "1")
      @expositions[index] = "0"
    else
      @expositions[index] = "1"
    
    @callbacks["*"](@toHumanString())
  
  callCallback: (expo) ->
    @callbacks[expo](@expositions[@indexFromExpo(expo)] == "1") if @callbacks[expo]
    
  refresh : ()->
    jQuery.each(["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"], (i, expo)=>
      @callCallback(expo)
    )
      
  toString: ()->
    @expositions.join("")
    
  toHumanString: ()->
    letters = []
    jQuery.each(@expositions, (i, letter) =>
      if(letter == "1")
        letters.push(@indexToExpo(i))
    )
    
    letters.join(",")
    
