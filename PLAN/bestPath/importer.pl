% Bibliotecas HTTP 
:- use_module(library(http/thread_httpd)). 
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)). 
:- use_module(library(http/http_client)).
% Bibliotecas JSON 
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)). 
:- use_module(library(http/json)).

  :- json_object no(nodeID:number, name:string, latitude:number, longitude:number, shortName:string, isDepot:boolean,
                      isReliefPoint:boolean, crewTravelTime:list(crewTravelTime)).
  :- json_object crewTravelTime(id:number, nodeID:number, duration:number).
  :- json_object line(lineID:number , name:string, color:string, linePath:list(linePath)).
  :- json_object linePath(orientation: string, pathID: string).

getNodes:- http_get('https://lapr5-grupo001.herokuapp.com/api/nodes',LNos,[json_object(dict)]),
            open("data/nodes.pl",write,File),
            saveNode(File,LNos),
            close(File).
            
saveNode(_,[]).
saveNode(File, [H|T]):- writeq(File,node(H.nodeID,H.name,H.latitude,H.longitude,H.shortName,H.isDepot,H.isReliefPoint,H.crewTravelTime)), 
                        writeln(File, "."), saveNode(File,T).

getLines:- http_get('https://lapr5-grupo001.herokuapp.com/api/lines',LLines,[json_object(dict)]),
            open("data/lines.pl",write,File),
            saveLine(File,LLines),
            close(File).
            
saveLine(_,[]).
saveLine(File, [H|T]):- writeq(File,line(H.name,H.lineID,H.linePath)),
                        writeln(File, "."), saveLine(File,T).