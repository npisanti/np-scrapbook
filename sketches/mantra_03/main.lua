
require "strict"

local count = 0

----------------------------------------------------
function setup()
    png.load( "phrase", "/assets/ink/tests/write_alpha.png")
    
    frag.load( "evaporate", "evaporate.frag" )
    
    px.size( 480, 800 )
    
    px.begin()
        px.background( 255, 255, 255, 255 )
    px.finish()
end

----------------------------------------------------
function draw()
    frag.begin( "evaporate" )
        frag.uniform( "u_background", 1.0, 1.0, 1.0 )
        frag.uniform( "u_feedback", 0.99 )
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

----------------------------------------------------
function exit()

end


