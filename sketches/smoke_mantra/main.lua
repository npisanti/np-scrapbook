
require "strict"

local count = 1

----------------------------------------------------
function reload()
    
    png.load( "/assets/ink/tests/write_alpha.png",  "phrase" )
    
    frag.load(  "dissolve.frag", "dissolve" )
    
    px.canvas( 480, 480 )

    px.begin()
        px.clear( 255, 255, 255, 255 )
    px.finish()
end


----------------------------------------------------
function loop()
    
    frag.begin( "dissolve" )
        frag.uniform( "u_background", 1.0, 1.0, 1.0 )
        frag.uniform( "u_feedback", 0.992 )
    frag.finish()
    
    px.begin()    
        if lfo.clock(60) then 
            local step = px.height() / 9
       
            px.color( 0 )
            
            png.select( "phrase" )
            png.draw( px.width()/2,  step * count )  
            
            count = count + 1 
            if count == 9 then
                count = 1
            end
        end
    px.finish()
    
end
