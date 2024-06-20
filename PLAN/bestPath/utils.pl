:-consult(knowledge).
:-dynamic connection/3.
generate_connections:- retractall(connection(_,_,_)),
                    findall(_,
                    ((node(_,Node1,t,f,_,_);node(_,Node1,f,t,_,_)),
                    (node(_,Node2,t,f,_,_);node(_,Node2,f,t,_,_)),
                    Node1\==Node2,
                    line(_,N,LNodes,_,_),
                    member_order(Node1,Node2,LNodes),
                    assertz(connection(Node1,Node2,N))
                    ),_).
member_order(Node1,Node2,[Node1|L]):- member(Node2,L),!.
member_order(Node1,Node2,[_|L]):- member_order(Node1,Node2,L).

% %Medium Velocity
:-dynamic bigV/1.
medVelocity:- findall(Veloc,(line(_,Line,_,Time,Dist),
            Time1 is Time * 60, 
            Veloc is Dist / Time1),ListV),
            biggest(ListV, V),
            asserta(bigV(V)).

biggest([H],H):-!.
biggest([H|T],Hmaior):-biggest(T,L1),
                        ((H<L1,!,Hmaior=H);Hmaior=L1).

% %Distance Between 2 Nodes

% distBetNodes(NodeI, NodeF, Dist):- node(_,NodeI,_,_,Lat1,Long1), node(_,NodeF,_,_,Lat2,Long2), distLatLongNodes(Lat1, Long1, Lat2, Long2, Dist).

% distLatLongNodes(Lat1, Long1, Lat2, Long2, Dist):- P is 0.017453292519943295,
%                                                    A is (0.5 - cos((Lat2 - Lat1) * P) / 2 + cos(Lat1 * P) * cos(Lat2 * P) * (1 - cos((Long2 - Long1) * P)) / 2),
%                                                    Dist is 1000 * (12742 * asin(sqrt(A))).

% %Time Between 2 Nodes


