:-consult(knowledge).
:-consult(importer).
:-consult(utils).
 
%WITH FINDALL
%Generate Shortest Path

shortest_path(Nodei,Nodef,LShortest_path):- findall(LPath,path(Nodei,Nodef,LPath),LLPath),
                                            shortest(LLPath,LShortest_path).

shortest([H],H):-!.
shortest([H|T],Hshortest):-shortest(T,L1),length(H,C),length(L1,C1),
                           ((C<C1,!,Hshortest=H);Hshortest=L1).

%Viability and Complexity Analysis

plan_mud_mot(Nodei,Nodef,LShortest_path):-get_time(Ti),
                                          findall(LPath,path(Nodei,Nodef,LPath),LLPath),
                                          shortest(LLPath,LShortest_path),
                                          get_time(Tf),
                                          length(LLPath,NSol),
                                          TSol is Tf-Ti,
                                          write('Number of Solutions:'),write(NSol),nl,
                                          write('Time to generate solution:'),write(TSol),nl.


%WITHOUT FINDALL
%Generate Path
path(Nodei,Nodef,LPath):-path(Nodei,Nodef,[],LPath).

path(Node,Node,Lused,Lfinal):-reverse(Lused,Lfinal).
path(Node1,Nodef,Lused,Lfinal):-connection(Node1,Node2,NLine),
                                    \+member((_,_,NLine),Lused),
                                    \+member((Node2,_,_),Lused),
                                    \+member((_,Node2,_),Lused),
                                    path(Node2,Nodef,[(Node1,Node2,NLine)|Lused],Lfinal).

:- dynamic best_sol_time/2, nSol/1.
plan_mud_mot2(InicialNode,FinalNode,TimeToCatch,Paths_lessTime):- get_time(Ti),
                                              (best_path_time(InicialNode,FinalNode,TimeToCatch);true),
                                              retract(best_sol_time(LPath_lessTime,N)),
                                              retract(nSol(NSol)),
                                              get_time(Tf),
                                              TSol is Tf-Ti,
                                              write(N),
                                              write('Number of Solutions:'),write(NSol),nl,
                                              write('Solution Time:'),write(TSol),nl.

best_path_time(InicialNode,FinalNode, TimeToCatch):- asserta(best_sol_time(_,86400)),
                                                    asserta(nSol(0)),
                                                    path(InicialNode,FinalNode,Paths),
                                                    update_best_time(Paths, TimeToCatch),
                                                    fail.

update_best_time(Paths,TimeToCatch):- best_sol_time(_,N),
                            checkTime(Paths, TimeToCatch, ArrivalTime),
                            ArrivalTime<N,
                            retract(nSol(NS)),
                            NS1 is NS +1,
                            asserta(nSol(NS1)),
                            retract(best_sol_time(_,_)),
                            asserta(best_sol_time(Paths,ArrivalTime)).

checkTime([],Time,Time).
checkTime([(Node1,Node2,Line)|T], TimeToCatch, ArrivalTime):- findall(Schedule, schedule(Line,Schedule), AllSchedules),
                                                                line(_,Line,Path,_,_),
                                                                nth1(Pos1,Path,Node1),
                                                                nth1(Pos2,Path,Node2),
                                                                validSchedules(AllSchedules,Pos1,TimeToCatch, ValidSchedules),
                                                                earliestSchedule(Pos2,ValidSchedules,Final),
                                                                nth1(Pos2,Final,Time2),
                                                                checkTime(T,Time2,ArrivalTime).

validSchedules([],_,_,[]).
validSchedules([H|T],Pos1,TimeToCatch,[H|ValidSchedules]):- nth1(Pos1,H,PassingTime),
                                                            PassingTime>=TimeToCatch,
                                                            validSchedules(T,Pos1,TimeToCatch,ValidSchedules).
validSchedules([_|T],Pos1,TimeToCatch,ValidSchedules):-validSchedules(T,Pos1,TimeToCatch,ValidSchedules).
                                                        

earliestSchedule(_,[T],T).
earliestSchedule(Pos2, [H|T], H) :- earliestSchedule(Pos2, T, Min1),
                                                        nth1(Pos2,H,NewTime),
                                                        nth1(Pos2,Min1,TimeMin),
                                                        NewTime<TimeMin.
earliestSchedule(Pos2,[_|T],Final) :- earliestSchedule(Pos2,T,Final).

