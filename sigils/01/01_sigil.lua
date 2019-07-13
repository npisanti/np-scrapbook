
----------------------------------------------------
function setup()

end

----------------------------------------------------
function draw()

    px.translate( px.width()*0.5, px.height()*0.5 )

    local offset = 0.1 * px.height()
    local side = 0.05 * px.height()
    local stroke = 0.02 * px.height()
    
    px.fill()

    for i=1,3 do 
        local m0 = lfo.triangle( 0.13 + i*0.019 )

        px.color( 255, m0*m0*255 )
        px.begin()
            px.poly( 0.0, offset*i,  side, 4 )
            px.next()
            px.poly( 0.0, offset*i,  side-stroke, 4 )
        px.finish()
        
        px.begin()
            px.poly( 0.0, -offset*i, side, 4 )
            px.next()
            px.poly( 0.0, -offset*i, side-stroke, 4 )
        px.finish( true )
        
        local m1 = lfo.triangle( 0.2 + i*0.017 ) 

        px.color( 255, m1*m1*255 )
        px.begin()
            px.poly( offset*i, 0, side, 4 )
            px.next()
            px.poly( offset*i, 0, side-stroke, 4 )
        px.finish()
        
        px.begin()
            px.poly( -offset*i, 0, side, 4 )
            px.next()
            px.poly( -offset*i, 0, side-stroke, 4 )
        px.finish( true )
          
    end

end

----------------------------------------------------
function exit()

end


