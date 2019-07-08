
----------------------------------------------------
function setup()

    for i=1,3 do 
        lfo.speed( 0.0013 + i*0.0019, i)
        lfo.speed( 0.002 + i*0.0017, i+3)
    end
    
end

----------------------------------------------------
function draw()

    px.translate( px.width()*0.5, px.height()*0.5 )

    local offset = 0.1 * px.height()
    local side = 0.05 * px.height()
    local stroke = 0.02 * px.height()
    
    px.fill()

    for i=1,3 do 
        local m0 = lfo.triangle( i )

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
        
        local m1 = lfo.triangle( i+3 ) 

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


