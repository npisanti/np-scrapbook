
require "strict"

----------------------------------------------------
function reload()

    px.canvas( 400, 400  )    
end

----------------------------------------------------
function loop()
    px.begin()
    px.clear()

    local cx = px.width() * lfo.noise( 0.22, 0 )
    local cy = px.height() * lfo.noise( 0.12, 1 )
    px.translate( cx, cy )

    px.fill( false )
    
    px.poly( 0, 0, 18, 3 )

    local off = 40
    px.fill()

    px.rotate( lfo.ramp(0.2) * math.pi * 2 )
    
    for i=1,3 do 
        px.push()
        px.rotate( lfo.triangle( 0.17 + i*0.05 ) * math.pi * 3 )
        px.circle( off, 0, 5 )
        px.circle( -off, 0, 2 )
        px.pop()
    end
    
    px.finish()    
end
