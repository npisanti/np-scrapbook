
require "strict"

-- settings ---------
local camw = 640
local camh = 480 

-- variables --------
local numsaved = 0
local freeze = 0

----------------------------------------------------
function reload()
    px.title( "shadercam" )
    
    if px.args() > 0 then 
        frag.load( px.arg(0), "process" ) 
    end     

	cam.resolution( camw, camh )
    cam.open(0)

	px.canvas( camw, camh )
end

----------------------------------------------------
function loop()
	freeze = freeze + 1
		if freeze > 0 then 
	
	    px.begin()
	    px.clear()
			cam.draw( 0, 0 )
	    px.finish() 
	
	   	frag.apply( "process" )
	end
end

----------------------------------------------------
function key_pressed( key, pressed )

	if key == 32 and pressed then 
		local filename = "shadercam_output_"..tostring(numsaved)..".png"
		px.save( filename, "default" )
		freeze = -40
		numsaved = numsaved + 1
		print( filename )
	end 
end
