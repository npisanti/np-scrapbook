
require "strict"

local count = 0

----------------------------------------------------
function reload()
    png.load( "/assets/ink/tests/write_alpha.png", "phrase" )
    
    frag.load( "evaporate.frag", "evaporate" )

    px.canvas( 480, 800 )
    
    px.begin()
        px.clear( 255, 255, 255, 255 )
    px.finish()
end

----------------------------------------------------
function loop()
    frag.begin( "evaporate" )
        frag.uniform( "u_background", 1.0, 1.0, 1.0 )
        frag.uniform( "u_feedback", 0.99 )
        frag.uniform( "u_wind", 0.0004 )
    frag.finish()

    px.begin()
        px.scale( 2.0, 2.0 )
        
        if lfo.clock(160) then
            px.color(0)    

            png.select( "phrase" )
            png.draw( px.width()/4, px.height()/4 )  
        end
    px.finish()
end
