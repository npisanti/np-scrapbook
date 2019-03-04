
-- graphic parameters
leafs = 32 -- must be even, try 26-34 range
overlap = 0.0025
ratio = 0.6

-- export parameters
justOutline = false
resolution = 1

----------------------------------------------------
function setup()
    mg.size( 300*resolution, 800*resolution )
end

----------------------------------------------------
function draw()

    local step = 1.0 / (leafs + 2.0)
    local leafwidht = step*ratio

    mg.background( 255, 255, 255, 255 )
    
    -- horizontally center 
    mg.translate( mg.ratio()*0.5, 0.0 )
    
    -- do the rectangles
    if not justOutline then
        mg.fill( 0 )
        
        for i=1,leafs do 
            local xoff = i%2 * leafwidht
        
            mg.begin()
                mg.rect( -xoff, step*i, leafwidht, step )
            mg.close()
        end
    end

    -- draws the outline 
    mg.strokeWidth( overlap)
    mg.stroke( 0 )

    mg.begin()
        mg.moveTo( 0, step )
        mg.lineTo( -leafwidht, step )
     
        for i=2,leafs do           
            if i%2==0 then 
                mg.lineTo( -leafwidht, step*i )
                mg.lineTo( leafwidht, step*i )
            else 
                mg.lineTo( leafwidht, step*i )
                mg.lineTo( -leafwidht, step*i )
            end
        end       
        
        mg.lineTo( leafwidht, step*(leafs+1) )
        mg.lineTo( 0.0, step*(leafs+1) )
        mg.lineTo( 0.0, step )
    mg.close()

end

----------------------------------------------------
function exit()

end


