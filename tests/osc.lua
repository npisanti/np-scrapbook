
require "strict"

----------------------------------------------------
function setup()
    osc.setup_receiver( 4444 )
    
    px.canvas( 480, 480 )
end

----------------------------------------------------
function draw()
    px.begin()
    px.clear()

    px.finish()
end


function osc_received()

    --local num = osc.number(1) * 1023.0
    local info = "address="..osc.address().." "..osc.number(0).." "..osc.number(1)
    print( info )
end
