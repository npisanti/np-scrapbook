
require "strict"

local tilew = 400
local tileh = 100

local scale = 0.75

local threshold = 0.2
local smooth = 0.02

local camw = 1280 
local camh = 720
local camid = 0

--[[
	KEYS:
		wasd/arrows = move tile
		q/l = lock webcam 
		\1234 = preview modes 
		e/spacebar = acquire 
--]]

-- variables --------
local numsaved = 0
local cx = 0
local cy = 0
local lock_cam = false
local preview = 0
local framemem = 0

----------------------------------------------------
function reload()
    px.title( "framescan" )

	cam.resolution( camw, camh )
    cam.open( camid )
	cx = (camw-tilew) / 2
	cy = (camh-tileh) / 2

    frag.load( "process.frag" ) 

	png.load( "output/", "output" )
	png.select("output")
	numsaved = png.size()

	local canvash = camh*scale 
	local tile2 = tileh*2 + 40 
	if tile2>canvash then 
		canvash = tile2
	end
	
	px.window( camw*scale + 40 + tilew, camh*scale + 20 )
	px.make_layer( "default", camw*scale + 20 + tilew, canvash ) 
	px.make_layer( "cam", camw, camh ) 
	px.make_layer( "cut", tilew, tileh )
	px.disable_layer( "cut" )
	px.disable_layer( "cam" )
end

----------------------------------------------------
function loop()
	png.mode_corner() 
	png.select( "output" )	

	if not lock_cam then 
		px.select("cam")
		px.begin()
			cam.draw( 0, 0 )
		px.finish()
	end

    frag.begin( "process" )
        frag.uniform( "u_low", threshold )
        frag.uniform( "u_high", threshold + smooth )
    frag.finish() 

	px.select("cut")
	px.begin()
		px.push()
			px.clear( 0, 0, 0, 0 )
			px.translate( -cx, -cy ) 
			px.color( 255 )
			px.pipe( "cam" )	
		px.pop()
	px.finish()

	px.select("default")
	px.begin()
		px.clear( 0, 0, 0, 0 )
		px.push()
		px.scale( scale, scale ) 
			px.pipe( "cam" )
			overlay( cx, cy, tilew, tileh )
		px.pop()

		px.push()
			px.translate( camw*scale + 20, 20 )

			px.color(255)
			if preview == 0 then 
				px.pipe( "cut" )
			elseif preview == 1 then 
				png.frame( 0 )
				png.draw( 0, 0 )
			elseif preview == 2 then 
				png.frame( png.size()-1 )
				png.draw( 0, 0 )	
			elseif preview == 3 then 
				px.pipe( "cut" )
				px.blendmode_add()
				px.color( 255, 0, 0 )
				png.frame( 0 )
				png.draw( 0, 0 )
			elseif preview == 4 then
				px.pipe( "cut" )
				png.frame( png.size()-1 )
				px.blendmode_add()
				px.color( 255, 0, 0 )
				png.draw( 0, 0 )	
			end
			png.frame( framemem )
			
			overlay( 0, 0, tilew, tileh )

			px.blendmode_alpha()
			
			px.translate( 0, tileh+20 )

			px.color(255)

			if lfo.clock( 10 ) then 
				framemem = png.next()				
			end
			png.draw( 0, 0 )		
		px.pop()
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
	--print(  "key "..tostring(key) )

	if pressed then 
		if key==113 or key==108 or key==81 or key==76 then -- Q or L 
			lock_cam = not lock_cam
		elseif key==32 or key==101 or key==69 then -- E or spacebar
		
			local filename = "output/frame_"
			if numsaved<10 then 
				filename = filename.."00"
			elseif numsaved<100 then 
				filename = filename.."0"
			end

			filename = filename..tostring(numsaved)..".png"
			px.save( filename, "cut" )
			png.load( "output/", "output" )
			numsaved = numsaved + 1 
		elseif key==65 or key==57356 then -- A 
			cx = cx-1;
		elseif key == 97 then -- shift+A 
			cx = cx-25
		elseif key==68 or key==57358 then -- D
			cx = cx+1
		elseif key == 100 then -- shift+D 
			cx = cx+25
		elseif key==87 or key==57357 then -- W
			cy = cy-1
		elseif key==119 then -- shift+W
			cy = cy-25
		elseif key==83 or key==57359 then -- S
			cy = cy+1
		elseif key==115 then -- shift+S
			cy = cy+25		
		elseif key==49 or key==50 or key==51 or key==52 then -- C 
			preview = key - 48
		end 
	else
		if key==49 or key==50 or key==51 or key==52 then -- C 
			preview = 0
		end 
	end
end
