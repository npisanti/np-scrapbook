
require "strict"

local blackground = true

----------------------------------------------------
function reload()
    px.title( "shader" )
    
    if px.args() > 0 then 
        frag.load( px.arg(0), "process" ) 
    end    

	png.load( "tests" )

	px.canvas( 480, 480 )
end

----------------------------------------------------
function loop()
    frag.apply( "process" )

	png.select( "tests" );

	if lfo.clock( 60 ) then 
		if blackground then 
	    	px.begin()
		        px.clear( 0, 0, 0, 0 )
		        px.color( 255 ) 
		        png.draw( px.width()*0.5, px.height()*0.5 )
		        png.next()
		    px.finish()	
		else 
	    	px.begin()
		        px.clear( 255, 255, 255, 255 )
		        px.color( 0 ) 
		        png.draw( px.width()*0.5, px.height()*0.5 )
		        png.next()
		    px.finish() 
		end 
	end 

end

----------------------------------------------------
function key_pressed( key, pressed )
	if pressed and key==32 then
		blackground = not blackground;
	end
end 

