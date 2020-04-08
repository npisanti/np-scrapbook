
require "strict"

----------------------------------------------------
function reload()

	local info = "args.lua got "..tostring( px.args() ).." args"

	print( info ) 

	for i=0,px.args()-1 do 
		print ( "    "..px.arg(i) )
	end

    px.canvas( 480, 480 )
end

----------------------------------------------------
function loop()
    px.begin()
   	

    px.finish()
end
