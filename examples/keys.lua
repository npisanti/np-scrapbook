
require "strict"

----------------------------------------------------
function reload()
    
    px.canvas( 480, 480 )
end

----------------------------------------------------
function loop()
    px.begin()
    px.clear()


    px.finish()
end

----------------------------------------------------
function key_pressed( key, pressed )
    if pressed then 
        print "pressed"
    else
        print "released"
    end
end
