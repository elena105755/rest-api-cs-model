# SCC.311 Distributed Systems - Coursework

This repository contains my attempt od a restful api consisting of a Client written in Javascript and a Python Server. 

The API also contains a load balancer for traffic management and with a Redis in-memory Database.

The CLI is fairly easy to use, mostly consisting of user input and real-time feedback based on user's choice.

This project needs some refinements but the backbone is already in place, enjoy..

redis>  SET key1 "client"

"OK"

redis>  SET key2 "server"

"OK"

redis>  BITOP AND dest key1 key2

redis>  GET dest

redis>
