
require "strict"

local tilew = 150
local tileh = 150

local scale = 0.5

local threshold = 0.4
local smooth = 0.05

-- variables --------
local numsaved = 0
local cx = 0
local cy = 0

----------------------------------------------------
function reload()
    px.title( "tilecutter" )

	png.load( "input.jpg" ) 
    frag.load( "process.frag" ) 

	png.select( "input")
	
	px.window( png.width()*scale + 40 + tilew, png.height()*scale + 20 )
	px.make_layer( "image", png.width()*scale + 20 + tilew, png.height()*scale ) 
	px.make_layer( "cut", tilew, tileh )
	px.disable_layer( "cut" )
end

----------------------------------------------------
function loop()
	png.select( "input" )
	png.mode_corner() 

	px.select("cut")
	px.begin()
		px.color( 255 )
		--px.clear( 255, 0, 0, 255 )
		png.draw( -cx, -cy ) 
	px.finish()

	px.fill( true )
    frag.begin( "process" )
        frag.uniform( "u_low", threshold )
        frag.uniform( "u_high", threshold + smooth )
    frag.finish()

	px.select("image")
	px.begin()
		px.clear( 0, 0, 0, 0 )
		px.push()
		px.scale( scale, scale ) 
			png.draw( 0, 0 ) 
			overlay( cx, cy, tilew, tileh )
		px.pop()

		px.translate( png.width()*scale + 20, 20 )

		px.color(255)
		--px.blendmode_alpha()
		
		px.pipe( "cut" )
		overlay( 0, 0, tilew, tileh )
	px.finish()	
end

function overlay( x, y, w, h )
	px.push()
		px.fill( false )
		px.color( 255, 0, 0 )
		px.translate( x, y ) 
		px.rect( 1, 1, w-1, h-1 )
		px.line( w/2, 0, w/2, h ) 
		px.line( 0, h/2, w, h/2 ) 
	px.pop()
end

----------------------------------------------------
function key_pressed( key, pressed )

	--local info = "key "..tostring(key)
	--print( info )
	if pressed then 
		if key == 65 or key == 57356 then -- A 
			cx = cx-1;
		elseif key == 97 then -- shift + A 
			cx = cx-25
		elseif key == 68 or key == 57358 then -- D
			cx = cx+1
		elseif key == 100 then -- shift + D 
			cx = cx+25
		elseif key == 87 or key == 57357 then -- W
			cy = cy-1
		elseif key == 119 then -- shift + W
			cy = cy-25
		elseif key == 83 or key == 57359 then -- S
			cy = cy+1
		elseif key == 115 then -- shift + S
			cy = cy+25		
		elseif key == 99 or key == 67 or key == 32 then -- C or spacebar 
			local filename = "output/frame_"..tostring(numsaved)..".png"
			px.save( filename, "cut" )
			numsaved = numsaved + 1
			print( filename )
		end 
	end 
end
