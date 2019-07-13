
require "strict"

----------------------------------------------------
function setup()
    px.size( 320, 320 )
end

----------------------------------------------------
function draw()
    px.clear()
    px.fill( false )

    --local cx = lfo.noise( 0.15, 0 ) * px.width()
    --local cy = lfo.noise( 0.15, 1 ) * px.height()
    --local cx = px.width() * 0.5
    --local cy = px.height() * 0.5
    local cx = px.width() * control_x
    local cy = px.height() * control_y 
    px.translate( cx, cy )

    local off = 20
    px.begin()
        px.poly( 0, 0, 8, 3 )
    px.finish(true)
    
    px.fill()
    
    px.rotate( lfo.ramp(0.2) * math.pi * 2 )
    
    for i=1,3 do 
        px.push()
        px.rotate( lfo.triangle( 0.17 + i*0.05 ) * math.pi * 2 )
        px.circle( off,  0, 2 )
        px.point( -off, 0 )
        px.pop()
    end
        
end

----------------------------------------------------

----------------------------------------------------
function exit()

end


