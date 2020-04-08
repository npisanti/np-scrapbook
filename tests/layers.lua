
require "strict"

----------------------------------------------------
function reload()
    px.title( "layers test" )
    px.window( 480, 480 )
    px.make_layer( "one", 480, 480 )
    px.make_layer( "two", 480, 480 )
end

----------------------------------------------------
function loop()
    px.layer("one")
    px.begin()
    px.clear()
        px.rect( 50, 50, 50, 50 )
    px.finish()
    
    px.layer("two")
    px.begin()
    px.clear()
        px.translate( 0, 100 )
        --px.overlay( "one" )
        px.pipe( "one" )
        px.rect( 250, 50, 50, 50 )
    px.finish()
end

----------------------------------------------------
function key_pressed( key, pressed )

	local info = "key="..tostring(key).." "
	print ( info ) 

	if key == 32 then 
		print( "saving" ) 
		px.save( "test.png", "one" ) 
	end 
end
