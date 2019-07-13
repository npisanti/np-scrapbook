
require "strict"

----------------------------------------------------
function setup()

end

----------------------------------------------------
function draw()

    px.clear()
    px.fill( false )
    
    local cx = 100
    local cy = 100
    local wi = 50
    local he = 50 
    local spacing = 5
    
    px.push()
        distolines( cx, cy, cx-wi, cy-he )
        px.translate( spacing, 0 )
        distolines( cx, cy, cx+wi, cy-he )
        px.translate( 0, spacing )
        distolines( cx, cy, cx+wi, cy+he )
        px.translate( -spacing, 0 )
        distolines( cx, cy, cx-wi, cy+he )
    px.pop()
    
end

----------------------------------------------------
function distolines( x0, y0, x1, y1 )

    local dx = x1 - x0 
    local dy = y1 - y0

    px.push()
        px.translate( x0, y0 )
        
        for i=1, 10 do
            local fx = px.random( dx )
            local fy = px.random( dy )
            
            if i%2 == 0 then
                px.line( 0, 0, fx, 0 )
                px.line( fx, 0, fx, fy )            
            else
                px.line( 0, 0, 0, fy )
                px.line( 0, fy, fx, fy )     
            end
        end 
    px.pop()
end

----------------------------------------------------
function exit()

end


