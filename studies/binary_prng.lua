
-- graphic parameters
segments = 26 -- must be even, try 26-34 range

-- export parameters
resolution = 1

----------------------------------------------------
function setup()
    lvg.size( 300*resolution, 800*resolution )
end

----------------------------------------------------
function draw()

    local step = 1.0 / (segments + 4.0)

    lvg.background( 255, 255, 255, 255 )
    
    -- horizontally center 
    lvg.translate( lvg.ratio()*0.5, 0.0 )

    -- draws the outline 
    
    lvg.strokeWidth( 0.003 )
    lvg.stroke( 0 )
    lvg.begin()
        for i=2, segments do           
            if i%2==0 then 
                lvg.moveTo( 0.0, step*i )
                local nexti = i + 1.0 
                lvg.lineTo(  0.0, step*nexti  )
            end
        end    
    lvg.close()
    
    lvg.fill( 0 )
    lvg.begin()
        local cradius = 0.005
        lvg.circle( 0, (segments+2.)*step + cradius*0.5, cradius )
    lvg.close()

end

----------------------------------------------------
function exit()

end


