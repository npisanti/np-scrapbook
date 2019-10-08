
require "strict"

local folder = "write_alpha"
local count = 0
local step;

----------------------------------------------------
function setup()
    
    png.load("/assets/ink/tests/"..folder..".png")
    px.framerate( 30 )

    -- px.resize( 480, 480 )
end


----------------------------------------------------
function draw()

    step = px.height() / 9
    
    px.clear()
    px.color(255)
    
    png.select( folder )
    if lfo.clock(15) then 
        png.draw( px.width()/2,  step * count )  
        
        count = count + 1 
        if count == 9 then
            count = 1
        end
    end
    
end
