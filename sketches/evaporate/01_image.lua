
require "strict"

local folder = "write_alpha"
local count = 0

----------------------------------------------------
function setup()
    png.load("/assets/ink/tests/"..folder..".png")
    px.framerate( 30 )
end

----------------------------------------------------
function draw()

    px.clear()
    px.color(255)
    
    png.select( folder )
    if lfo.clock(15) then 
        png.draw( px.width()/2,  88 * count )  
        
        count = count + 1 
        if count == 9 then
            count = 1
        end
    end
    
end
