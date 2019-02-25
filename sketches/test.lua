
----------------------------------------------------
function setup()

    -- execyting bash command from pipe
    local handle = io.popen( "figlet 'hello world' " )
    local result = handle:read("*a")
    print ( result ) 
    handle:close()
    
end

----------------------------------------------------
function draw()
    
    --npg.background( 30, 0, 0, 255 )
    npg.clear()
    npg.strokeA()
    
    npg.strokeWidth( 15 )
    npg.setCapSquare()
    npg.setJoinBevel()
    npg.stroke() -- defaults to white 
    
    npg.begin()
        npg.moveTo( 50, 50 )
        npg.lineTo( 100, 100 )
        npg.lineTo( 100, 200 )
        npg.lineTo( 60, 200 )
    npg.close()
    
    npg.fillA()
    npg.push()
        npg.translate( 200, 0 )

        npg.begin()
            npg.circle( 200, 200, 60 + 80 * lfo.sine( 0.2 ) )
            npg.holes()
            npg.circle( 200, 200, 80 )
            npg.rect( 60, 200, 300, 30 )
            npg.circle( 200, 200, 60 )
        npg.close()
    npg.pop()
    
    npg.setJoinMiter()
    npg.strokeB()
    npg.begin()
        npg.poly( 200, 350, 140, 3 )
        
        npg.circle( 200, 350,  20+ lfo.triangle( 0.8 )*40 )
    npg.close()
end

----------------------------------------------------
function exit()

end


