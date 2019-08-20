
----------------------------------------------------
function setup()
    
end

----------------------------------------------------
function draw()

    px.clear()
        
    px.color( 255 )

    px.circle( lfo.noise(0.3) * px.width(), px.height() * 0.5, 10  )

end

----------------------------------------------------
function exit()

end


