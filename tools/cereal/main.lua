
require "strict"

local index = 0 

----------------------------------------------------
function reload()
    px.title( "cereal" )

	png.load( "input" )
	png.select( "input" )
	index = png.size()

    frag.load( "process.frag" ) 

	px.canvas( png.width(), png.height() )
end

----------------------------------------------------
function loop()
	png.select( "input" )
	png.mode_corner()
	
    px.begin()
    px.clear()
    	px.clear( 0, 0, 0, 0 )
		png.draw( 0, 0 )
    px.finish() 

   	frag.apply( "process" )

	if index == png.size() then
		if lfo.clock( 4 ) then 
			png.next()
		end
	else
		local filename = "output/frame_"..tostring(index)..".png"
		px.save( filename, "default" )	
		index = index+1 
		png.frame( index )
	end 
end

----------------------------------------------------
function key_pressed( key, pressed )
	if key == 32 and pressed then 
		index = 0
	end 
end
