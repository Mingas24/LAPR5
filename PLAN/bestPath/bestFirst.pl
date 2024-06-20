:-consult(knowledge).
:-consult(utils).
:-consult(generator).

bestFirst(Orig,Dest,TimeToCatch,Cam,Cost):-get_time(Ti),
                                           bestFirst2(Dest,[(_,TimeToCatch,[Orig])],Cam,Cost),
                                           get_time(Tf),
                                           TSol is Tf-Ti,
                                           write('Solution Time:'),write(TSol),nl.

bestFirst2(Dest,[(_,EndTime,[Dest|T])|_],Cam,EndTime):-!, reverse([Dest|T],Cam).
bestFirst2(Dest,[(_,TimeToCatch,LA)|Other],Cam,Cost):- LA=[Act|_],
            findall((CEX,EndTime,[X|LA]),
            (Dest\==Act,connection(Act,X,Line),
            \+ member(X,LA),
            passingTime(Act,X,Line,TimeToCatch,EndTime),
            estimate(X,Dest,Time),
            CEX is EndTime +Time),New),
            append(Other,New,All),
            sort(All,AllOrd),
            bestFirst2(Dest,AllOrd,Cam,Cost).

estimate(Node1, Node2, Time):- bigV(Vel),
                                node(_,Node1,_,_,Long1,Lat1),
                                node(_,Node2,_,_,Long2,Lat2),
                                P is 0.017453292519943295,
                                A is (0.5 - cos((Lat2 - Lat1) * P) / 2 + cos(Lat1 * P) * cos(Lat2 * P) * (1 - cos((Long2 - Long1) * P)) / 2),
                                Dist is 1000 * (12742 * asin(sqrt(A))),
                                Time is Dist/Vel.

passingTime(Node1,Node2,Line,TimeToCatch,EndTime):- findall(Schedule, schedule(Line,Schedule), AllSchedules),
                                                        line(_,Line,Path,_,_),                                  
                                                        nth1(Pos1, Path, Node1),
                                                        nth1(Pos2, Path, Node2),
                                                        passingTime1(AllSchedules,TimeToCatch,Pos1,Pos2,EndTime).

passingTime1([Schedule|_],TimeToCatch,Pos1,Pos2,EndTime):-
    nth1(Pos1,Schedule,Passing),                % Hora de passagem no No1
    Passing >= TimeToCatch,
    % Se for o horário desejado
    nth1(Pos2,Schedule,EndTime).
passingTime1([_|LSchedules],TimeToCatch,Pos1,Pos2,EndTime):-
    passingTime1(LSchedules,TimeToCatch,Pos1,Pos2,EndTime).