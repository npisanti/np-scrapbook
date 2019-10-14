
require "strict"

local count = 0
local col = 255;

----------------------------------------------------
function setup()
    png.load( "sigil", "/assets/ink/tests/sigil_alpha.png")
    
    frag.load( "aura", "aura.frag" )
    
    px.size( 480, 800 )
end

----------------------------------------------------
function draw()

    frag.begin( "aura" )
        frag.uniform( "u_background", 0.0, 0.0, 0.0 )
        frag.uniform( "u_feedback", 0.99 )
    frag.finish()

    px.begin()
        px.scale( 2.0, 2.0 )
        
        if lfo.clock(160) then
        
            if count == 0 then 
                count = 1
                col = 255        
            else
                count = 0
                col = 0
            end
            
        end
        
        px.color( col )
        png.select( "sigil" )
        png.draw( px.width()/4, px.height()/4 )  
        
    px.finish()
    
end

