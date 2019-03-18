
-- graphic parameters
segments = 26 -- must be even, try 26-34 range

-- export parameters
resolution = 1

----------------------------------------------------
function setup()
    mg.size( 300*resolution, 800*resolution )
end

----------------------------------------------------
function draw()

    local step = 1.0 / (segments + 4.0)
    local leafwidht = step*ratio

    mg.background( 255, 255, 255, 255 )
    
    -- horizontally center 
    mg.translate( mg.ratio()*0.5, 0.0 )

    -- draws the outline 
    
    mg.strokeWidth( 0.003 )
    mg.stroke( 0 )
    mg.begin()
        for i=2, segments do           
            if i%2==0 then 
                mg.moveTo( 0.0, step*i )
                local nexti = i + 1.0 
                mg.lineTo(  0.0, step*nexti  )
            end
        end    
    mg.close()
    
    mg.fill( 0 )
    mg.begin()
        local cradius = 0.005
        mg.circle( 0, (segments+2.)*step + cradius*0.5, cradius )
    mg.close()

end

----------------------------------------------------
function exit()

end


