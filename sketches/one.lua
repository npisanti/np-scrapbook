
require "strict"

----------------------------------------------------
function setup()

    px.canvas( 400, 400  )    
end

----------------------------------------------------
function draw()
    px.begin()
    px.clear()

    local cx = px.width() * lfo.noise( 0.12, 0 )
    local cy = px.height() * lfo.noise( 0.12, 1 )
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
    
    px.finish()    
end
