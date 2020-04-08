
require "strict"

----------------------------------------------------
function reload()
    px.title( "shader" )
    
    if px.args() > 0 then 
        frag.load( px.arg(0), "process" ) 
    end    

	px.canvas( 480, 480 )
end

----------------------------------------------------
function loop()
    px.begin()
        px.clear()
    px.finish() 

    frag.apply( "process" )
end
