% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:-use_module(library(http/http_cors)).
:-set_setting(http:cors, [*]).

:- consult(bestPath/aStar).
:- consult(driverDuty/begin).

% Relacao entre pedidos HTTP e predicados que os processam
:- http_handler('/api/aStar', p_json, []).
:- http_handler('/api/DriverDuty', p_json_DD, []).

% Criacao de servidor HTTP em 'Port' que trata pedidos em JSON
server(Port) :-
        http_server(http_dispatch, [port(Port)]),
        generate_connections,
        medVelocity.

:-json_object shortNameNode(shortName:string).
:-json_object response(path:list(shortNameNode/1), arrival:number).
%:-json_object individual(ind:integer).
:-json_object response1(ind:list(integer), weight:integer).

p_json(Request) :-
        cors_enable,
        http_parameters(Request,[node1(Node1,[]),node2(Node2,[]), time(Time,[])]),
        atom_number(Time,TimeEnd),
        atom_string(Node1,Node12),
        atom_string(Node2,Node22),
        aStar(Node12,Node22,TimeEnd,Path,Arrival),
        treatList(Path,PathJSON),
        prolog_to_json(response(PathJSON,Arrival), JSONObject),
        reply_json(JSONObject, [json_object(dict)]).

treatList([],[]).
treatList([Node123|T], [shortNameNode(Node123)|PathJSON]):- treatList(T,PathJSON).

p_json_DD(Request):-
        cors_enable,
        http_parameters(Request,
        [generation(G,[]),population(Pop,[]),vehicleID(VID,[]),prob_cross(PC,[]),prob_mutacao(PM,[])]),
        atom_number(G,GF),
        atom_number(Pop,PopF),
        atom_number(VID,VIDF),
        atom_number(PC,PCF),
        atom_number(PM,PMF),
        generate_server(GF,PopF,VIDF,PCF,PMF,Ind*W),
        prolog_to_json(response1(Ind,W),JSONObject),
        reply_json(JSONObject,[json_object(dict)]).