
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
    lvg.clear()
    
end

----------------------------------------------------
function exit()

end


