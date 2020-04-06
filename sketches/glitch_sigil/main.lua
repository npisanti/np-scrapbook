
----------------------------------------------------
function setup()
    frag.load( "background", "background.frag" )
    frag.load( "glitch", "glitch.frag" )
    
    px.canvas( 480, 800 )
end

----------------------------------------------------
function draw()

    px.begin() 
        px.clear( 0, 0, 0, 255 )
    px.finish()

    frag.apply( "background" )

    px.begin()
    px.translate( px.width()*0.5, px.height()*0.5 )

    local offset = 0.1 * px.width()
    local side = 0.05 * px.width()
    local stroke = 0.02 * px.width()
    
    px.fill()

    for i=1,3 do 
        local m0 = lfo.triangle( 0.13 + i*0.019 )

        px.color( 255, m0*m0*255 )
        px.begin_shape()
            px.polypath( 0.0, offset*i,  side, 4 )
            px.next()
            px.polypath( 0.0, offset*i,  side-stroke, 4 )
        px.end_shape()
        
        px.begin_shape()
            px.polypath( 0.0, -offset*i, side, 4 )
            px.next()
            px.polypath( 0.0, -offset*i, side-stroke, 4 )
        px.end_shape( true )
        
        local m1 = lfo.triangle( 0.2 + i*0.017 ) 

        px.color( 255, m1*m1*255 )
        px.begin_shape()
            px.polypath( offset*i, 0, side, 4 )
            px.next()
            px.polypath( offset*i, 0, side-stroke, 4 )
        px.end_shape()
        
        px.begin_shape()
            px.polypath( -offset*i, 0, side, 4 )
            px.next()
            px.polypath( -offset*i, 0, side-stroke, 4 )
        px.end_shape( true )
          
    end
    px.finish()
    
    frag.apply( "glitch" )

end

----------------------------------------------------
function exit()

end


