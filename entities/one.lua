
require "strict"

----------------------------------------------------
function setup()

    px.size( 160*2, 160*2 )
    
end

----------------------------------------------------
function draw()

    px.clear()

    local cx = px.width() * control_x
    local cy = px.height() * control_y
    px.translate( cx, cy )

    px.fill( false )
    
    px.poly( 0, 0, 8, 3 )

    local off = 20
    px.fill()

    px.rotate( lfo.ramp(0.2) * math.pi * 2 )
    
    for i=1,3 do 
        px.push()
        px.rotate( lfo.triangle( 0.17 + i*0.05 ) * math.pi * 2 )
        px.circle( off, 0, 2 )
        px.point( -off, 0 )
        px.pop()
    end
        
end
