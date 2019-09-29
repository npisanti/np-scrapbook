
require "strict"

local folder = "write_alpha"

----------------------------------------------------
function setup()
    png.load("/assets/ink/tests/"..folder..".png")
    px.framerate( 30 )
end

local count = 0

----------------------------------------------------
function draw()

    --px.background( 255, 255, 255, 255 )
    px.clear()
    px.color(255)
    
    png.select( folder )
    if lfo.clock(15) then 
        if count == 10 then
            count = 0
        end
        count = count + 1 
        png.draw( px.width()/2, 50 + 70 * count )  
    end
    
end

----------------------------------------------------
function exit()

end


