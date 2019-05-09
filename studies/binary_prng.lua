
-- graphic parameters
segments = 26 -- must be even, try 26-34 range

-- export parameters
resolution = 1

----------------------------------------------------
function setup()
    us.size( 300*resolution, 800*resolution )
end

----------------------------------------------------
function draw()
    us.relative()
    us.translate( 0.0, -0.5 )
        
    local step = 1.0 / (segments + 4.0)

    us.background( 255, 255, 255, 255 )

    -- draws the outline 
    
    us.strokeWidth( 0.003 )
    us.stroke( 0 )
    us.begin()
        for i=2, segments do           
            if i%2==0 then 
                us.moveTo( 0.0, step*i )
                local nexti = i + 1.0 
                us.lineTo(  0.0, step*nexti  )
            end
        end    
    us.close()
    
    us.fill( 0 )
    us.begin()
        local cradius = 0.005
        us.circle( 0, (segments+2.)*step + cradius*0.5, cradius )
    us.close()

end

----------------------------------------------------
function exit()

end


