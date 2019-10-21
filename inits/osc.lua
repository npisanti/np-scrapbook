
require "strict"

----------------------------------------------------
function setup()
    osc.setup_receiver( 4444 )
    osc.setup_sender( "tester", "localhost", 12345 )
end

----------------------------------------------------
function osc_received()
    print( "received" )    
    
    -- routes incomig osc to tester 
    route( "tested" ) 
end

----------------------------------------------------
function exit()
    print( "executed on exit" )    
end

