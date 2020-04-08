
require "strict"

-- settings ---------
local camw = 640
local camh = 480 
local outw = 512
local outh = 342

-- variables --------
local numsaved = 0
local freeze = 0
local offx = 0
local offy = 0 

----------------------------------------------------
function reload()
    px.title( "dithercam" )

	cam.resolution( camw, camh )
    cam.open(0)

    offx = ( outw - camw) / 2 
    offy = ( outh - camh) / 2 

    frag.load( "dither.frag" ) 

	px.canvas( outw, outh )
end

----------------------------------------------------
function loop()
	freeze = freeze + 1
		if freeze > 0 then 
	
	    px.begin()
	    px.clear()
			cam.draw( offx, offy )
	    px.finish() 
	
	   	frag.apply( "dither" )
	end
end

----------------------------------------------------
function key_pressed( key, pressed )

	if key == 32 and pressed then 
		local filename = "output_"..tostring(numsaved)..".png"
		px.save( filename, "default" )
		freeze = -40
		numsaved = numsaved + 1
		print( filename )
	end 
end
