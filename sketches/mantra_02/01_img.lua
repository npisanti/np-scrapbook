
require "strict"

local folder = "write_alpha"
local count = 0

----------------------------------------------------
function setup()
    png.load("/assets/ink/tests/"..folder..".png")
    px.framerate( 60 )
end

----------------------------------------------------
function draw()

    --px.background( 255, 255, 255, 255 )
    
    px.scale( 2.0, 2.0 )
    
    if lfo.clock(320) then
        --px.clear()
    end
    
    if lfo.clock(160) then
    
        if count == 0 then 
            count = 1
            px.color(255)            
        else
            count = 0
            px.color( 250, 70, 70 )
        end

        png.select( folder )
        png.draw( px.width()/4 -10, px.height()/4 -80 )  
    end





    

    
end

----------------------------------------------------
function exit()

end


