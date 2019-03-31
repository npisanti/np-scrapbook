
-- graphic parameters
leafs = 26 -- must be even, try 26-34 range
overlap = 0.0025
ratio = 1.5

-- export parameters
justOutline = false
resolution = 1

----------------------------------------------------
function setup()
    lvg.size( 300*resolution, 800*resolution )
end

----------------------------------------------------
function draw()

    local step = 1.0 / (leafs + 2.0)
    local leafwidht = step*ratio

    lvg.background( 255, 255, 255, 255 )
    
    -- horizontally center 
    lvg.translate( lvg.ratio()*0.5, 0.0 )
    
    -- do the rectangles
    if not justOutline then
        lvg.fill( 0 )
        
        for i=1,leafs do 
            local xoff = i%2 * leafwidht
        
            lvg.begin()
                lvg.rect( -xoff, step*i, leafwidht, step )
            lvg.close()
        end
    end

    -- draws the outline 
    lvg.strokeWidth( overlap)
    lvg.stroke( 0 )

    lvg.begin()
        lvg.moveTo( 0, step )
        lvg.lineTo( -leafwidht, step )
     
        for i=2,leafs do           
            if i%2==0 then 
                lvg.lineTo( -leafwidht, step*i )
                lvg.lineTo( leafwidht, step*i )
            else 
                lvg.lineTo( leafwidht, step*i )
                lvg.lineTo( -leafwidht, step*i )
            end
        end       
        
        lvg.lineTo( leafwidht, step*(leafs+1) )
        lvg.lineTo( 0.0, step*(leafs+1) )
        lvg.lineTo( 0.0, step )
    lvg.close()

end

----------------------------------------------------
function exit()

end


