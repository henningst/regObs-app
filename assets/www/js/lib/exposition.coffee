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
        when "NV" then 0
        when "N" then 1
        when "NØ" then 2
        when "Ø" then 3
        when "SØ" then 4
        when "S" then 5
        when "SV" then 6
        when "V" then 7
        
  indexToExpo : (index) ->
    switch index
        when 0 then "NV" 
        when 1 then "N"
        when 2 then "NØ"
        when 3 then "Ø"
        when 4 then "SØ"
        when 5 then "S"
        when 6 then "SV"
        when 7 then "V"
    
  change: (index) ->
    if(@expositions[index] == "1")
      @expositions[index] = "0"
    else
      @expositions[index] = "1"
    
    @callbacks["*"](@toHumanString())
  
  callCallback: (expo) ->
    @callbacks[expo](@expositions[@indexFromExpo(expo)] == "1") if @callbacks[expo]
    
  refresh : ()->
    jQuery.each(["NV", "N", "NØ", "Ø", "SØ", "S", "SV", "V"], (i, expo)=>
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
    
