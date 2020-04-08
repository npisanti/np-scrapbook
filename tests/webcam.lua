
require "strict"

----------------------------------------------------
function reload()
    px.title( "webcam test" )
    px.canvas( 640, 480 )

	cam.resolution( 640, 480 )
    cam.open(0)
end

----------------------------------------------------
function loop()
    px.begin()
    px.clear()
		cam.draw( 0, 0 )
    px.finish() 
end
