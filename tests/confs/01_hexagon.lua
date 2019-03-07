
----------------------------------------------------
function setup()

end

----------------------------------------------------
function draw()
    --mg.clear()

    mg.strokeWidth( 0.05 )
    mg.setCapRound() -- butt / round / square
    mg.setJoinMiter() --miter / round / bevel 

    mg.center()
    
    mg.strokeA()    
    local offset = 0.1
    local side = 0.05
    mg.begin()
        mg.poly( 0.0, 0.0, 0.15 + offset*3, 6 )
    mg.close()


end

----------------------------------------------------
function exit()

end


